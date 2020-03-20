import React from 'react'
import { View, Clipboard, Text, Image, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import Button from 'App/Components/Button'
import Identicon from 'App/Components/Identicon'
import QRCode from 'react-native-qrcode-svg'
import Style from './SettingsScreenStyle'
import Navigation from 'App/Services/NavigationService'
import gun from 'App/Services/GunService'
import { session } from 'App/Services/IrisService'

class EditProfileScreen extends React.Component {
  state = {
    photo: null
  }

  static navigationOptions = {
    title: 'Edit profile',
  }

  componentDidMount() {
    gun.user().get('profile').get('name').on(name => this.setState({name}))
    gun.user().get('profile').get('about').on(about => this.setState({about}))
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="height" style={{padding: 16}}>
        <TouchableOpacity style={{width:76, padding: 8, textAlign: 'center', alignItems: 'center', alignContent: 'center'}} onPress={() => Navigation.navigate('EditPhotoScreen')}>
          <Identicon pub={session.keypair.pub} width={60} />
          <Text style={{color: 'blue', marginTop: 4}}>Edit</Text>
        </TouchableOpacity>
        <TextInput
          style={{borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#eee'}}
          autoCapitalize="words"
          autoCorrect={false}
          keyboardType="default"
          editable
          maxLength={40}
          placeholder="What's your name?"
          onChangeText={(name) => {
            name = name.trim()
            this.setState({name})
            gun.user().get('profile').get('name').put(name)
          }}
          value={this.state.name}
        />
        <Text style={{fontWeight: 'bold', marginTop: 16}}>About</Text>
        <TextInput
          autoCorrect={false}
          keyboardType="default"
          editable
          maxLength={1000}
          placeholder="About text"
          onChangeText={(about) => {
            this.setState({about})
            gun.user().get('profile').get('about').put(about)
          }}
          value={this.state.about}
        />
      </KeyboardAvoidingView>
    )
  }
}

export default EditProfileScreen
