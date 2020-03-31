import React from 'react'
import { Platform, Text, KeyboardAvoidingView, View, ActivityIndicator, Image, TextInput } from 'react-native'
import { PropTypes } from 'prop-types'
import Style from './WelcomeScreenStyle'
import Button from 'App/Components/Button'
import { Images } from 'App/Theme'
import gunInstance from 'App/Services/GunService'
import gun from 'gun';
import { login as irisLogin } from 'App/Services/IrisService'
import { Key, Message, Chat } from 'iris-lib'
import {Notifications} from 'react-native-notifications'
import AsyncStorage from '@react-native-community/async-storage';
import Navigation from 'App/Services/NavigationService'

class WelcomeScreen extends React.Component {
  state = {
    isLoading: true,
  }

  componentDidMount() {
    AsyncStorage.getItem('iris_keypair').then(val => {
      if (val && val.length) {
        try {
          const key = JSON.parse(val)
          this.logInWithKey(key)
        } catch (e) {
          this.setState({isLoading: false})
        }
      } else {
        this.setState({isLoading: false})
      }
    })
  }

  static navigationOptions = {
    header: null
  }

  logInWithKey(key, name) {
    gunInstance.user().auth(key)
    irisLogin(gunInstance, key, name)
    Navigation.navigateAndReset('ChatListScreen')

    Chat.setOnline(gunInstance, true)
  }

  logInAsNewUser() {
    const name = this.state.name
    if (!(name && name.length > 0)) {
      return; // TODO: show error
    }
    if (name.indexOf('{') !== -1 || name.indexOf('}') !== -1) {
      return; // prevent accidentally pasting private key here
    }
    Key.generate().then(key => {
      this.logInWithKey(key, name)
    })
  }

  render() {
    return this.state.isLoading ? (<View style={Style.container}></View>) : (
      <KeyboardAvoidingView style={Style.container} behavior="height">
        <View style={Style.logoContainer}>
          <Image style={Style.logo} source={Images.icon} resizeMode={'contain'} />
        </View>
        <View style={Style.formContainer}>
          <TextInput
            autoCapitalize="words"
            autoCorrect={false}
            style={Style.name}
            keyboardType="default"
            editable
            maxLength={40}
            autoFocus
            placeholder="What's your name?"
            placeholderTextColor="white"
            selectionColor="white"
            onChangeText={(name) => this.setState({name})}
          />
          <Button text="Go!" onPress={() => this.logInAsNewUser()} />
        </View>
        <View style={Style.bottom}>
          <View style={Style.loginButton}>
            <Button text="Already signed up?" onPress={() => this.props.navigation.navigate('LoginScreen')} />
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
