import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, Text, StyleSheet, View } from 'react-native';
import ApplicationStyles from 'App/Theme/ApplicationStyles'

class ChatListItem extends Component {
	render() {
		const { chat, onPress } = this.props;
		return (
		  <TouchableWithoutFeedback onPress={() => onPress()}>
       <View style={ApplicationStyles.listItem.item}>
         <Text style={ApplicationStyles.listItem.text}>{chat.name || ''}</Text>
         <Text style={ApplicationStyles.listItem.text}>{(chat.latest && chat.latest.text) || ''}</Text>
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
