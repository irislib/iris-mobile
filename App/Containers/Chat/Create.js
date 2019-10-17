import React from 'react'
import { Button, View, Text } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { Chat } from 'iris-lib'
import Style from './Style'
import gun from 'App/Services/GunService'

class CreateChatScreen extends React.Component {
  static navigationOptions = {
    title: 'New chat',
  }

  render() {
    return (
      <View style={Style.container}>
        <Text>höhöö</Text>
      </View>
    )
  }
}

export default CreateChatScreen
