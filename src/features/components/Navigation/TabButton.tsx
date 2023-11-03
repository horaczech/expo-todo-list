import {Pressable, PressableProps, StyleSheet} from 'react-native';
import {ReactNode} from 'react';
import globalStyles from '@/styles/global';

interface Props extends PressableProps {
  isActive: boolean;
  children: ReactNode;
}

export default function TabButton({
  isActive,
  children,
  style,
  ...otherProps
}: Props) {
  return (
    <Pressable
      style={({pressed}) => [
        styles.tabButton,
        globalStyles.justifyCenter,
        {opacity: pressed ? 0.75 : 1},
        style,
      ]}
      {...otherProps}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tabButton: {},
});
