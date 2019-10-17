import React from 'react'
import { ActivityIndicator, Text, View, Button, Image, FlatList, TouchableWithoutFeedback } from 'react-native'
import { PropTypes } from 'prop-types'
import Style from './Style'
import { Images } from 'App/Theme'
import { Chat } from 'iris-lib'
import gun from 'App/Services/GunService'
import iris from 'App/Services/IrisService'
import { Identity } from 'iris-lib'
import NavigationService from 'App/Services/NavigationService'


/**
 * This is an example of a container component.
 *
 * This screen displays a little help message and informations about a fake user.
 * Feel free to remove it.
 */

function Item({ title }) {
  return (
    <TouchableWithoutFeedback>
      <View style={Style.item}>
        <Text style={Style.title}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

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
        title="👤"
      />
    ),
    headerRight: (
      <Button
        onPress={() => NavigationService.navigate('CreateChatScreen')}
        title="➕"
      />
    ),
    headerTitle: (
      <Image style={Style.headerLogo} source={Images.logo} resizeMode={'contain'} />
    ),
  }

  componentDidMount() {
    gun.user().get('chat').map().on((node, key) => {
      this.setState(previousState => {
        const newState = {...previousState}
        const chat = {key, name: key.substr(0, 12) + '...'}
        newState.chatsByKey[key] = chat
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
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ChatScreen', {key:item.key})}>
              <View style={Style.item}>
                <Text style={Style.text}>{item.name}</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
          keyExtractor={item => item.key}
        />
      </View>
    )
  }
}

ChatListScreen.propTypes = {
  chats: PropTypes.array,
}

export default ChatListScreen
