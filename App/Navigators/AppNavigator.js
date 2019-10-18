import { createAppContainer, createStackNavigator } from 'react-navigation'

import ChatListScreen from 'App/Containers/Chat/List'
import ChatScreen from 'App/Containers/Chat/Show'
import CreateChatScreen from 'App/Containers/Chat/Create'
import SplashScreen from 'App/Containers/SplashScreen/SplashScreen'
import LoginScreen from 'App/Containers/Login/LoginScreen'
import WelcomeScreen from 'App/Containers/Welcome/WelcomeScreen'
import SettingsScreen from 'App/Containers/Settings/SettingsScreen'
import ScanScreen from 'App/Containers/Scan/Scan'

/**
 * The root screen contains the application's navigation.
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */
const StackNavigator = createStackNavigator(
  {
    SplashScreen,
    WelcomeScreen,
    ChatScreen,
    ChatListScreen,
    CreateChatScreen,
    LoginScreen,
    SettingsScreen,
    ScanScreen,
  },
  {
    // By default the application will show the splash screen
    initialRouteName: 'WelcomeScreen',
    // See https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
    headerMode: 'float',
  }
)

export default createAppContainer(StackNavigator)
