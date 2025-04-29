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
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const ORANGE = '#FFA500';
  const WHITE  = '#FFFFFF';
  const paperTheme = {
    ...(colorScheme === 'dark' ? PaperDark : PaperLight),
    colors: {
      ...(colorScheme === 'dark' ? PaperDark.colors : PaperLight.colors),
      primary: ORANGE,
      onPrimary: WHITE,
      background: WHITE,
      surface: WHITE,
      secondary: ORANGE,
    }
  };
  const navTheme = {
    ...(colorScheme === 'dark' ? NavigationDark : NavigationDefault),
    colors: {
      ...(colorScheme === 'dark' ? NavigationDark.colors : NavigationDefault.colors),
      primary: ORANGE,
      background: WHITE,
      card: WHITE,
      text: '#333333',
      border: '#CCCCCC',
    }
  };

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationThemeProvider value={navTheme}>
        <Stack
         initialRouteName="home"
          screenOptions={({ navigation }) => ({
            headerStyle:      { backgroundColor: ORANGE },
            headerTintColor:   WHITE,
            headerTitleAlign: 'center',
            contentStyle:     { backgroundColor: WHITE },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('home')}
                style={styles.homeButton}
              >
                <Text style={styles.homeText}>Inicio</Text>
              </TouchableOpacity>
            )
          })}
        >
          <Stack.Screen name="home" options={{ headerShown: true }} />
          <Stack.Screen name="listado"  options={{ title: 'Listado de Jugadores' }} />
          <Stack.Screen name="detalle" options={{ title: 'Detalle de Jugador' }} />
          <Stack.Screen name="media"   options={{ title: 'Reproductor Multimedia' }} />
        </Stack>
        <StatusBar style="auto" />
      </NavigationThemeProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  homeButton: {
    marginRight: 16,
    padding: 6,
  },
  homeText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
