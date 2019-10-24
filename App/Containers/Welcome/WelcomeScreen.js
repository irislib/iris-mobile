import React from 'react'
import { Platform, Text, KeyboardAvoidingView, View, Button, ActivityIndicator, Image, TextInput } from 'react-native'
import { PropTypes } from 'prop-types'
import Style from './WelcomeScreenStyle'
import { Images } from 'App/Theme'
import gun from 'App/Services/GunService'
import { iris, login as irisLogin } from 'App/Services/IrisService'
import { Key, Message } from 'iris-lib'
import NotificationsIOS, { NotificationAction, NotificationCategory } from 'react-native-notifications'

let upvoteAction = new NotificationAction({
  activationMode: 'background',
  title: String.fromCodePoint(0x1F44D),
  identifier: 'UPVOTE_ACTION'
})

let replyAction = new NotificationAction({
  activationMode: 'background',
  title: 'Reply',
  authenticationRequired: true,
  textInput: {
    buttonTitle: 'Reply now',
    placeholder: 'Insert message'
  },
  identifier: 'REPLY_ACTION'
})

class WelcomeScreen extends React.Component {
  componentDidMount() {

  }

  requestNotificationPermissions() {
    let cat = new NotificationCategory({
      identifier: 'SOME_CATEGORY',
      actions: [upvoteAction, replyAction]
    });
    NotificationsIOS.requestPermissions([cat]);
  }

  static navigationOptions = {
    header: null
  }

  logInAsNewUser() {
    let localNotification = NotificationsIOS.localNotification({
    	body: "Local notificiation!",
    	title: "Local Notification Title",
    	sound: "chime.aiff",
        silent: false,
    	category: "SOME_CATEGORY",
    	userInfo: { },
      date: new Date(Date.now() + (20 * 1000))
    })
    const name = this.state.name
    if (!(name && name.length > 0)) {
      return; // TODO: show error
    }
    if (name.indexOf('{') !== -1 || name.indexOf('}') !== -1) {
      return; // prevent accidentally pasting private key here
    }
    const logInWithKey = key => {
      gun.user().auth(key)
      irisLogin(gun, key, {name})
      const TRUSTED_BY_DEFAULT = {keyID: 'b8ByaYNBDCMLNdZqMdas5oUFLCxBf2VH3-NjUulDaTo.DVzINErRVs6m5tyjAux6fcNfndadcgZVN5hLSwYTCLc'}
      Message.createRating({recipient: TRUSTED_BY_DEFAULT, rating: 1, text: 'Trusted by default as a web of trust entry point.'}, key)
        .then(m => iris().addMessage(m))
    }
    Key.generate().then(logInWithKey)
    this.props.navigation.navigate('ChatListScreen')
    this.requestNotificationPermissions()
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
