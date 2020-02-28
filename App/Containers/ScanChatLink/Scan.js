import React from 'react'
import { PropTypes } from 'prop-types'
import styles from './Style'
import gunInstance from 'App/Services/GunService'
import { login } from 'App/Services/IrisService'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

class ScanChatLinkScreen extends React.Component {
  onSuccess = (e) => {
    const key = JSON.parse(e.data)
    gunInstance.user().auth(key)
    login(gunInstance, key, {name})
    this.props.navigation.navigate('ChatListScreen')
  }

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        // flashMode={QRCodeScanner.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            <Text style={styles.textBold}>Scan someone's chat link</Text>
          </Text>
        }
      />
    );
  }
}

export default ScanChatLinkScreen
