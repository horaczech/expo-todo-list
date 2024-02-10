import React, {memo, useContext} from 'react';
import {TaskPreview} from '@/appTypes/task';
import {Box, Pressable, Text} from '@/components/UI';
import {BoxProps} from '@shopify/restyle';
import {darkTheme, theme, Theme} from '@/theme/theme';
import {
  PixelRatio,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import moment from 'moment';
import {DATE_FORMATS} from '@/lib/moment/formats';
import Icon from '@expo/vector-icons/Feather';
import globalStyles from '@/styles/global';
import {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import SwipeableItem, {
  OpenDirection,
  SwipeableItemImperativeRef,
} from 'react-native-swipeable-item';
import UnderlayLeft from '@/features/components/Task/UnderlayLeft';
import {SettingsContext} from '@/context/SettingsContext';

interface Props
  extends Omit<RenderItemParams<TaskPreview>, 'item'>,
    TouchableOpacityProps {
  data: TaskPreview;
  onTextPress: () => void;
  onEditPress: () => void;
  containerProps?: BoxProps<Theme>;
  itemRefs: React.MutableRefObject<Map<any, any>>;
  onDelete: () => void;
}

function TaskListItem({
  data,
  onTextPress,
  onEditPress,
  containerProps,
  drag,
  isActive,
  itemRefs,
  onDelete,
  ...otherProps
}: Props) {
  const {isDarkMode} = useContext(SettingsContext);
  const isCompleted = data.status === 'done';

  const swipeableRefHandler = (ref: SwipeableItemImperativeRef | null) => {
    if (ref && itemRefs?.current && !itemRefs.current.get(data.id)) {
      itemRefs.current.set(data.id, ref);
    }
  };

  const changeHandler = ({openDirection}: {openDirection: OpenDirection}) => {
    if (itemRefs?.current && openDirection !== OpenDirection.NONE) {
      [...itemRefs.current.entries()].forEach(([key, ref]) => {
        if (key !== data.id && ref) ref.close();
      });
    }
  };

  return (
    <ScaleDecorator>
      <SwipeableItem
        key={data.id}
        item={data}
        ref={swipeableRefHandler}
        onChange={changeHandler}
        swipeEnabled
        overSwipe={10}
        activationThreshold={1}
        snapPointsLeft={[100]}
        renderUnderlayLeft={() => <UnderlayLeft closeCallback={onDelete} />}>
        <Box
          p="2"
          borderBottomWidth={PixelRatio.roundToNearestPixel(2)}
          borderBottomColor="primary"
          bg={isCompleted ? 'disabled' : 'taskBg'}
          flexDirection="row"
          {...containerProps}>
          <TouchableOpacity
            onPress={onTextPress}
            onLongPress={drag}
            disabled={isActive}
            style={[
              globalStyles.f1,
              styles.text,
              globalStyles.row,
              globalStyles.alignCenter,
              otherProps?.style,
            ]}
            {...otherProps}>
            <Text mr="1">
              {moment(data.created).format(DATE_FORMATS.shortDate)}
            </Text>
            <Text
              variant="h2"
              ellipsizeMode="tail"
              numberOfLines={1}
              textDecorationLine={isCompleted ? 'line-through' : undefined}
              mr="1">
              {data.text}
            </Text>
          </TouchableOpacity>
          <Pressable style={globalStyles.mlAuto} onPress={onEditPress}>
            <Icon
              name="edit"
              size={24}
              color={
                (isDarkMode ? darkTheme : theme).textVariants.defaults.color
              }
            />
          </Pressable>
        </Box>
      </SwipeableItem>
    </ScaleDecorator>
  );
}

export default memo(TaskListItem);

const styles = StyleSheet.create({
  text: {
    paddingRight: 44,
  },
});
