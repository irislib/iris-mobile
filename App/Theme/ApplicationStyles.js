import Fonts from 'App/Theme/Fonts'

/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */

export default {
  screen: {
    container: {
      flex: 1,
    },
  },
  listItem: {
    item: {
      marginVertical: 8,
      marginHorizontal: 16,
      padding: 16,
      borderBottomWidth: 1,
      borderColor: '#eee',
    },
    text: {
      ...Fonts.style.normal,
      fontSize: Fonts.size.medium,
      textAlign: 'left',
      marginBottom: 5,
    },
  },
  button: {
    text: {
      fontSize: 20,
      color: '#ffffff',
      textAlign: 'center',
    },
    container: {
      padding:10,
      backgroundColor: '#74d5f1',
      borderRadius:5,
    }
  }
}
