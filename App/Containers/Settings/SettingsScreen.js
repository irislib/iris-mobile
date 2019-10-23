import React from 'react'
import { Button, View, Text } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { Chat } from 'iris-lib'
import Style from './SettingsScreenStyle'
import gun from 'App/Services/GunService'
import { logout as irisLogout } from 'App/Services/IrisService'
import Navigation from 'App/Services/NavigationService'
import QRCode from 'react-native-qrcode-svg'

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  }

  logout() {
    gun.user().leave()
    irisLogout()
    Navigation.navigateAndReset('WelcomeScreen')
  }

  render() {
    return (
      <View style={Style.container}>
        <View style={Style.item}>
          <Button title="Log out" onPress={() => this.logout()} />
        </View>
        <View style={Style.item}>
          <Button title="Show private key" onPress={() => Navigation.navigate('ShowPrivateKeyScreen') } />
        </View>
      </View>
    )
  }
}

export default SettingsScreen
