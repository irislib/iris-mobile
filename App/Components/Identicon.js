import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import ApplicationStyles from 'App/Theme/ApplicationStyles'
import { Attribute } from 'iris-lib'
import { SvgXml } from 'react-native-svg'
import gun from 'App/Services/GunService'

class Identicon extends Component {
  state = {

  }

  componentDidMount() {
    this.setState({pub: this.props.pub})
    new Attribute({type:'keyID', value: this.props.pub}).identiconXml({width:this.props.width}).then(xml => {
      this.setState({identicon: xml})
    })
    gun.user(this.props.pub).get('profile').get('photo').on(photo => {
      if (photo && photo.length) {
        this.setState({photo})
      }
    })
  }

  render() {
    return (
      <View style={{...ApplicationStyles.identicon, width: this.props.width, height: this.props.height, borderRadius: this.props.width / 2 + 2, ...this.props.style}}>
        {this.renderImage()}
      </View>
    )
  }

	renderImage() {
    if (this.state.identicon && !this.state.photo) {
      return (<SvgXml xml={this.state.identicon} width={this.props.width} height={this.props.width} />)
    } else {
      return (<Image
        style={{
          width: this.props.width,
          height: this.props.width,
          resizeMode: 'contain',
        }}
        source={{
          uri: this.state.photo || null,
        }}
        />)
    }
  }
}

Identicon.propTypes = {
  pub: PropTypes.string.isRequired,
  width: PropTypes.number,
  style: PropTypes.object,
};

Identicon.defaultProps = {
  width: 58,
  style: {},
}

export default Identicon;
