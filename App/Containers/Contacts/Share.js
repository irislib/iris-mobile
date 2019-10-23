import React from 'react'
import { Button, View, Clipboard } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import Style from './Style'

class ShareContactScreen extends React.Component {
  state = {
    url: null
  }

  static navigationOptions = {
    title: '',
  }

  componentDidMount() {
    const type = encodeURIComponent(this.props.navigation.getParam('type'))
    const value = encodeURIComponent(this.props.navigation.getParam('value'))
    const url = `https://iris.to/#/contacts/${type}/${value}`
    this.setState({url})
  }

  render() {
    return this.state.url ? (
      <View style={Style.container}>
        <QRCode
          value={this.state.url}
          size={300}
        />
        <Button title="Copy link" onPress={() => Clipboard.setString(this.state.url)} />
      </View>
    ) : (
      <View></View>
    )
  }
}

export default ShareContactScreen
