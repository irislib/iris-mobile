import React from 'react'
import QRCode from 'react-native-qrcode-svg'
import { Platform, Text, KeyboardAvoidingView, View, Button, TextInput } from 'react-native'
import { PropTypes } from 'prop-types'
import Style from './Style'
import { Images } from 'App/Theme'
import { Chat } from 'iris-lib'
import gun from 'App/Services/GunService'
import { iris } from 'App/Services/IrisService'
import { Identity } from 'iris-lib'
import NavigationService from 'App/Services/NavigationService'

class CreateChatScreen extends React.Component {
  static navigationOptions = {
    title: 'Create chat',
  }

  openChat(link) {
    console.log('openChat', link)
  }

  renderMyChatLink() {
    this.link = 'https://iris.to/?chatWith=IYEdAtGVO5-le8Rmw9L8JAA0Saq19KqYwtCJ3ALU4AU.rtH2wVhsYIXVm1nsZBft7QPvAZMByXAQ5QDSaxOzbQA'
    return this.link ? (
      <View>
        <QRCode
          value={this.link}
          size={300}
        />
        <Button title="Copy to clipboard" onPress={() => Clipboard.setString(this.state.privateKey)} />
        <Text>But beware of sharing it publicly: you might get spammed with message requests.</Text>
      </View>
    ) : (
      <View></View>
    )
  }

  render() {
    return (
      <View style={Style.container}>
        <View style={Style.formContainer}>
          <TextInput
            autoCorrect={false}
            style={Style.text}
            editable
            autoFocus
            placeholder="Paste someone's chat link"
            onChangeText={(link) => this.openChat(link)}
          />
          <Button title="Scan QR" onPress={() => this.props.navigation.navigate('ScanChatLinkScreen')} />
          <Text style={Style.text}>Or give your chat link to someone:</Text>
          {this.renderMyChatLink()}
        </View>
      </View>
    )
  }
}

export default CreateChatScreen
