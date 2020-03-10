import React from 'react'
import { Platform, Text, KeyboardAvoidingView, View, ActivityIndicator, Image, TextInput } from 'react-native'
import { PropTypes } from 'prop-types'
import Style from './WelcomeScreenStyle'
import Button from 'App/Components/Button'
import { Images } from 'App/Theme'
import gunInstance from 'App/Services/GunService'
import gun from 'gun';
import { login as irisLogin } from 'App/Services/IrisService'
import { Key, Message } from 'iris-lib'
import {Notifications} from 'react-native-notifications'
import AsyncStorage from '@react-native-community/async-storage';

class WelcomeScreen extends React.Component {
  componentDidMount() {
    AsyncStorage.getItem('iris_keypair').then(val => {
      if (val && val.length) {
        const key = JSON.parse(val)
        this.logInWithKey(key)
      }
    })
  }

  static navigationOptions = {
    header: null
  }

  logInWithKey(key, name) {
    gunInstance.user().auth(key)
    irisLogin(gunInstance, key, {name})
    this.props.navigation.navigate('ChatListScreen')

    Notifications.registerRemoteNotifications()
    Notifications.events().registerNotificationReceivedForeground((notification: Notification, completion) => {
      console.log(`Notification received in foreground: ${notification}`);
      completion({alert: false, sound: false, badge: false});
    })
    Notifications.events().registerNotificationOpened((notification: Notification, completion) => {
      console.log(`Notification opened: ${notification}`);
      completion();
    })

    /*
    Notifications.postLocalNotification({
      body: "Local notificiation!",
      title: "Local Notification Title",
      sound: "chime.aiff",
      category: "SOME_CATEGORY",
      userInfo: { },
      fireDate: new Date(Date.now() + (10 * 1000))
    })
    */
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
    return (
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
