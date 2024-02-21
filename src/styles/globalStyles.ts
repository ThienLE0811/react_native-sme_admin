import {StyleSheet} from 'react-native';
import {appColors} from '../constansts/appColors';
import {fontFamilies} from '../constansts/fontFamilies';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: appColors.white,
  },

  text: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: appColors.text,
  },

  button: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 56,
    flexDirection: 'row',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: appColors.white,
    margin: 12,
  },
  shadow: {
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
});
