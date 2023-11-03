import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomTabBar from '@/features/components/Navigation/BottomTabBar';
import {BottomTabNavigatorParamList} from '@/appTypes/navigation';
import {tabBarOptions} from '@/navigation/options';
import TaskStackNavigator from '@/navigation/stacks/TaskStackNavigator';
import SettingsStackNavigator from '@/navigation/stacks/SettingsStackNavigator';

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="TaskStack"
      screenOptions={tabBarOptions}
      tabBar={props => <BottomTabBar {...props} />}>
      <Tab.Screen name="TaskStack" component={TaskStackNavigator} />
      <Tab.Screen name="SettingsStack" component={SettingsStackNavigator} />
    </Tab.Navigator>
  );
}
