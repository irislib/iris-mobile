import React from 'react'
import { Button } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { connect } from 'react-redux'

class ChatScreen extends React.Component {
  state = {
    messages: [],
  }

  static navigationOptions = {
    title: 'Chat',
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Back"
        color="#fff"
      />
    ),
  }

  componentDidMount() {
    const key = this.props.navigation.getParam('key', 'nobody')
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
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
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

const mapStateToProps = (state) => ({
  user: state.example.user,
  userIsLoading: state.example.userIsLoading,
  userErrorMessage: state.example.userErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  // fetchUser: () => dispatch(ExampleActions.fetchUser()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatScreen)
