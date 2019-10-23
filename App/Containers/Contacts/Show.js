import React from 'react'
import { View, Text, Button, Image, TextInput } from 'react-native'
import Style from './Style'
import gun from 'App/Services/GunService'
import { iris } from 'App/Services/IrisService'

class ContactScreen extends React.Component {
  state = {
    name: ''
  }

  static navigationOptions = {
    title: '',
  }

  componentDidMount() {
    const type = this.props.navigation.getParam('type', 'keyID')
    const value = this.props.navigation.getParam('value', '')
    this.setState({type, value, name: value.substr(0, 6) + '...'})
    iris().get(type, value).getName(name => {
      this.setState({name})
    })
  }

  render() {
    return (
      <View style={Style.container}>
        <Text style={Style.title}>{this.state.name}</Text>
        <Button title="💬 Chat" onPress={() => this.props.navigation.navigate('ChatScreen', {type:this.state.type, value:this.state.value})} />
        <Button title="🔗 Share Contact" onPress={() => this.props.navigation.navigate('ShareContactScreen', {type:this.state.type, value:this.state.value})} />
      </View>
    )
  }
}

export default ContactScreen
