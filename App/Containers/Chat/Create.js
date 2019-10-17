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

class CreateChatScreen extends React.Component {
  state = {
    contacts: []
  }

  static navigationOptions = {
    title: 'Contacts',
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
        <FlatList
          data={this.state.contacts}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ChatScreen')}>
              <View style={Style.item}>
                <Text style={Style.text}>contact</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
          // keyExtractor={item => item.key}
        />
      </View>
    )
  }
}

CreateChatScreen.propTypes = {
  chats: PropTypes.array,
}

export default CreateChatScreen
