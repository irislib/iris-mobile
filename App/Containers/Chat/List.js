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

function sortChatsByLatest(chatsArr) {
  return chatsArr.sort((a, b) => ((b.latest && b.latest.time) || Infinity) - ((a.latest && a.latest.time) || Infinity))
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
          <Identicon pub={session.keypair.pub} width={40} style={Style.headerIdenticon} />
          <Text>{(state.params && state.params.name) || ''}</Text>
        </TouchableOpacity>
      )
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
        chat.getLatestMsg(msg => {
          this.setState(previousState => {
            const newState = {...previousState}
            msg.time = new Date(msg.time)
            newState.chats[pub].latest = msg
            newState.chatsArr = sortChatsByLatest(newState.chatsArr)
            return newState
          })
        })
        chat.pub = pub
        chat.name = ''
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
            <ChatListItem chat={item} onPress={() => this.props.navigation.navigate('ChatScreen', { pub: item.pub, title: item.name })} />
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
