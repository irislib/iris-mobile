import React from 'react'
import { View, Clipboard, Text, Image, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import Button from 'App/Components/Button'
import Identicon from 'App/Components/Identicon'
import { RNCamera } from 'react-native-camera'
import QRCode from 'react-native-qrcode-svg'
import Style from './SettingsScreenStyle'
import gun from 'App/Services/GunService'
import { session } from 'App/Services/IrisService'
import ImagePicker from 'react-native-image-crop-picker'

class EditPhotoScreen extends React.Component {
  state = {
    photo: null
  }

  static navigationOptions = {
    title: 'Edit photo',
  }

  componentDidMount() {
    gun.user().get('profile').get('photo').on(photo => this.setState({photo}))
  }

  setPhoto() {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      gun.user().get('profile').get('photo').put(`data:${image.mime};base64,${image.data}`)
    })
  }

  renderChangeOrSetPhoto() {
    return this.state.photo ? (
      <View>
        <Button text="Change photo" onPress={this.setPhoto} />
        <Button text="Delete photo" onPress={() => {gun.user().get('profile').get('photo').put(null)}} />
      </View>
    ) : (
      <View>
        <Button text="Set photo" onPress={this.setPhoto} />
      </View>
    )
  }

  render() {
    return (
      <View>
        <Identicon pub={session.keypair.pub} width={Dimensions.get('window').width} style={{borderRadius: 0}} />
        <View style={{padding: 16}}>
          {this.renderChangeOrSetPhoto()}
        </View>
      </View>
    )
  }
}

export default EditPhotoScreen
