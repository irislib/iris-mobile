import React from 'react'
import { ActivityIndicator, Text, View, Button, Image, FlatList, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import ExampleActions from 'App/Stores/Example/Actions'
import { liveInEurope } from 'App/Stores/Example/Selectors'
import Style from './ChatListScreenStyle'
import { Images } from 'App/Theme'
import { Chat } from 'iris-lib'
import gun from 'App/Services/GunService'
import iris from 'App/Services/IrisService'
import { Identity } from 'iris-lib'

/**
 * This is an example of a container component.
 *
 * This screen displays a little help message and informations about a fake user.
 * Feel free to remove it.
 */

function Item({ title }) {
  return (
    <TouchableWithoutFeedback>
      <View style={Style.item}>
        <Text style={Style.title}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

class ChatListScreen extends React.Component {
  state = {
    chatsByKey: {},
    chats: [],
  }

  static navigationOptions = {

  }

  componentDidMount() {
    this._fetchUser()

    gun.user().get('chat').map().once((data, key) => {
      const chat = {name: key.substr(0,10) + '...', key}
      chat.identity = iris.get('keyID', key)
      const updateChats = previousState => {
        const newChatsByKey = Object.assign({}, previousState.chatsByKey)
        newChatsByKey[key] = chat;
        const newChats = Object.values(newChatsByKey)
        return { chats: newChats, chatsByKey: newChatsByKey }
      }
      this.setState(updateChats)
      chat.identity.gun.get('attrs').open(attrs => {
        const mva = Identity.getMostVerifiedAttributes(attrs)
        console.log('attrs', attrs);
        console.log('mva', mva);
        if (mva.name || mva.nickname) {
          chat.name = mva.name || mva.nickname
          this.setState(updateChats)
        }
      })
      // chat.instance = new Chat({key, gun})
    })
  }

  static navigationOptions = {
    title: 'Chats',
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Back"
        color="#fff"
      />
    ),
  }

  render() {
    return (
      <View style={Style.container}>
        {this.props.userIsLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={this.state.chats}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ChatScreen', {key:item.key})}>
                <View style={Style.item}>
                  <Text style={Style.text}>{item.name}</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
            keyExtractor={item => item.key}
          />
        )}
      </View>
    )
  }

  _fetchUser() {
    this.props.fetchUser()
  }
}

ChatListScreen.propTypes = {
  user: PropTypes.object,
  userIsLoading: PropTypes.bool,
  userErrorMessage: PropTypes.string,
  fetchUser: PropTypes.func,
  liveInEurope: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  user: state.example.user,
  userIsLoading: state.example.userIsLoading,
  userErrorMessage: state.example.userErrorMessage,
  liveInEurope: liveInEurope(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(ExampleActions.fetchUser()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatListScreen)
