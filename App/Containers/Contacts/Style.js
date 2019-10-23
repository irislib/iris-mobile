import { StyleSheet } from 'react-native'
import Fonts from 'App/Theme/Fonts'
import ApplicationStyles from 'App/Theme/ApplicationStyles'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
  },
  input: {
    fontSize: Fonts.size.input,
  },
  text: {
    ...Fonts.style.normal,
    fontSize: Fonts.size.medium,
    textAlign: 'left',
    marginBottom: 5,
  },
  instructions: {
    ...Fonts.style.normal,
    textAlign: 'center',
    marginBottom: 5,
    fontStyle: 'italic',
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
  headerLogo: {
    width: '100%',
    height: '70%',
  },
})
