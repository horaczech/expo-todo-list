import React from 'react';
import {TaskStackScreenProps} from '@/appTypes/navigation';
import {Box, Text} from '@/components/UI';
import moment from 'moment';
import {DATE_FORMATS} from '@/lib/moment/formats';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native';
import Header from '@/features/components/Header/Header';

export default function TaskDetailScreen({
  route,
}: TaskStackScreenProps<'TaskDetail'>) {
  const {id, status, text, created} = route.params;
  const {t} = useTranslation('general');

  if (!id) {
    return null;
  }

  return (
    <>
      <Header screenName={route.params.text} type="sub" />
      <ScrollView>
        <Box px="2" py="4">
          <Text>
            {t('created')}: {moment(created).format(DATE_FORMATS.dateTime)}
          </Text>
          <Text variant="h1" mt="2">
            {text}
          </Text>
          <Text mt="1">
            {t('status')}: {status}
          </Text>
        </Box>
      </ScrollView>
    </>
  );
}
