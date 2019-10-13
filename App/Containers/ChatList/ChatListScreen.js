import React from 'react'
import { ActivityIndicator, Text, View, Button, Image, FlatList, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import ExampleActions from 'App/Stores/Example/Actions'
import { liveInEurope } from 'App/Stores/Example/Selectors'
import Style from './ChatListScreenStyle'
import { Images } from 'App/Theme'

/**
 * This is an example of a container component.
 *
 * This screen displays a little help message and informations about a fake user.
 * Feel free to remove it.
 */

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

function Item({ title }) {
  return (
    <TouchableWithoutFeedback>
      <View style={Style.item}>
        <Text style={Style.title}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

class ChatListScreen extends React.Component {
  componentDidMount() {
    this._fetchUser()
  }

  static navigationOptions = {
    title: 'Chats',
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Back"
        color="#fff"
      />
    ),
  }

  render() {
    return (
      <View style={Style.container}>
        {this.props.userIsLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={DATA}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ChatScreen')}>
                <View style={Style.item}>
                  <Text style={Style.title}>{item.title}</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    )
  }

  _fetchUser() {
    this.props.fetchUser()
  }
}

ChatListScreen.propTypes = {
  user: PropTypes.object,
  userIsLoading: PropTypes.bool,
  userErrorMessage: PropTypes.string,
  fetchUser: PropTypes.func,
  liveInEurope: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  user: state.example.user,
  userIsLoading: state.example.userIsLoading,
  userErrorMessage: state.example.userErrorMessage,
  liveInEurope: liveInEurope(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(ExampleActions.fetchUser()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatListScreen)
