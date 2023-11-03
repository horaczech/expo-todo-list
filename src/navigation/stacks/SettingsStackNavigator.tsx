import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SettingsStackParamList} from '@/appTypes/navigation';
import {applicationStackOptions} from '@/navigation/options/stack-options';
import SettingsScreen from '@/features/screens/SettingsScreen';

const {Navigator, Screen} = createStackNavigator<SettingsStackParamList>();

export default function SettingsStackNavigator() {
  const initialRouteName: keyof SettingsStackParamList = 'Settings';

  return (
    <Navigator
      screenOptions={applicationStackOptions}
      initialRouteName={initialRouteName}>
      <Screen name="Settings" component={SettingsScreen} />
      <Screen name="Permissions" component={SettingsScreen} />
    </Navigator>
  );
}
