import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TaskStackParamList} from '@/appTypes/navigation';
import {applicationStackOptions} from '@/navigation/options/stack-options';
import TaskScreen from '@/features/screens/TaskScreen';
import TaskDetailScreen from '@/features/screens/TaskDetailScreen';

const {Navigator, Screen} = createStackNavigator<TaskStackParamList>();

export default function TaskStackNavigator() {
  const initialRouteName: keyof TaskStackParamList = 'Tasks';

  return (
    <Navigator
      screenOptions={applicationStackOptions}
      initialRouteName={initialRouteName}>
      <Screen name='Tasks' component={TaskScreen} />
      <Screen name='TaskDetail' component={TaskDetailScreen} />
    </Navigator>
  );
}
