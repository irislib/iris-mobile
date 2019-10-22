import React from 'react'
import { ActivityIndicator, Text, View, Button, Image, FlatList, TouchableWithoutFeedback, TextInput } from 'react-native'
import { PropTypes } from 'prop-types'
import Style from './Style'
import { Images } from 'App/Theme'
import { Chat } from 'iris-lib'
import gun from 'App/Services/GunService'
import { iris } from 'App/Services/IrisService'
import { Message, Attribute } from 'iris-lib'
import NavigationService from 'App/Services/NavigationService'

class CreateContactScreen extends React.Component {
  state = {
    contacts: []
  }

  static navigationOptions = {
    title: 'Add contact',
    headerRight: (
      <Button title="Done" onPress={() => this.addContact()} /> // TODO fix onPress
    )
  }

  componentDidMount() {

  }

  addContact() {
    if (this.state.name && !this.state.creatingContact) {
      this.setState({creatingContact: true})
      const uuid = Attribute.getUuid()
      const name = this.state.name
      const privateKey = gun.user().is.alias
      Message.createVerification({recipient: {uuid: uuid.value, name}}, privateKey)
        .then(m => iris().addMessage(m))
      this.props.navigation.navigate('ContactScreen', { type: 'uuid', value: uuid.value })
    }
  }

  render() {
    return (
      <View style={Style.container}>
        <TextInput
          autoCapitalize="words"
          autoCorrect={false}
          style={Style.input}
          editable={!this.state.creatingContact}
          maxLength={40}
          autoFocus
          placeholder="Name"
          onChangeText={(name) => this.setState({name})}
        />
        <Button title="Add contact" onPress={() => this.addContact()} />
      </View>
    )
  }
}

CreateContactScreen.propTypes = {
  chats: PropTypes.array,
}

export default CreateContactScreen
