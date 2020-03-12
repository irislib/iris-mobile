import React from 'react'
import QRCode from 'react-native-qrcode-svg'
import { Platform, Text, View, TextInput, Clipboard } from 'react-native'
import Button from 'App/Components/Button'
import { PropTypes } from 'prop-types'
import Style from './Style'
import { Images } from 'App/Theme'
import { Chat } from 'iris-lib'
import gun from 'App/Services/GunService'
import { session } from 'App/Services/IrisService'
import { Identity } from 'iris-lib'
import NavigationService from 'App/Services/NavigationService'

class CreateChatScreen extends React.Component {
  static navigationOptions = {
    title: 'Create chat',
  }

  openChat(link) {
    if (link.indexOf('http') === 0 && link.indexOf('chatWith')) {
      const chat = new Chat({key: session.keypair, gun, chatLink: link})
      const pub = Object.keys(chat.secrets)[0]
      this.props.navigation.navigate('ChatScreen', {pub})
    }
  }

  renderMyChatLink() {
    this.link = 'https://iris.to/?chatWith=IYEdAtGVO5-le8Rmw9L8JAA0Saq19KqYwtCJ3ALU4AU.rtH2wVhsYIXVm1nsZBft7QPvAZMByXAQ5QDSaxOzbQA'
    return this.link ? (
      <View>
        <QRCode
          value={this.link}
          size={300}
        />
        <Button text="Copy to clipboard" onPress={() => Clipboard.setString(this.link)} />
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
            placeholder="Paste someone's chat link"
            onChangeText={(link) => this.openChat(link)}
          />
          <Button text="Scan QR" onPress={() => this.props.navigation.navigate('ScanChatLinkScreen')} />
          <Text style={Style.margins}>Or give your chat link to someone:</Text>
          {this.renderMyChatLink()}
        </View>
      </View>
    )
  }
}

export default CreateChatScreen
