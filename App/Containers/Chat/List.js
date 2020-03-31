import React from 'react'
import { ActivityIndicator, Text, View, Image, FlatList, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import ListItem from 'App/Components/ListItem'
import ChatListItem from 'App/Components/ChatListItem'
import Identicon from 'App/Components/Identicon'
import { PropTypes } from 'prop-types'
import Style from './Style'
import { ApplicationStyles, Images } from 'App/Theme'
import { Chat } from 'iris-lib'
import gun from 'App/Services/GunService'
import { session } from 'App/Services/IrisService'
import { Identity } from 'iris-lib'
import NavigationService from 'App/Services/NavigationService'
import { SvgXml } from 'react-native-svg'
import Svg from 'App/Components/Svg'
import {Notifications} from 'react-native-notifications'
import BackgroundFetch from "react-native-background-fetch";

function sortChatsByLatest(chatsArr) {
  return chatsArr.sort((a, b) => ((b.latest && b.latest.date) || Infinity) - ((a.latest && a.latest.date) || Infinity))
}

class ChatListScreen extends React.Component {
  state = {
    chats: {},
    chatsArr: [],
  }

  static navigationOptions = ({navigation}) => {
    const {state} = navigation;
    return {
      title: 'Chats',
      headerTitle: '',
      headerLeft: (
        <TouchableOpacity style={Style.headerLeft} onPress={() => NavigationService.navigate('SettingsScreen')}>
          {session.keypair && session.keypair.pub ? <Identicon pub={session.keypair.pub} width={40} style={Style.headerIdenticon} /> : <Text></Text>}
          <Text>{(state.params && state.params.name) || ''}</Text>
        </TouchableOpacity>
      )
    }
  }

  checkNotify(chat) { // TODO: move to iris-lib
    function check() {
      return chat.latest && (!chat.myLastSeenTime || (chat.myLastSeenTime < chat.latest.time))
    }
    function notify() {
      Notifications.postLocalNotification({
        body: chat.latest && chat.latest.text || '',
        title: chat.name,
        sound: "chime.aiff",
        silent: false,
        category: "SOME_CATEGORY",
        userInfo: { },
      })
    }
    if (check()) {
      chat.hasUnseen = true
      if (!chat.myLastSeenTime) {
        setTimeout(() => { // give it a chance to get chat.myLastSeenTime
          if (check()) { notify() }
        }, 2000);
      } else { notify() }
    } else {
      chat.hasUnseen = false
    }
  }

  componentDidMount() {
    gun.user().get('profile').get('name').on(name => this.props.navigation.setParams({name}))
    Chat.getChats(session.gun, session.keypair, pub => {
      console.log('got chat', pub);
      this.setState(previousState => {
        if (previousState.chats[pub]) {
          return
        }
        const newState = {...previousState}
        const chat = new Chat({gun: session.gun, key: session.keypair, participants: pub})
        chat.pub = pub
        chat.name = ''
        chat.getLatestMsg((msg, info) => {
          this.setState(previousState => {
            const newState = {...previousState}
            msg.date = new Date(msg.time)
            msg.info = info
            chat.latest = msg
            newState.chatsArr = sortChatsByLatest(newState.chatsArr)
            this.checkNotify(chat)
            return newState
          })
        })
        chat.getMyMsgsLastSeenTime(lastSeenTime => {
          chat.myLastSeenTime = lastSeenTime
          this.checkNotify(chat)
        })
        newState.chats[pub] = chat
        newState.chatsArr = sortChatsByLatest(Object.values(newState.chats))
        return newState
      })
      gun.user(pub).get('profile').get('name').on(name => {
        this.setState(previousState => {
          const newState = {...previousState}
          newState.chats[pub].name = name
          newState.chatsArr = sortChatsByLatest(Object.values(newState.chats))
          return newState
        })
      })
    })

    Notifications.registerRemoteNotifications()
    Notifications.events().registerNotificationReceivedForeground((notification: Notification, completion) => {
      console.log(`Notification received in foreground: ${JSON.stringify(notification)}`);
      completion({alert: true, sound: true, badge: true});
    })
    Notifications.events().registerNotificationOpened((notification: Notification, completion) => {
      console.log(`Notification opened: ${notification}`);
      completion();
    })

    BackgroundFetch.configure({
      minimumFetchInterval: 15,     // <-- minutes (15 is minimum allowed)
      // Android options
      forceAlarmManager: false,     // <-- Set true to bypass JobScheduler.
      stopOnTerminate: false,
      startOnBoot: true,
      requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
      requiresCharging: false,      // Default
      requiresDeviceIdle: false,    // Default
      requiresBatteryNotLow: false, // Default
      requiresStorageNotLow: false  // Default
    }, async (taskId) => {
      console.log("[js] Received background-fetch event: ", taskId);
      Notifications.postLocalNotification({
        body: "Local notificiation!",
        title: "Local Notification Title",
        sound: "chime.aiff",
        category: "SOME_CATEGORY",
        userInfo: { },
      })
      // Required: Signal completion of your task to native code
      // If you fail to do this, the OS can terminate your app
      // or assign battery-blame for consuming too much background-time
      BackgroundFetch.finish(taskId);
    }, (error) => {
      console.log("[js] RNBackgroundFetch failed to start");
    });

    // Optional: Query the authorization status.
    BackgroundFetch.status((status) => {
      switch(status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          console.log("BackgroundFetch restricted");
          break;
        case BackgroundFetch.STATUS_DENIED:
          console.log("BackgroundFetch denied");
          break;
        case BackgroundFetch.STATUS_AVAILABLE:
          console.log("BackgroundFetch is enabled");
          break;
      }
    });
  }

  render() {
    return (
      <View style={Style.listContainer}>
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('CreateChatScreen')}>
         <View style={{...ApplicationStyles.listItem.item, paddingTop: 8, paddingBottom: 8, paddingLeft: 16, paddingRight: 16, borderBottomWidth: 1, borderColor: '#eee'}}>
           <SvgXml xml={Svg.newChat} width={15} height={15} />
           <Text style={{...ApplicationStyles.listItem.text, borderBottomWidth: 0}}>New chat</Text>
         </View>
  		  </TouchableWithoutFeedback>
        <FlatList
          data={this.state.chatsArr}
          renderItem={({ item }) => (
            <ChatListItem chat={item} />
          )}
          keyExtractor={item => item.pub}
        />
      </View>
    )
  }
}

ChatListScreen.propTypes = {
  chats: PropTypes.array,
}

export default ChatListScreen
