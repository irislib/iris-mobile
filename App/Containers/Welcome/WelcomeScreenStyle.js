import { StyleSheet } from 'react-native'
import Fonts from 'App/Theme/Fonts'
import ApplicationStyles from 'App/Theme/ApplicationStyles'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    flex: 1,
    backgroundColor: '#74d5f1',
  },
  title: {
    ...Fonts.style.h2,
    textAlign: 'center',
    marginBottom: 10,
  },
  welcome: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
    color: 'white',
  },
  name: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
    color: 'white'
  },
  text: {
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
    color: 'white'
  },
  loading: {
    ...Fonts.style.normal,
    textAlign: 'center',
    marginBottom: 5,
  },
  result: {
    ...Fonts.style.normal,
    textAlign: 'center',
    marginBottom: 5,
  },
  error: {
    ...Fonts.style.normal,
    textAlign: 'center',
    marginBottom: 5,
    color: 'red',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logo: {
    width: '60%',
    height: '60%',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  loginButton: {
    marginBottom: 30,
  },
})
