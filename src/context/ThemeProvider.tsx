import {PropsWithChildren, useContext} from 'react';
import {ThemeProvider as DefaultThemeProvider} from '@shopify/restyle';
import {SettingsContext} from './SettingsContext';
import {darkTheme, theme} from '@/theme/theme';

const ThemeProvider = ({children}: PropsWithChildren) => {
  const {isDarkMode} = useContext(SettingsContext);
  return (
    <DefaultThemeProvider theme={isDarkMode ? darkTheme : theme}>
      {children}
    </DefaultThemeProvider>
  );
};

export default ThemeProvider;
