import React from 'react'
import { View, Text, TextInput, Image, Dimensions } from 'react-native'
import Style from './Style'
import gun from 'App/Services/GunService'
import Button from 'App/Components/Button'
import Identicon from 'App/Components/Identicon'
import {Attribute} from 'iris-lib'
import { SvgXml } from 'react-native-svg';

class ContactScreen extends React.Component {
  state = {
    name: '',
  }

  static navigationOptions = ({navigation}) => {
    const {state} = navigation;
    return {
      title: state.params.title || '',
      headerTitle: state.params.title || '',
    }
  }

  componentDidMount() {
    const pub = this.props.navigation.getParam('pub', '')
    this.setState({name: '', pub})
    gun.user(pub).get('profile').get('name').on(name => {
      if (name) {
        this.props.navigation.setParams({title: name})
        this.setState({name})
      }
    })
  }

  render() {
    const pub = this.props.navigation.getParam('pub', '')
    return (
      <View style={{...Style.container, padding: 0}}>
        <Identicon pub={pub} width={Dimensions.get('window').width} style={{borderRadius: 0}} />
        <Button text="Chat" onPress={() => this.props.navigation.navigate('ChatScreen', {pub:this.state.pub})} />
        <Button text="Share Contact" onPress={() => this.props.navigation.navigate('ShareContactScreen', {pub:this.state.pub})} />
      </View>
    )
  }
}

export default ContactScreen
