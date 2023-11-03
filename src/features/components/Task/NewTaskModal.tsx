import React, {useEffect, useMemo, useRef} from 'react';
import {TaskPreview} from '@/appTypes/task';
import {
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import {Alert, StyleSheet, Switch, View} from 'react-native';
import {Box, Pressable, Text} from '@/components/UI';
import {useTranslation} from 'react-i18next';
import {useFormik} from 'formik';

interface Props {
  initialData: TaskPreview | null;
  onSubmit: (data: Pick<TaskPreview, 'text' | 'status'>) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function NewTaskModal({
  initialData,
  onSubmit,
  isOpen,
  onClose,
}: Props) {
  const {t} = useTranslation('general');
  const modalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [350], []);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.present();
    } else {
      modalRef.current?.dismiss();
    }
  }, [isOpen]);

  const initialValues: Pick<TaskPreview, 'id' | 'text' | 'status'> = {
    id: initialData?.id ?? -1,
    status: initialData?.status ?? 'active',
    text: initialData?.text ?? '',
  };

  const submitHandler = (values: typeof initialValues) => {
    if (!values?.text) {
      return Alert.alert('Task cannot be empty');
    }
    modalRef.current?.dismiss();
    return onSubmit({text: values.text, status: values.status ?? 'active'});
  };

  const formikProps = useFormik({
    initialValues,
    onSubmit: submitHandler,
    enableReinitialize: true,
  });

  const renderBackdrop = (props: BottomSheetBackdropProps) => {
    return (
      <Pressable onPress={onClose} style={StyleSheet.absoluteFill} {...props} />
    );
  };

  return (
    <View style={styles.sheetContainer}>
      <BottomSheetModal
        backdropComponent={renderBackdrop}
        snapPoints={snapPoints}
        enablePanDownToClose
        onDismiss={onClose}
        ref={modalRef}>
        <Box px="4">
          <Text textAlign="center" mb="4" variant="h1">
            {initialData ? t('edit_task') : t('new_task')}
          </Text>
          <BottomSheetTextInput
            style={styles.input}
            value={formikProps.values.text}
            onChangeText={text => formikProps.setFieldValue('text', text)}
          />
          {initialData ? (
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-end"
              mt="2">
              <Text mr="2">
                {formikProps.values.status === 'active'
                  ? t('active')
                  : t('done')}
              </Text>
              <Switch
                trackColor={{false: '#235c6c', true: '#9f9f9f'}}
                thumbColor={
                  formikProps.values.status === 'active' ? '#f4f3f4' : '#72cfe3'
                }
                ios_backgroundColor="#3e3e3e"
                onValueChange={value => {
                  formikProps.setFieldValue(
                    'status',
                    value ? 'done' : 'active',
                  );
                }}
                value={formikProps.values.status === 'done'}
              />
            </Box>
          ) : null}
          <Pressable
            onPress={formikProps.handleSubmit}
            borderWidth={1}
            borderColor="primary"
            borderRadius="lg"
            bg="primary"
            mt="4"
            p="2">
            <Text textAlign="center" color="white">
              {t('add_new')}
            </Text>
          </Pressable>
        </Box>
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
    position: 'absolute',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 54,
  },
});
