import React from 'react'
import { ActivityIndicator, Text, View, Button, Image, FlatList, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import ExampleActions from 'App/Stores/Example/Actions'
import { liveInEurope } from 'App/Stores/Example/Selectors'
import Style from './ChatListScreenStyle'
import { Images } from 'App/Theme'
import gun from 'App/Services/GunService'

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
    chats: []
  }

  componentDidMount() {
    this._fetchUser()
    gun.user().get('chat').map().once((data, key) => {
      const chat = {text: key.substr(0,10) + '...', key}
      /* chat.identity = this.props.iris.get('keyID', key)
      chat.identity.gun.get('attrs').open(res => {
        console.log(1111, res)
      }) */
      this.setState(previousState => (
        { chats: previousState.chats.concat(chat) }
      ))
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
                  <Text style={Style.text}>{item.key}</Text>
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
