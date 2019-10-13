import React from 'react'
import { Text, View, Image } from 'react-native'
import Style from './SplashScreenStyle'
import { Images } from 'App/Theme'

export default class SplashScreen extends React.Component {
  render() {
    return (
      <View style={Style.container}>
        <View style={Style.logoContainer}>
          <Image style={Style.logo} source={Images.logo} resizeMode={'contain'} />
        </View>
      </View>
    )
  }
}
