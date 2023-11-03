import {
  backgroundColorShorthand,
  BackgroundColorShorthandProps,
  border,
  BorderProps,
  composeRestyleFunctions,
  layout,
  LayoutProps,
  spacingShorthand,
  SpacingShorthandProps,
  useRestyle,
} from '@shopify/restyle';
import {Theme} from '@/theme/theme';
import React, {ComponentProps} from 'react';
import {Pressable as DefaultPressable, View, ViewProps} from 'react-native';

type RestyleProps = SpacingShorthandProps<Theme> &
  BackgroundColorShorthandProps<Theme> &
  LayoutProps<Theme> &
  BorderProps<Theme>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacingShorthand,
  backgroundColorShorthand,
  //@ts-ignore
  border,
  layout,
]);

type Props = ComponentProps<typeof View> &
  RestyleProps & {
    onPress?: (param?: any) => void;
    isDisabled?: boolean;
    pressedOpacity?: number;
    style?: ViewProps['style'];
    hitSlop?: number;
  };
const Pressable = ({
  onPress,
  children,
  style,
  isDisabled = false,
  hitSlop,
  pressedOpacity = 0.75,
  ...rest
}: Props) => {
  const props = useRestyle(restyleFunctions, rest);
  return (
    <DefaultPressable
      onPress={onPress}
      disabled={isDisabled}
      hitSlop={hitSlop}
      style={({pressed}) => [
        pressed ? {opacity: pressedOpacity} : null,
        style,
      ]}>
      <View {...props}>{children}</View>
    </DefaultPressable>
  );
};

export default Pressable;

export type PressableProps = Props;
