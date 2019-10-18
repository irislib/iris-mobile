import React from 'react'
import { ActivityIndicator, Text, View, Button, Image, FlatList, TouchableWithoutFeedback, TextInput } from 'react-native'
import { PropTypes } from 'prop-types'
import Style from './Style'
import { Images } from 'App/Theme'
import { Chat } from 'iris-lib'
import gun from 'App/Services/GunService'
import { iris } from 'App/Services/IrisService'
import { Identity } from 'iris-lib'
import NavigationService from 'App/Services/NavigationService'

class CreateContactScreen extends React.Component {
  state = {
    contacts: []
  }

  static navigationOptions = {
    title: 'Add contact',
  }

  componentDidMount() {
    iris().search('', undefined, (contact) => {
      console.log('got contact', contact)
      this.setState(previousState => {
        const newState = {...previousState}
        newState.contacts.push(contact)
        return newState
      })
    })
  }

  render() {
    return (
      <View style={Style.container}>
        <TextInput style={Style.input} placeholder="Name" />
        <Button title="Add contact" />
      </View>
    )
  }
}

CreateContactScreen.propTypes = {
  chats: PropTypes.array,
}

export default CreateContactScreen
