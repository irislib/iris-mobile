import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { Chat } from 'iris-lib'
import gun from 'App/Services/GunService'

class ContactScreen extends React.Component {
  state = {
    messages: [],
  }

  static navigationOptions = {
    title: 'Chat',
  }

  componentDidMount() {
    const key = this.props.navigation.getParam('key', 'nobody')
    const onMessage = (msg, info) => {
      this.setState(previousState => {
        msg.createdAt = new Date(msg.time)
        msg._id = msg.time + (info.selfAuthored ? 0 : 1)
        msg.user = {
          name: msg.author,
          _id: (info.selfAuthored ? 1 : 2),
        }
        newMessages = previousState.messages.concat(msg)
        newMessages.sort((a, b) => b.createdAt - a.createdAt)
        return { messages: newMessages }
      });
    }
    this.chat = new Chat({gun, key: gun.user()._.sea, participants: key, onMessage});
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
        renderUsernameOnMessage={true}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
}

export default ContactScreen
