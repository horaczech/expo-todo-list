import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import Header from '@/features/components/Header/Header';
import {SettingsContext} from '@/context/SettingsContext';
import {Box, Pressable, Text} from '@/components/UI';
import {StyleSheet} from 'react-native';
import Icon from '@expo/vector-icons/Feather';

export default function SettingsScreen() {
  const {isDarkMode, darkModeSettings, changeDarkMode} =
    useContext(SettingsContext);
  const {t} = useTranslation('general');
  const darkModeOptions: {
    label: string;
    icon: string;
    value: boolean | 'system';
  }[] = [
    {label: 'System', icon: '', value: 'system'},
    {label: 'Dark', icon: 'moon', value: true},
    {label: 'Light', icon: 'sun', value: false},
  ];

  return (
    <>
      <Header screenName="Settings" type="main" />
      <Text variant="h2" mt="4" px="2">
        {t('appearance')}
      </Text>
      <Box flexDirection="row" mt="2">
        {darkModeOptions.map((option, index) => (
          <Pressable
            key={index}
            onPress={() => changeDarkMode(option.value)}
            style={[
              styles.appearanceButton,
              darkModeSettings === option.value
                ? styles.appearanceButtonActive
                : null,
            ]}>
            <Text>{t(option.label)}</Text>
            {option.icon ? (
              <Icon
                // @ts-ignore
                name={option.icon}
                size={20}
                color={isDarkMode ? 'white' : 'black'}
              />
            ) : null}
          </Pressable>
        ))}
      </Box>
    </>
  );
}

const styles = StyleSheet.create({
  appearanceButton: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    margin: 5,
    borderColor: '#e6e6e6',
    flexDirection: 'row',
  },
  appearanceButtonActive: {
    borderColor: '#b3b300',
  },
});
