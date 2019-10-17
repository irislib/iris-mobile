import React from 'react'
import { Platform, Text, KeyboardAvoidingView, View, Button, ActivityIndicator, Image, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import LoginActions from 'App/Stores/Login/Actions'
import Style from './WelcomeScreenStyle'
import { Images } from 'App/Theme'

class WelcomeScreen extends React.Component {
  componentDidMount() {

  }

  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <KeyboardAvoidingView style={Style.container} behavior="height">
        <View style={Style.logoContainer}>
          <Image style={Style.logo} source={Images.icon} resizeMode={'contain'} />
        </View>
        <View style={Style.formContainer}>
          <Text style={Style.welcome}>Welcome to Iris!</Text>
          <TextInput
            autoCapitalize="words"
            autoCorrect={false}
            style={Style.name}
            editable
            maxLength={40}
            autoFocus
            placeholder="What's your name?"
            placeholderTextColor="white"
            selectionColor="white"
          />
          <Button color="white" title="Go!" onPress={() => this.props.logInAsNewUser('spede')} />
        </View>
        <View style={Style.bottom}>
          <View style={Style.loginButton}>
            <Button color="white" title="Already signed up?" onPress={() => this.props.navigation.navigate('LoginScreen')} />
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

WelcomeScreen.propTypes = {
  user: PropTypes.object,
  userIsLoading: PropTypes.bool,
  userErrorMessage: PropTypes.string,
}

const mapStateToProps = (state) => ({
  user: state.example.user,
  userIsLoading: state.example.userIsLoading,
  userErrorMessage: state.example.userErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  logInAsNewUser: (name) => dispatch(LoginActions.logInAsNewUser(name)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeScreen)
