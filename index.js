/**
 * @format
 */

import 'react-native-get-random-values'
import '@gooddollar/gun-asyncstorage'
import { Client } from 'bugsnag-react-native'
const bugsnag = new Client("bb9298087eb87d2c78929a201ddb3e88")
import { AppRegistry } from 'react-native'
import App from './App/App'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => App)
