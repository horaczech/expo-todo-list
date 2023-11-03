import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  f1: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyStart: {
    justifyContent: 'space-between',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  mlAuto: {
    marginLeft: 'auto',
  },
  mrAuto: {
    marginRight: 'auto',
  },
  myAuto: {
    marginVertical: 'auto',
  },
  h100: {
    height: '100%',
  },
});

export default globalStyles;
