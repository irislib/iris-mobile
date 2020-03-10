import React from 'react'
import { View, Text, TextInput, Image } from 'react-native'
import Style from './Style'
import gun from 'App/Services/GunService'
import Button from 'App/Components/Button'
import {Attribute} from 'iris-lib'
import { SvgXml } from 'react-native-svg';

class ContactScreen extends React.Component {
  state = {
    name: '',
  }

  static navigationOptions = {
    title: '',
  }

  componentDidMount() {
    const pub = this.props.navigation.getParam('pub', '')
    new Attribute({type:'keyID', value: pub}).identiconXml({width:300}).then(xml => {
      this.setState({identicon: xml})
    })
    this.setState({name: '', pub})
    gun.user(pub).get('profile').get('name').on(name => {
      if (name) {
        this.setState({name})
      }
    })
    gun.user(pub).get('profile').get('photo').on(photo => {
      if (photo && photo.length) {
        this.setState({photo})
      }
    })
  }

  renderAvatar() {
    if (this.state.photo) {
      return (<Image
        style={{
          width: 300,
          height: 300,
          resizeMode: 'contain',
        }}
        source={{
          uri: this.state.photo,
        }}
        />)
    } else if (this.state.identicon) {
      return (<SvgXml xml={this.state.identicon} width="300" height="300" />)
    }
  }

  render() {
    return (
      <View style={Style.container}>
        {this.renderAvatar()}
        <Text style={Style.title}>{this.state.name}</Text>
        <Button text="Chat" onPress={() => this.props.navigation.navigate('ChatScreen', {pub:this.state.pub})} />
        <Button text="Share Contact" onPress={() => this.props.navigation.navigate('ShareContactScreen', {pub:this.state.pub})} />
      </View>
    )
  }
}

export default ContactScreen
