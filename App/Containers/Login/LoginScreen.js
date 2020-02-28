import React from 'react'
import { Platform, Text, KeyboardAvoidingView, View, Button, TextInput } from 'react-native'
import { PropTypes } from 'prop-types'
import Style from './LoginScreenStyle'
import { Images } from 'App/Theme'
import gun from 'App/Services/GunService'
import { login as irisLogin } from 'App/Services/IrisService'

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
    try {
      key = JSON.parse(key)
      gun.user().auth(key)
      irisLogin(gun, key)
      this.props.navigation.navigate('ChatListScreen')
    } catch (e) {
      // TODO: show error
    }
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
          <Button title="Scan QR" color="white" onPress={() => this.props.navigation.navigate('ScanPrivateKeyScreen')} />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

LoginScreen.propTypes = {
  user: PropTypes.object,
}

export default LoginScreen
