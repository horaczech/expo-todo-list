import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {stackOptions} from '@/navigation/options';
import {RootNavigatorParamList} from '@/appTypes/navigation';
import ApplicationStack from './stacks/ApplicationStackNavigator';

const {Screen, Navigator: DefaultNavigator} =
  createStackNavigator<RootNavigatorParamList>();

const Navigator = () => {
  const initialRouteName: keyof RootNavigatorParamList = 'ApplicationStack';

  return (
    <DefaultNavigator
      screenOptions={stackOptions}
      initialRouteName={initialRouteName}>
      <Screen name="ApplicationStack" component={ApplicationStack} />
    </DefaultNavigator>
  );
};

export default Navigator;
