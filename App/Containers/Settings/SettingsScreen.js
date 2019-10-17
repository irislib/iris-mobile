import React from 'react'
import { Button, View, Text } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { Chat } from 'iris-lib'
import Style from './SettingsScreenStyle'
import gun from 'App/Services/GunService'
import Navigation from 'App/Services/NavigationService'

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  }

  render() {
    return (
      <View style={Style.container}>
        <View style={Style.item}>
          <Button title="Log out" onPress={() => Navigation.navigateAndReset('WelcomeScreen')} />
        </View>
      </View>
    )
  }
}

export default SettingsScreen
