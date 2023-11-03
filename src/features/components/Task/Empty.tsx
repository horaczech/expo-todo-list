import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import globalStyles from '@/styles/global';
import React from 'react';
import {Pressable, Text} from '@/components/UI';

interface Props {
  onPress: () => void;
}

export default function Empty({onPress}: Props) {
  const {t} = useTranslation('general');
  return (
    <View style={[globalStyles.f1, globalStyles.center]}>
      <Text variant="h1">{t('empty')}</Text>
      <Pressable
        mt="2"
        onPress={onPress}
        borderRadius="md"
        px="2"
        py="1"
        borderColor="primary"
        borderWidth={2}>
        <Text>{t('new_task')}</Text>
      </Pressable>
    </View>
  );
}
