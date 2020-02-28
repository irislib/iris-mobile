import React from 'react'
import { ActivityIndicator, Text, View, Button, Image, FlatList, ListItem, TouchableWithoutFeedback } from 'react-native'
import { PropTypes } from 'prop-types'
import Style from './Style'
import { Images } from 'App/Theme'
import { Chat } from 'iris-lib'
import gun from 'App/Services/GunService'
import { session } from 'App/Services/IrisService'
import { Identity } from 'iris-lib'
import NavigationService from 'App/Services/NavigationService'

class ChatListScreen extends React.Component {
  state = {
    chats: {},
    chatsArr: [],
  }

  static navigationOptions = ({navigation}) => {
    const {state} = navigation;
    return {
      title: 'Chats',
      headerTitle: null,
      headerLeft: (
        <Button title={(state.params && state.params.name) || ''} onPress={() => NavigationService.navigate('SettingsScreen')} />
      )
    }
  }

  componentDidMount() {
    gun.user().get('profile').get('name').on(name => this.props.navigation.setParams({name}))
    Chat.getChats(session.gun, session.keypair, pub => {
      console.log('got chat', pub);
      this.setState(previousState => {
        if (previousState.chats[pub]) {
          return
        }
        const newState = {...previousState}
        const chat = {};
        chat.pub = pub
        newState.chats[pub] = chat
        newState.chatsArr = Object.values(newState.chats)
        return newState
      })
      gun.user(pub).get('profile').get('name').on(name => {
        this.setState(previousState => {
          const newState = {...previousState}
          newState.chats[pub].name = name
          newState.chatsArr = Object.values(newState.chats)
          return newState
        })
      })
    })
  }

  render() {
    return (
      <View style={Style.container}>
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('NewChatScreen')}>
          <View style={Style.item}>
            <Text style={Style.text}>Start new chat</Text>
          </View>
        </TouchableWithoutFeedback>
        <FlatList
          data={this.state.chatsArr}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ChatScreen', { pub: item.pub })}>
              <View style={Style.item}>
                <Text style={Style.text}>{item.name}</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
          keyExtractor={item => item.pub}
        />
      </View>
    )
  }
}

ChatListScreen.propTypes = {
  chats: PropTypes.array,
}

export default ChatListScreen
