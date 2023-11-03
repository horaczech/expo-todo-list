import React, {useEffect} from 'react';
import Icon from '@expo/vector-icons/Feather';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {StyleSheet, View} from 'react-native';

export default function LoadingScreen() {
  const rotationDeg = useSharedValue(0);

  const style = useAnimatedStyle(() => {
    return {
      width: 40,
      height: 40,
      transform: [
        {
          rotate: `${rotationDeg.value}deg`,
        },
      ],
    };
  });

  useEffect(() => {
    if (rotationDeg.value === 0) {
      rotationDeg.value = withRepeat(
        withSequence(
          withTiming(360, {
            duration: 1900,
            easing: Easing.linear,
          }),
        ),
        -1,
      );
    }
  }, [rotationDeg]);

  return (
    <View style={styles.container}>
      <Animated.View style={style}>
        <Icon size={40} name="loader" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
