import {createContext, PropsWithChildren, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageKeys} from '../constants/asyncStorage';
import {Appearance, useColorScheme} from 'react-native';

export type SettingsContextType = {
  isDarkMode: null | boolean;
  darkModeSettings: null | boolean | 'system';
  changeDarkMode: (mode: boolean | 'system') => void;
};

export const SettingsContext = createContext<SettingsContextType>({
  isDarkMode: null,
  darkModeSettings: null,
  changeDarkMode: () => {},
});

export const SettingsProvider = ({children}: PropsWithChildren) => {
  const [isDarkMode, setIsDarkMode] = useState<null | boolean>(null);
  const [darkModeSettings, setDarkModeSettings] = useState<
    null | boolean | 'system'
  >(null);
  const colorScheme = useColorScheme();

  const changeDarkMode = (mode: boolean | 'system') => {
    setDarkModeSettings(mode);
    if (mode === 'system') {
      setIsDarkMode(Appearance.getColorScheme() === 'dark');
    }
    AsyncStorage.setItem(AsyncStorageKeys.darkMode, JSON.stringify(mode));
  };

  useEffect(() => {
    (async () => {
      if (darkModeSettings === null) {
        try {
          const savedDarkMode = await AsyncStorage.getItem(
            AsyncStorageKeys.darkMode,
          );
          setDarkModeSettings(
            savedDarkMode ? JSON.parse(savedDarkMode) : 'system',
          );
        } catch {
          //
        }
      } else if (typeof darkModeSettings === 'boolean') {
        setIsDarkMode(darkModeSettings);
      }
    })();
  }, [darkModeSettings]);

  useEffect(() => {
    console.log(darkModeSettings, colorScheme);
    if (darkModeSettings === 'system' && colorScheme) {
      setIsDarkMode(colorScheme === 'dark');
    }
  }, [darkModeSettings, colorScheme]);

  const value: SettingsContextType = {
    isDarkMode,
    darkModeSettings,
    changeDarkMode,
  };
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
