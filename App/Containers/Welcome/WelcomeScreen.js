import React from 'react'
import { Platform, Text, KeyboardAvoidingView, View, Button, ActivityIndicator, Image, TextInput } from 'react-native'
import { PropTypes } from 'prop-types'
import Style from './WelcomeScreenStyle'
import { Images } from 'App/Theme'
import gun from 'App/Services/GunService'
import { Key } from 'iris-lib'

class WelcomeScreen extends React.Component {
  componentDidMount() {

  }

  static navigationOptions = {
    header: null
  }

  logInAsNewUser(name) {
    Key.generate().then(key => {
      gun.user().auth(key)
      this.props.navigation.navigate('ChatListScreen')
    })
  }

  render() {
    return (
      <KeyboardAvoidingView style={Style.container} behavior="height">
        <View style={Style.logoContainer}>
          <Image style={Style.logo} source={Images.icon} resizeMode={'contain'} />
        </View>
        <View style={Style.formContainer}>
          <Text style={Style.welcome}>Welcome to Iris!</Text>
          <TextInput
            autoCapitalize="words"
            autoCorrect={false}
            style={Style.name}
            editable
            maxLength={40}
            autoFocus
            placeholder="What's your name?"
            placeholderTextColor="white"
            selectionColor="white"
          />
          <Button color="white" title="Go!" onPress={() => this.logInAsNewUser('spede')} />
        </View>
        <View style={Style.bottom}>
          <View style={Style.loginButton}>
            <Button color="white" title="Already signed up?" onPress={() => this.props.navigation.navigate('LoginScreen')} />
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

WelcomeScreen.propTypes = {
  user: PropTypes.object,
  userIsLoading: PropTypes.bool,
  userErrorMessage: PropTypes.string,
}

export default WelcomeScreen
