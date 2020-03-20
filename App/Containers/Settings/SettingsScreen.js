import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { Chat } from 'iris-lib'
import Style from './SettingsScreenStyle'
import ListItem from 'App/Components/ListItem'
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
        <ListItem style={Style.item} text="Edit profile" onPress={() => Navigation.navigate('EditProfileScreen') } />
        <ListItem style={Style.item} text="Show private key" onPress={() => Navigation.navigate('ShowPrivateKeyScreen') } />
        <ListItem style={Style.item} text="Log out" onPress={() => this.logout()} />
      </View>
    )
  }
}

export default SettingsScreen
