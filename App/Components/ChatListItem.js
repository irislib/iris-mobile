import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, Text, StyleSheet, View } from 'react-native';
import ApplicationStyles from 'App/Theme/ApplicationStyles'
import Identicon from './Identicon'
import { util, Chat } from 'iris-lib'
import Svg from 'App/Components/Svg'
import { SvgXml } from 'react-native-svg'
import gun from 'App/Services/GunService'
import NavigationService from 'App/Services/NavigationService'

class ChatListItem extends Component {
	state = {
		isTyping: false,
	}

	componentDidMount() {
		const chat = this.props.chat
		chat.getTheirMsgsLastSeenTime(lastSeenTime => this.setState(prev => {return {...prev, lastSeenTime}}))
		Chat.getOnline(gun, chat.pub, isOnline => this.setState(prev => {return {...prev, isOnline}}))
		chat.getTyping(isTyping => this.setState(prev => {return {...prev, isTyping}}))
	}

	renderLatestSeen() {
		const chat = this.props.chat
		if (chat.latest && chat.latest.info.selfAuthored && !this.state.isTyping) {
			const t = chat.latest.date.toISOString()
			if (this.state.lastSeenTime >= t) {
				return (<View style={ApplicationStyles.listItem.checkmark}><SvgXml xml={Svg.seenCheckmark} width={15} height={15} /></View>)
			} else if (this.state.isOnline && this.state.isOnline.lastActive >= t) {
				return (<View style={ApplicationStyles.listItem.checkmark}><SvgXml xml={Svg.deliveredCheckmark} width={15} height={15} /></View>)
			} else {
				return (<View style={ApplicationStyles.listItem.checkmark}><SvgXml xml={Svg.sentCheckmark} width={15} height={15} /></View>)
			}
		} else return (<Text></Text>)
	}

	render() {
		const { chat } = this.props;
		let latestTimeText = ''
		if (chat.latest) {
			const now = new Date()
			latestTimeText = util.getDaySeparatorText(chat.latest.date, chat.latest.date.toLocaleDateString({dateStyle:'short'}))
			if (latestTimeText === 'today') { latestTimeText = util.formatTime(chat.latest.date) }
		}
		return (
		  <TouchableWithoutFeedback onPress={() => NavigationService.navigate('ChatScreen', { pub: chat.pub, title: chat.name })}>
       <View style={ApplicationStyles.listItem.item}>
			   <Identicon pub={chat.pub} style={ApplicationStyles.listItem.identicon} />
			   <View style={ApplicationStyles.listItem.text}>
				 	 <View style={ApplicationStyles.listItem.nameRow}>
             <Text style={ApplicationStyles.listItem.name}>{chat.name || ''}</Text>
						 <Text style={ApplicationStyles.listItem.message}>{latestTimeText}</Text>
					 </View>
					 <View style={ApplicationStyles.listItem.messageRow}>
					 	 {this.renderLatestSeen()}
					 	 <Text style={this.state.isTyping ? {...ApplicationStyles.listItem.typing, flex: 1} : {...ApplicationStyles.listItem.message, flex: 1}}>{(this.state.isTyping && 'Typing...') || (chat.latest && chat.latest.text) || ''}</Text><Text style={ApplicationStyles.listItem.typing}>{chat.hasUnseen ? '*' : ''}</Text>
					 </View>
			   </View>
       </View>
		  </TouchableWithoutFeedback>
		);
	}
}

ChatListItem.propTypes = {
  chat: PropTypes.object.isRequired,
};

export default ChatListItem;
