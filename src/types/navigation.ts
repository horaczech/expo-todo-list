import {NavigatorScreenParams} from '@react-navigation/native';
import {TaskPreview} from '@/appTypes/task';
import {StackScreenProps} from '@react-navigation/stack';

export type RootNavigatorParamList = {
  ApplicationStack: NavigatorScreenParams<ApplicationStackParamList>;
};

export type BottomTabNavigatorParamList = {
  TaskStack: undefined;
  SettingsStack: undefined;
};

export type ApplicationStackParamList = {
  BottomTab: undefined;
};

export type ApplicationStackScreenProps<
  T extends keyof ApplicationStackParamList,
> = StackScreenProps<ApplicationStackParamList, T>;

export type TaskStackParamList = {
  Tasks: undefined;
  TaskDetail: TaskPreview;
};

export type TaskStackScreenProps<T extends keyof TaskStackParamList> =
  StackScreenProps<TaskStackParamList, T>;

export type SettingsStackParamList = {
  Settings: undefined;
  Permissions: undefined;
};
