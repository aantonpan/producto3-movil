// app/_layout.tsx
import React from 'react';
import {
  DefaultTheme as NavigationDefault,
  DarkTheme as NavigationDark,
  ThemeProvider as NavigationThemeProvider
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  MD3LightTheme as PaperLight,
  MD3DarkTheme as PaperDark
} from 'react-native-paper';
import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  const colorScheme = useColorScheme(); // 'light' | 'dark'

  // Colores principales
  const ORANGE = '#FFA500';
  const WHITE  = '#FFFFFF';

  // Theme Paper claro
  const paperLightTheme = {
    ...PaperLight,
    colors: {
      ...PaperLight.colors,
      primary: ORANGE,
      onPrimary: WHITE,
      background: WHITE,
      surface: WHITE,
      secondary: ORANGE,
      // puedes sobreescribir más colores si quieres:
      // error, text, backdrop, etc.
    }
  };

  // Theme Paper oscuro (si quisieras blanco de surface igual en dark)
  const paperDarkTheme = {
    ...PaperDark,
    colors: {
      ...PaperDark.colors,
      primary: ORANGE,
      onPrimary: WHITE,
      background: WHITE,  // ojo: esto hace el fondo blanco incluso en dark
      surface: WHITE,
      secondary: ORANGE,
    }
  };

  // Theme navegación claro
  const navLightTheme = {
    ...NavigationDefault,
    colors: {
      ...NavigationDefault.colors,
      primary: ORANGE,
      background: WHITE,
      card: WHITE,
      text: '#000000',
      border: '#CCCCCC',
    }
  };

  // Theme navegación oscuro
  const navDarkTheme = {
    ...NavigationDark,
    colors: {
      ...NavigationDark.colors,
      primary: ORANGE,
      background: WHITE,
      card: WHITE,
      text: '#000000',
      border: '#444444',
    }
  };

  const paperTheme = colorScheme === 'dark' ? paperDarkTheme : paperLightTheme;
  const navTheme   = colorScheme === 'dark' ? navDarkTheme   : navLightTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationThemeProvider value={navTheme}>
        <Stack initialRouteName="inicio" />
        <StatusBar style="auto" />
      </NavigationThemeProvider>
    </PaperProvider>
  );
}
