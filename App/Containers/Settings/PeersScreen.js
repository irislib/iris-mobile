import React from 'react'
import { View, FlatList, Clipboard, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import ListItem from 'App/Components/ListItem'
import Button from 'App/Components/Button'
import Identicon from 'App/Components/Identicon'
import QRCode from 'react-native-qrcode-svg'
import Style from './SettingsScreenStyle'
import Navigation from 'App/Services/NavigationService'
import gun from 'App/Services/GunService'
import { session } from 'App/Services/IrisService'

class PeersScreen extends React.Component {
  state = {
    peers: [],
    newPeerUrl: '',
  }

  static navigationOptions = {
    title: 'Peers',
  }

  componentDidMount() {
    const getPeers = () => {
      const peers = Object.values(gun.back('opt.peers'))
      this.setState({peers})
    }
    getPeers()
    this.interval = setInterval(getPeers, 2000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  addPeer() {
    const url = this.state.newPeerUrl.trim()
    if (url.indexOf('https://') === 0) {
      gun.opt({peers: [url]});
      this.setState({newPeerUrl: ''})
    }
  }

  disconnectPeer(peerFromGun) {
    gun.on('bye', peerFromGun);
    peerFromGun.url = '';
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="height" style={{padding: 16}}>
        <FlatList
          data={this.state.peers}
          renderItem={({ item }) => (
            <View style={{borderBottomWidth: 1, borderColor: '#eee', paddingVertical: 16}}>
              <Text><Text style={{fontWeight: 'bold', color: (item.wire && item.wire.hied === 'hi') ? 'green' : 'red'}}>{item.wire && item.wire.hied === 'hi' ? '✓' : '✗'}</Text> {item.url}</Text>
              <Button text="Remove" onPress={() => {this.disconnectPeer(item)}}/>
            </View>
          )}
        />
        <TextInput
          autoCapitalize="none"
          style={{paddingVertical: 16}}
          autoCorrect={false}
          keyboardType="default"
          editable
          maxLength={1000}
          placeholder="Peer url"
          value={this.state.newPeerUrl}
          onChangeText={(newPeerUrl) => {
            this.setState({newPeerUrl})
          }}
        />
        <Button text="Add peer" onPress={() => { this.addPeer() }} />
      </KeyboardAvoidingView>
    )
  }
}

export default PeersScreen
