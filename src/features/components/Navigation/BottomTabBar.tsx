import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Platform, StyleSheet, View} from 'react-native';
import TabButton from '@/features/components/Navigation/TabButton';
import Icon from '@expo/vector-icons/Feather';
import globalStyles from '@/styles/global';
import {useCallback} from 'react';

const activeColor = '#b3b300';

const normalColor = '#e6e6e6';

export default function BottomTabBar({navigation, state}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const getButton = useCallback(
    routeName => {
      switch (routeName) {
        case 'TaskStack':
          return {
            iconName: 'check-circle',
            index: 0,
          };
        case 'SettingsStack':
          return {
            iconName: 'settings',
            index: 1,
          };
        default:
          return null;
      }
    },
    [navigation],
  ) as (routeName: string) => {iconName: any; index: number} | null;

  return (
    <View style={[globalStyles.row, styles.container]}>
      {state.routes.map((route, index) => {
        const button = getButton(route.name);
        if (!button) {
          return null;
        }
        const isActive = state.index === button?.index;
        return (
          <TabButton
            key={index}
            isActive={isActive}
            style={[
              {
                paddingBottom:
                  insets.bottom + (Platform.OS === 'android' ? 20 : 10),
              },
              globalStyles.row,
              styles.button,
            ]}
            onPress={() =>
              navigation.navigate({name: route.name, params: undefined})
            }>
            <Icon
              name={button.iconName}
              size={28}
              color={isActive ? activeColor : normalColor}
            />
          </TabButton>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#246375',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  button: {
    width: '50%',
    justifyContent: 'center',
    paddingTop: 20,
  },
});
