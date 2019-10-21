import React from 'react'
import { ActivityIndicator, Text, View, Button, Image, FlatList, TouchableWithoutFeedback } from 'react-native'
import { PropTypes } from 'prop-types'
import Style from './Style'
import { Images } from 'App/Theme'
import { Chat } from 'iris-lib'
import gun from 'App/Services/GunService'
import { iris } from 'App/Services/IrisService'
import { Identity } from 'iris-lib'
import NavigationService from 'App/Services/NavigationService'

class ContactListScreen extends React.Component {
  state = {
    contactsByKey: {},
    contacts: []
  }

  static navigationOptions = {
    title: 'Contacts',
    headerRight: (
      <Button
        onPress={() => NavigationService.navigate('CreateContactScreen')}
        title="➕"
      />
    ),
  }

  componentDidMount() {
    const limit = 10
    const cursor = ''
    iris().search('', undefined, (contact) => {
      contact.getName(name => {
        this.setState(previousState => {
          const newState = {...previousState}
          contact.name = name
          newState.contactsByKey[contact.cursor] = contact
          newState.contacts = Object.values(newState.contactsByKey)
          return newState
        })
      })
    }, limit, cursor)
  }

  render() {
    return (
      <View style={Style.container}>
        <FlatList
          data={this.state.contacts}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ChatScreen', {key:item.cursor.split(':')[0]})}>
              <View style={Style.item}>
                <Text style={Style.text}>{item.name}</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
          keyExtractor={item => item.cursor}
        />
      </View>
    )
  }
}

ContactListScreen.propTypes = {
  chats: PropTypes.array,
}

export default ContactListScreen
