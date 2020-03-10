import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, Text, StyleSheet, View } from 'react-native';
import ApplicationStyles from 'App/Theme/ApplicationStyles'

class ListItem extends Component {
	render() {
		const { text, onPress} = this.props;
		return (
		  <TouchableWithoutFeedback onPress={() => onPress()}>
       <View style={ApplicationStyles.listItem.item}>
         <Text style={ApplicationStyles.listItem.text}>{text}</Text>
       </View>
		  </TouchableWithoutFeedback>
		);
	}
}

ListItem.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default ListItem;
