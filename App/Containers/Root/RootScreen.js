import WebviewCrypto from '@gooddollar/react-native-webview-crypto'
import React, { Component } from 'react'
import NavigationService from 'App/Services/NavigationService'
import AppNavigator from 'App/Navigators/AppNavigator'
import { View } from 'react-native'
import styles from './RootScreenStyle'
import { PropTypes } from 'prop-types'

class RootScreen extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <WebviewCrypto/>
        <AppNavigator
          // Initialize the NavigationService (see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html)
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }}
        />
      </View>
    )
  }
}

RootScreen.propTypes = {
  startup: PropTypes.func,
}

export default RootScreen
