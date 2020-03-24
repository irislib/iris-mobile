/**
 * @format
 */

 import 'react-native-get-random-values'
import '@gooddollar/gun-asyncstorage'
import { AppRegistry } from 'react-native'
import App from './App/App'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => App)
