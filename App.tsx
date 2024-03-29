import * as ReactNativeGestureHandler from 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {AppRegistry, StatusBar} from 'react-native';
import {setupI18Next} from '@/lib/i18n/setup';
import Navigation from '@/navigation/index';
import globalStyles from '@/styles/global';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {expo as expoConfig} from './app.json';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SettingsProvider} from '@/context/SettingsContext';
import ThemeProvider from '@/context/ThemeProvider';

export default function App() {
  const [i18nInitialized, setI18nInitialized] = useState(false);

  useEffect(() => {
    if (!i18nInitialized) {
      setupI18Next(() => setI18nInitialized(true));
    }
  }, [i18nInitialized]);

  return (
    <SafeAreaProvider>
      <ReactNativeGestureHandler.GestureHandlerRootView style={globalStyles.f1}>
        <SettingsProvider>
          <ThemeProvider>
            <BottomSheetModalProvider>
              <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
              />
              <Navigation i18nInitialized={i18nInitialized} />
            </BottomSheetModalProvider>
          </ThemeProvider>
        </SettingsProvider>
      </ReactNativeGestureHandler.GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

AppRegistry.registerComponent(expoConfig?.name, () => App);
