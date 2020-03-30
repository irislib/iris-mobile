import React from 'react'
import { PropTypes } from 'prop-types'
import { Chat } from 'iris-lib'
import styles from './Style'
import gunInstance from 'App/Services/GunService'
import { session } from 'App/Services/IrisService'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

class ScanChatLinkScreen extends React.Component {
  onSuccess = (e) => {
    console.log('scanned chat link', e);
    if (e.data.indexOf('http') === 0 && e.data.indexOf('chatWith')) {
      const chat = new Chat({key: session.keypair, gun: gunInstance, chatLink: e.data})
      const pub = Object.keys(chat.secrets)[0]
      this.props.navigation.navigate('ChatScreen', {pub})
    }
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
