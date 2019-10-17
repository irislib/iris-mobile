import React from 'react'
import { ActivityIndicator, Text, View, Button, Image, FlatList, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import ExampleActions from 'App/Stores/Example/Actions'
import { liveInEurope } from 'App/Stores/Example/Selectors'
import Style from './ChatListScreenStyle'
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
    headerLeft: null,
    headerRight: (
      <Button
        onPress={() => NavigationService.navigate('MainScreen')}
        title="+"
      />
    ),
    headerTitle: (
      <Image style={Style.headerLogo} source={Images.logo} resizeMode={'contain'} />
    ),
  }

  componentDidMount() {

  }

  render() {
    return (
      <View style={Style.container}>
        <FlatList
          data={this.props.chats}
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

const mapStateToProps = (state) => {
  const chats = Object.values(state.chat.chatsByKey)
  return { chats }
}

const mapDispatchToProps = (dispatch) => ({
  // fetchUser: () => dispatch(ExampleActions.fetchUser()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatListScreen)
