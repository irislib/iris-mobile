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

class ChatListScreen extends React.Component {
  state = {
    chatsByKey: {},
    chats: [],
  }

  static navigationOptions = {
    title: 'Chats',
    headerLeft: (
      <Button
        onPress={() => NavigationService.navigate('SettingsScreen')}
        title="⚙️"
      />
    ),
    headerRight: (
      <Button
        onPress={() => NavigationService.navigate('ContactListScreen')}
        title="👤"
      />
    ),
    headerTitle: (
      <Image style={Style.headerLogo} source={Images.logo} resizeMode={'contain'} />
    ),
  }

  componentDidMount() {
    Chat.getChats(pub => {
      this.setState(previousState => {
        const newState = {...previousState}
        const chat = new Chat({gun, key, participants: pub, onMessage: (msg, info) => {
          console.log(msg);
        }});
        newState.chats[pub] = chat
        newState.chatsArr = Object.values(newState.chats)
        return newState
      })
      gun.user(chat.pub).get('profile').get('name').on(name => {
        this.setState(previousState => {
          const newState = {...previousState}
          const chat = {type: 'keyID', value: key, name}
          newState.chats[key] = chat
          newState.chatsArr = Object.values(newState.chats)
          return newState
        })
      })
    })
  }

  render() {
    return (
      <View style={Style.container}>
        <FlatList
          data={this.state.chatsArr}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ChatScreen', { type: item.type, value: item.value })}>
              <View style={Style.item}>
                <Text style={Style.text}>{item.name}</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
          keyExtractor={item => item.type + item.value}
        />
      </View>
    )
  }
}

ChatListScreen.propTypes = {
  chats: PropTypes.array,
}

export default ChatListScreen
