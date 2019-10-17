import React from 'react'
import { Platform, Text, KeyboardAvoidingView, View, Button, ActivityIndicator, Image, TextInput } from 'react-native'
import { PropTypes } from 'prop-types'
import Style from './LoginScreenStyle'
import { Images } from 'App/Theme'
import gun from 'App/Services/GunService'

class LoginScreen extends React.Component {
  componentDidMount() {

  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#74d5f1',
      borderBottomWidth: 0,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

  logInWithKey(key) {
    // TODO handle invalid key
    gun.user().auth(JSON.parse(key))
    this.props.navigation.navigate('ChatListScreen')
  }

  render() {
    return (
      <KeyboardAvoidingView style={Style.container} behavior="height">
        <View style={Style.formContainer}>
          <TextInput
            autoCorrect={false}
            style={Style.text}
            editable
            autoFocus
            placeholder="Paste your private key"
            placeholderTextColor="white"
            selectionColor="white"
            onChangeText={(key) => this.logInWithKey(key)}
          />
          <Text style={Style.text}>or</Text>
          <Button title="Scan QR" color="white" />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

LoginScreen.propTypes = {
  user: PropTypes.object,
}

export default LoginScreen
