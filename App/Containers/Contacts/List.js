import React from 'react'
import { ActivityIndicator, Text, View, Button, Image, FlatList, TouchableWithoutFeedback } from 'react-native'
import { PropTypes } from 'prop-types'
import Style from './Style'
import { Images } from 'App/Theme'
import { Chat } from 'iris-lib'
import gun from 'App/Services/GunService'
import { session } from 'App/Services/IrisService'
import { Identity } from 'iris-lib'
import NavigationService from 'App/Services/NavigationService'

class ContactListScreen extends React.Component {
  state = {
    chatsByKey: {},
    chats: []
  }

  static navigationOptions = {
    title: 'Contacts',
    headerLeft: null,
    gesturesEnabled: false,
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
    Chat.getChats(session.gun, session.keypair, pub => {
      this.setState(previousState => {
        const newState = {...previousState}
        console.log('session', session)
        const chat = new Chat({gun: session.gun, key: session.keypair, participants: pub})
        chat.name = pub
        newState.chatsByKey[pub] = chat
        newState.chats = Object.values(newState.chatsByKey)
        return newState
      })
    })
  }

  render() {
    return (
      <View style={Style.container}>
        <FlatList
          data={this.state.chats}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ContactScreen', { value: item.cursor.split(':')[0], type: item.cursor.split(':')[1] })}>
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
