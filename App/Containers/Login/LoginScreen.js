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
    header: null
  }

  render() {
    return (
      <KeyboardAvoidingView style={Style.container} behavior="height">
        <View>
          <View style={Style.logoContainer}>
            <Image style={Style.logo} source={Images.icon} resizeMode={'contain'} />
          </View>
          <Text style={Style.text}>Welcome to Iris!</Text>
          <TextInput
            autoCapitalize="words"
            autoCorrect={false}
            style={Style.name}
            editable
            maxLength={40}
            autoFocus
            placeholder="What's your name?"
          />
          <Button title="Go!" onPress={() => this.props.navigation.navigate('ChatListScreen')} />
          <Text style={Style.text}>or</Text>
          <Button title="Sign in" />
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
