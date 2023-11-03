import React from 'react';
import TaskListItem from './TaskListItem';
import {TaskPreview} from '@/appTypes/task';
import {Pressable} from '@/components/UI';
import {View} from 'react-native';
import globalStyles from '@/styles/global';
import Icon from '@expo/vector-icons/Feather';
import DraggableFlatList from 'react-native-draggable-flatlist';
import * as Haptics from 'expo-haptics';
import {ImpactFeedbackStyle} from 'expo-haptics/src/Haptics.types';

interface Props {
  data: TaskPreview[];
  onEditTask: (id?: number) => void;
  onTextPress: (id: number) => void;
  onRemove: (id: number) => void;
  onOrderChange: (data: TaskPreview[]) => void;
  itemRefs: React.MutableRefObject<Map<any, any>>;
}

export default function TaskList({
  data,
  onTextPress,
  onEditTask,
  onRemove,
  onOrderChange,
  itemRefs,
}: Props) {
  return (
    <View style={globalStyles.f1}>
      <Pressable
        style={globalStyles.mlAuto}
        mt="2"
        mr="2"
        mb="4"
        onPress={onEditTask}
        borderRadius="md"
        width={30}
        height={30}
        alignItems="center"
        justifyContent="center"
        borderColor="primary"
        borderWidth={2}>
        <Icon name="plus" size={24} />
      </Pressable>
      <DraggableFlatList
        containerStyle={globalStyles.f1}
        data={data}
        onDragEnd={({data}) => onOrderChange(data)}
        onDragBegin={() => {
          Haptics.impactAsync(ImpactFeedbackStyle.Light);
        }}
        keyExtractor={item => item.id?.toString()}
        renderItem={({item, ...otherProps}) => (
          <TaskListItem
            data={item}
            onTextPress={() => onTextPress(item.id)}
            onEditPress={() => onEditTask(item.id)}
            itemRefs={itemRefs}
            onDelete={() => onRemove(item.id)}
            {...otherProps}
          />
        )}
      />
    </View>
  );
}
