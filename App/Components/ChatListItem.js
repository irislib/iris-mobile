import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, Text, StyleSheet, View } from 'react-native';
import ApplicationStyles from 'App/Theme/ApplicationStyles'
import Identicon from './Identicon'
import { util } from 'iris-lib'

class ChatListItem extends Component {
	render() {
		const { chat, onPress } = this.props;
		return (
		  <TouchableWithoutFeedback onPress={() => onPress()}>
       <View style={ApplicationStyles.listItem.item}>
			   <Identicon pub={chat.pub} style={ApplicationStyles.listItem.identicon} />
			   <View style={ApplicationStyles.listItem.text}>
           <Text style={ApplicationStyles.listItem.name}>{chat.name || ''}</Text>
					 <View style={ApplicationStyles.listItem.messageRow}>
             <Text style={{...ApplicationStyles.listItem.message, flex: 1}}>{(chat.latest && chat.latest.text) || ''}</Text>
					   <Text style={ApplicationStyles.listItem.message}>{(chat.latest && chat.latest.time && util.formatDate(chat.latest.time)) || ''}</Text>
					 </View>
			   </View>
       </View>
		  </TouchableWithoutFeedback>
		);
	}
}

ChatListItem.propTypes = {
  chat: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired
};

export default ChatListItem;
