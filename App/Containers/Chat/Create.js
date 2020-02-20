import React from 'react'
import { ActivityIndicator, Text, View, Button, Image, FlatList, TouchableWithoutFeedback } from 'react-native'
import { PropTypes } from 'prop-types'
import Style from './Style'
import { Images } from 'App/Theme'
import { Chat } from 'iris-lib'
import gun from 'App/Services/GunService'
import { iris } from 'App/Services/IrisService'
import { Identity } from 'iris-lib'
import NavigationService from 'App/Services/NavigationService'

class CreateChatScreen extends React.Component {
  state = {
    chats: []
  }

  static navigationOptions = {
    title: 'Create chat',
  }

  componentDidMount() {
    Chat.getChats(gun, key, chat => {
      console.log('got chat', chat)
      this.setState(previousState => {
        const newState = {...previousState}
        newState.chats.push(chat)
        return newState
      })
    })
  }

  render() {
    return (
      <View style={Style.container}>
        <FlatList
          data={this.state.chats}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ChatScreen')}>
              <View style={Style.item}>
                <Text style={Style.text}>contact</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
          // keyExtractor={item => item.key}
        />
      </View>
    )
  }
}

CreateChatScreen.propTypes = {
  chats: PropTypes.array,
}

export default CreateChatScreen
