import React from 'react';
import {
  DefaultTheme as NavigationDefault,
  DarkTheme    as NavigationDark,
  ThemeProvider as NavigationThemeProvider
} from '@react-navigation/native';
import {
  Provider      as PaperProvider,
  MD3LightTheme as PaperLight,
  MD3DarkTheme  as PaperDark
} from 'react-native-paper';
import { Stack }       from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StatusBar }     from 'expo-status-bar';
import { IconButton }    from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const ORANGE = '#FFA500';
  const WHITE  = '#FFFFFF';

  const paperTheme = {
    ...(colorScheme === 'dark' ? PaperDark : PaperLight),
    colors: {
      ...(colorScheme === 'dark' ? PaperDark.colors : PaperLight.colors),
      primary:    ORANGE,
      onPrimary:  WHITE,
      background: WHITE,
      surface:    WHITE,
      secondary:  ORANGE,
    }
  };

  const navTheme = {
    ...(colorScheme === 'dark' ? NavigationDark : NavigationDefault),
    colors: {
      ...(colorScheme === 'dark' ? NavigationDark.colors : NavigationDefault.colors),
      primary:    ORANGE,
      background: WHITE,
      card:       WHITE,
      text:       '#333333',
      border:     '#CCCCCC',
    }
  };

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationThemeProvider value={navTheme}>
        <Stack
          initialRouteName="home"
          screenOptions={({ navigation }) => ({
            headerStyle:            { backgroundColor: ORANGE },
            headerTintColor:         WHITE,
            headerTitleAlign:       'center',
            contentStyle:           { backgroundColor: WHITE },
            headerBackTitle:        'Back',
            headerBackTitleVisible: true,

            headerRight: () => (
              <IconButton
                icon={() => <MaterialIcons name="home" size={28} color={WHITE} />}
                onPress={() => navigation.navigate('home')}
                style={{ marginTop: 2, marginRight: 8 }}
              />
            )
          })}
        >
          <Stack.Screen name="home"    options={{ headerShown: false }} />
          <Stack.Screen name="listado" options={{ title: 'Listado de Jugadores' }} />
          <Stack.Screen name="detalle" options={{ title: 'Detalle de Jugador' }} />
          <Stack.Screen name="media"   options={{ title: 'Reproductor Multimedia' }} />
        </Stack>
        <StatusBar style="auto" />
      </NavigationThemeProvider>
    </PaperProvider>
  );
}
