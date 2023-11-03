import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ApplicationStackParamList} from '@/appTypes/navigation';
import {applicationStackOptions} from '@/navigation/options/stack-options';
import BottomTabNavigator from '@/navigation/stacks/BottomTabNavigator';

const {Navigator, Screen} = createStackNavigator<ApplicationStackParamList>();

export default function ApplicationStack() {
  const initialRouteName: keyof ApplicationStackParamList = 'BottomTab';

  return (
    <Navigator
      screenOptions={applicationStackOptions}
      initialRouteName={initialRouteName}>
      <Screen name="BottomTab" component={BottomTabNavigator} />
    </Navigator>
  );
}
