import React from 'react'
import { Button } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { Chat } from 'iris-lib'
import NavigationService from 'App/Services/NavigationService'
import gun from 'App/Services/GunService'
import { session } from 'App/Services/IrisService'

class ChatScreen extends React.Component {
  state = {
    messages: [],
  }

  static navigationOptions = ({navigation}) => {
    const {state} = navigation;
    return {
      headerTitle: (
        <Button title={state.params.title || ''} onPress={() => NavigationService.navigate('ContactScreen', { pub: state.params.pub })} />
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
    setName(pub.substr(0, 6) + '...')
    gun.user(pub).get('profile').get('name').on(setName)
    const onMessage = (msg, info) => {
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

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
}

export default ChatScreen
