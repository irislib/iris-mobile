import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { Chat, util } from 'iris-lib'
import Style from './Style'
import Identicon from 'App/Components/Identicon'
import NavigationService from 'App/Services/NavigationService'
import gun from 'App/Services/GunService'
import { session } from 'App/Services/IrisService'

class ChatScreen extends React.Component {
  state = {
    messages: [],
    onlineStatus: {},
  }

  static navigationOptions = ({navigation}) => {
    const {state} = navigation;
    return {
      headerTitle: (
        <TouchableOpacity style={Style.headerLeft} onPress={() => NavigationService.navigate('ContactScreen', { pub: state.params.pub, title: state.params.title || '' })}>
          <Identicon pub={state.params.pub} width={40} style={Style.headerIdenticon} />
          <View>
            <Text>{state.params.title || ''}</Text>
            <Text style={Style.lastActive}>{(state.params.isTyping && 'typing...') || state.params.onlineStatus && (state.params.onlineStatus.isOnline && 'online' || 'last active ' + util.formatDate(new Date(state.params.onlineStatus.lastActive)))}</Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  componentDidMount() {
    const pub = this.props.navigation.getParam('pub')
    const setName = name => {
      this.name = name
      this.props.navigation.setParams({title: name})
      this.setState(previousState => {
        const newState = {...previousState}
        for (let i = 0; i < newState.messages.length; i++) {
          const m = newState.messages[i]
          if (m.user._id === 2) {
            m.user.name = name
          }
        }
        return newState
      })
    }
    setName('')
    gun.user(pub).get('profile').get('name').on(setName)
    const onMessage = (msg, info) => {
      this.chat.setMyMsgsLastSeenTime()
      this.setState(previousState => {
        msg.createdAt = new Date(msg.time)
        msg._id = msg.time + (info.selfAuthored ? 0 : 1)
        msg.user = {
          name: this.name || msg.author,
          _id: (info.selfAuthored ? 1 : 2),
        }
        newMessages = previousState.messages.concat(msg)
        newMessages.sort((a, b) => b.createdAt - a.createdAt)
        return { messages: newMessages }
      });
    }
    this.chat = new Chat({gun, key: session.keypair, participants: pub, onMessage});
    this.chat.setMyMsgsLastSeenTime()
    this.chat.getTyping(isTyping => {
      this.props.navigation.setParams({isTyping})
    })
    Chat.getOnline(gun, pub, onlineStatus => {
      this.props.navigation.setParams({onlineStatus})
      this.setState(previousState => {
        return {...previousState, onlineStatus}
      })
    })
    /*
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer, I am ' + key,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
    */
  }

  onSend(messages = []) {
    messages.forEach(m => {
      this.chat.send({
        text: m.text,
        time: new Date().toISOString(),
        author: 'me'
      })
    })
  }

  render() { // backgroundColor: '#e5ddd5'
    return (
      <View style={{backgroundColor: '#ffffff', flex: 1}}>
        <GiftedChat
          messages={this.state.messages}
          renderAvatar={null}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
          onInputTextChanged={text => {
            this.chat.setTyping(text.length > 0)
          }}
        />
      </View>
    )
  }
}

export default ChatScreen
