import React from 'react'
import { Platform, Text, KeyboardAvoidingView, View, Button, ActivityIndicator, Image, TextInput } from 'react-native'
import { PropTypes } from 'prop-types'
import Style from './WelcomeScreenStyle'
import { Images } from 'App/Theme'
import gunInstance from 'App/Services/GunService'
import gun from 'gun';
import { login as irisLogin } from 'App/Services/IrisService'
import { Key, Message } from 'iris-lib'
import {Notifications} from 'react-native-notifications'

class WelcomeScreen extends React.Component {
  componentDidMount() {

  }

  static navigationOptions = {
    header: null
  }

  logInAsNewUser() {
    const name = this.state.name
    if (!(name && name.length > 0)) {
      return; // TODO: show error
    }
    if (name.indexOf('{') !== -1 || name.indexOf('}') !== -1) {
      return; // prevent accidentally pasting private key here
    }
    const logInWithKey = key => {
      gunInstance.user().auth(key)
      irisLogin(gunInstance, key, {name})
    }
    Key.generate().then(logInWithKey)
    this.props.navigation.navigate('ChatListScreen')
    Notifications.requestPermissions()
    Notifications.events().registerNotificationReceivedForeground((notification: Notification, completion) => {
      console.log(`Notification received in foreground: ${notification.title} : ${notification.body}`);
      completion({alert: false, sound: false, badge: false});
    })
    Notifications.events().registerNotificationOpened((notification: Notification, completion) => {
      console.log(`Notification opened: ${notification.payload}`);
      completion();
    })
    Notifications.postLocalNotification({
    	body: "Local notificiation!",
    	title: "Local Notification Title",
    	sound: "chime.aiff",
    	category: "SOME_CATEGORY",
    	userInfo: { },
      date: new Date(Date.now() + (20 * 1000))
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
            onChangeText={(name) => this.setState({name})}
          />
          <Button color="white" title="Go!" onPress={() => this.logInAsNewUser()} />
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
