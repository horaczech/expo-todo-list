import React, {useEffect, useState} from 'react';
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import Navigator from '@/navigation/Navigator';
import LoadingScreen from '@/screens/LoadingScreen';

interface Props {
  i18nInitialized: boolean;
}

const theme: Theme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: '#ecf6f9',
  },
};

const Navigation = ({i18nInitialized}: Props) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (i18nInitialized) {
      const timeout = setTimeout(() => {
        setShowContent(true);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [i18nInitialized]);

  if (!i18nInitialized || !showContent) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer theme={theme}>
      <Navigator />
    </NavigationContainer>
  );
};

export default Navigation;
