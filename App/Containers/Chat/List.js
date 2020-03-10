import React from 'react'
import { ActivityIndicator, Text, View, Image, FlatList, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import ListItem from 'App/Components/ListItem'
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
      headerTitle: '',
      headerLeft: (
        <TouchableOpacity style={Style.headerLeft} onPress={() => NavigationService.navigate('SettingsScreen')}>
          <Text>{(state.params && state.params.name) || ''}</Text>
        </TouchableOpacity>
      )
    }
  }

  componentDidMount() {
    gun.user().get('profile').get('name').on(name => this.props.navigation.setParams({name}))
    console.log('session', JSON.stringify(session))
    Chat.getChats(session.gun, session.keypair, pub => {
      console.log('got chat', pub);
      this.setState(previousState => {
        if (previousState.chats[pub]) {
          return
        }
        const newState = {...previousState}
        const chat = {};
        chat.pub = pub
        chat.name = ''
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
        <ListItem text="New chat" onPress={() => this.props.navigation.navigate('CreateChatScreen')} />
        <FlatList
          data={this.state.chatsArr}
          renderItem={({ item }) => (
            <ListItem text={item.name} onPress={() => this.props.navigation.navigate('ChatScreen', { pub: item.pub })} />
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
