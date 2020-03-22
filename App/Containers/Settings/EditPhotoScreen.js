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

  choosePhoto() {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      gun.user().get('profile').get('photo').put(`data:${image.mime};base64,${image.data}`)
    })
  }

  takePhoto() {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true,
      useFrontCamera: true,
    }).then(image => {
      gun.user().get('profile').get('photo').put(`data:${image.mime};base64,${image.data}`)
    });
  }

  renderDeletePhoto() {
    return this.state.photo ? (
      <View>
        <Button text="Delete photo" onPress={() => {gun.user().get('profile').get('photo').put(null)}} />
      </View>
    ) : (
      <View></View>
    )
  }

  render() {
    return (
      <View>
        <Identicon pub={session.keypair.pub} width={Dimensions.get('window').width} style={{borderRadius: 0}} />
        <View style={{padding: 16}}>
          <Button text="Take photo" onPress={this.takePhoto} />
          <Button text="Choose photo" onPress={this.choosePhoto} />
          {this.renderDeletePhoto()}
        </View>
      </View>
    )
  }
}

export default EditPhotoScreen
