import React from 'react'
import { Platform, Text, KeyboardAvoidingView, View, Button, ActivityIndicator, Image, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import LoginActions from 'App/Stores/Login/Actions'
import Style from './LoginScreenStyle'
import { Images } from 'App/Theme'

class LoginScreen extends React.Component {
  componentDidMount() {

  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#74d5f1',
      borderBottomWidth: 0,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

  render() {
    return (
      <KeyboardAvoidingView style={Style.container} behavior="height">
        <View style={Style.formContainer}>
          <TextInput
            autoCorrect={false}
            style={Style.text}
            editable
            autoFocus
            placeholder="Paste your private key"
            placeholderTextColor="white"
            selectionColor="white"
            onChangeText={(key) => this.props.logInWithKey(key)}
          />
          <Text style={Style.text}>or</Text>
          <Button title="Scan QR" color="white" />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

LoginScreen.propTypes = {
  user: PropTypes.object,
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  logInWithKey: (key) => dispatch(LoginActions.logInWithKey(key))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)
