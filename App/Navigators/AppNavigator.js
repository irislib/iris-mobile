import { createAppContainer, createStackNavigator } from 'react-navigation'

import ChatListScreen from 'App/Containers/Chat/List'
import ChatScreen from 'App/Containers/Chat/Show'
import CreateChatScreen from 'App/Containers/Chat/Create'
import ContactListScreen from 'App/Containers/Contacts/List'
import ContactScreen from 'App/Containers/Contacts/Show'
import CreateContactScreen from 'App/Containers/Contacts/Create'
import ShareContactScreen from 'App/Containers/Contacts/Share'
import SplashScreen from 'App/Containers/SplashScreen/SplashScreen'
import LoginScreen from 'App/Containers/Login/LoginScreen'
import WelcomeScreen from 'App/Containers/Welcome/WelcomeScreen'
import SettingsScreen from 'App/Containers/Settings/SettingsScreen'
import ShowPrivateKeyScreen from 'App/Containers/Settings/ShowPrivateKeyScreen'
import EditProfileScreen from 'App/Containers/Settings/EditProfileScreen'
import PeersScreen from 'App/Containers/Settings/PeersScreen'
import EditPhotoScreen from 'App/Containers/Settings/EditPhotoScreen'
import ScanChatLinkScreen from 'App/Containers/ScanChatLink/Scan'
import ScanPrivateKeyScreen from 'App/Containers/ScanPrivateKey/Scan'

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
    ContactListScreen,
    ContactScreen,
    CreateContactScreen,
    ShareContactScreen,
    LoginScreen,
    SettingsScreen,
    EditProfileScreen,
    PeersScreen,
    EditPhotoScreen,
    ShowPrivateKeyScreen,
    ScanChatLinkScreen,
    ScanPrivateKeyScreen,
  },
  {
    // By default the application will show the splash screen
    initialRouteName: 'WelcomeScreen',
    // See https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
    headerMode: 'float',
  }
)

export default createAppContainer(StackNavigator)
