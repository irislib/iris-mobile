import React from 'react'
import { Platform, Text, KeyboardAvoidingView, View, Button, ActivityIndicator, Image, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import ExampleActions from 'App/Stores/Example/Actions'
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
          />
          <Text style={Style.text}>or</Text>
          <Button title="Scan QR" color="white" onPress={() => this.props.navigation.navigate('ChatListScreen')} />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

LoginScreen.propTypes = {
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

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)
