import React from 'react'
import { View, Clipboard, Text } from 'react-native'
import Button from 'App/Components/Button'
import QRCode from 'react-native-qrcode-svg'
import Style from './SettingsScreenStyle'
import gun from 'App/Services/GunService'

class ShowPrivateKeyScreen extends React.Component {
  state = {
    privateKey: null
  }

  static navigationOptions = {
    title: 'Private key',
  }

  componentDidMount() {
    const privateKey = JSON.stringify(gun.user().is.alias)
    this.setState({privateKey})
  }

  render() {
    return this.state.privateKey ? (
      <View style={Style.container}>
        <QRCode
          value={this.state.privateKey}
          size={300}
        />
        <Button text="Copy to clipboard" onPress={() => Clipboard.setString(this.state.privateKey)} />
        <Text>DANGER! Private key is used to log in to your account. Don't give or show your private key to anyone!</Text>
      </View>
    ) : (
      <View></View>
    )
  }
}

export default ShowPrivateKeyScreen
