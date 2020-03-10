import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import ApplicationStyles from 'App/Theme/ApplicationStyles'

class Button extends Component {
	render() {
		const { text, onPress} = this.props;
		return (
		  <TouchableOpacity style={ApplicationStyles.button.container}
			onPress={() => onPress()}
		  >
			 <Text style={ApplicationStyles.button.text}>{text}</Text>
		  </TouchableOpacity>
		);
	}
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default Button;
