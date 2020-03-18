import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, Text, StyleSheet, View } from 'react-native';
import ApplicationStyles from 'App/Theme/ApplicationStyles'
import Identicon from './Identicon'
import { util } from 'iris-lib'

class ChatListItem extends Component {
	render() {
		const { chat, onPress } = this.props;
		let latestTimeText = ''
		if (chat.latest) {
			const now = new Date()
			latestTimeText = util.getDaySeparatorText(chat.latest.time, chat.latest.time.toLocaleDateString({dateStyle:'short'}))
			if (latestTimeText === 'today') { latestTimeText = util.formatTime(chat.latest.time) }
		}
		return (
		  <TouchableWithoutFeedback onPress={() => onPress()}>
       <View style={ApplicationStyles.listItem.item}>
			   <Identicon pub={chat.pub} style={ApplicationStyles.listItem.identicon} />
			   <View style={ApplicationStyles.listItem.text}>
           <Text style={ApplicationStyles.listItem.name}>{chat.name || ''}</Text>
					 <View style={ApplicationStyles.listItem.messageRow}>
             <Text style={{...ApplicationStyles.listItem.message, flex: 1}}>{(chat.latest && chat.latest.text) || ''}</Text>
					   <Text style={ApplicationStyles.listItem.message}>{latestTimeText}</Text>
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
