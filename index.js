/**
 * @format
 */

import { WebView } from 'react-native-webview'
import 'react-native-crypto'
import WebviewCrypto from 'react-native-webview-crypto'
import '@gooddollar/gun-asyncstorage'
import { AppRegistry } from 'react-native'
import App from './App/App'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => App)
