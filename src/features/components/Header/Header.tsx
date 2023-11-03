import {Box, Pressable, Text} from '@/components/UI';
import {ReactNode} from 'react';
import Icon from '@expo/vector-icons/Feather';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

interface Props {
  onBackPress?: () => void;
  type?: 'main' | 'sub';
  screenName: string | ReactNode;
}

export default function Header({
  onBackPress,
  type = 'main',
  screenName,
}: Props) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const backPressHandler = () => {
    if (onBackPress) {
      onBackPress();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <Box
      p="2"
      bg="primary"
      style={{paddingTop: insets.top + 10}}
      overflow="hidden">
      {onBackPress || type !== 'main' ? (
        <Pressable
          flexDirection="row"
          alignItems="center"
          onPress={backPressHandler}>
          <Icon name="chevron-left" size={22} color="#e6e6e6" />
          {typeof screenName === 'string' ? (
            <Text
              color="white"
              variant="h2"
              ml="1"
              numberOfLines={1}
              ellipsizeMode="tail">
              {screenName}
            </Text>
          ) : (
            screenName
          )}
        </Pressable>
      ) : typeof screenName === 'string' ? (
        <Text color="white" variant="h2" numberOfLines={1} ellipsizeMode="tail">
          {screenName}
        </Text>
      ) : (
        screenName
      )}
    </Box>
  );
}
