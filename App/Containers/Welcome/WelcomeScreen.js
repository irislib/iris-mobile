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
//import {Notifications} from 'react-native-notifications'
import AsyncStorage from '@react-native-community/async-storage';
import Navigation from 'App/Services/NavigationService'
// import BackgroundFetch from "react-native-background-fetch";

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

    /*
    BackgroundFetch.configure({
      minimumFetchInterval: 15,     // <-- minutes (15 is minimum allowed)
      // Android options
      forceAlarmManager: false,     // <-- Set true to bypass JobScheduler.
      stopOnTerminate: false,
      startOnBoot: true,
      requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
      requiresCharging: false,      // Default
      requiresDeviceIdle: false,    // Default
      requiresBatteryNotLow: false, // Default
      requiresStorageNotLow: false  // Default
    }, async (taskId) => {
      console.log("[js] Received background-fetch event: ", taskId);
      Notifications.postLocalNotification({
        body: "Local notificiation!",
        title: "Local Notification Title",
        sound: "chime.aiff",
        category: "SOME_CATEGORY",
        userInfo: { },
        fireDate: new Date(Date.now() + (10 * 1000))
      })
      // Required: Signal completion of your task to native code
      // If you fail to do this, the OS can terminate your app
      // or assign battery-blame for consuming too much background-time
      BackgroundFetch.finish(taskId);
    }, (error) => {
      console.log("[js] RNBackgroundFetch failed to start");
    });

    // Optional: Query the authorization status.
    BackgroundFetch.status((status) => {
      switch(status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          console.log("BackgroundFetch restricted");
          break;
        case BackgroundFetch.STATUS_DENIED:
          console.log("BackgroundFetch denied");
          break;
        case BackgroundFetch.STATUS_AVAILABLE:
          console.log("BackgroundFetch is enabled");
          break;
      }
    });*/
  }

  static navigationOptions = {
    header: null
  }

  logInWithKey(key, name) {
    console.log('logInWithKey')
    gunInstance.user().auth(key)
    irisLogin(gunInstance, key, {name})
    Navigation.navigateAndReset('ChatListScreen')

    Chat.setOnline(gunInstance, true)

    /*
    Notifications.registerRemoteNotifications()
    Notifications.events().registerNotificationReceivedForeground((notification: Notification, completion) => {
      console.log(`Notification received in foreground: ${notification}`);
      completion({alert: false, sound: false, badge: false});
    })
    Notifications.events().registerNotificationOpened((notification: Notification, completion) => {
      console.log(`Notification opened: ${notification}`);
      completion();
    })
    */

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
