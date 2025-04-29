import React, { useRef } from 'react';
import { View, Animated, Pressable } from 'react-native';
import { Button } from 'react-native-paper';
import { Stack, useRouter } from 'expo-router';
import { styles } from '../styles/homeStyles';

const LOGO = require('../assets/images/atlas-logo.png');

export default function Home() {
  const router = useRouter();

  // Animación de "rebote" para el logo
  const scale = useRef(new Animated.Value(1)).current;
  const onPressIn = () => {
    Animated.spring(scale, { toValue: 1.1, friction: 3, useNativeDriver: true }).start();
  };
  const onPressOut = () => {
    Animated.spring(scale, { toValue: 1, friction: 3, useNativeDriver: true }).start();
  };

  return (
    <>
      {/* Ocultamos la cabecera en home */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* Contenedor principal con fondo oscuro */}
      <View style={styles.background}>
        {/* Logo pulsable solo para la animación */}
        <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
          <Animated.Image
            source={LOGO}
            style={[styles.logo, { transform: [{ scale }] }]}
            resizeMode="contain"
          />
        </Pressable>

        {/* Botón para navegar al listado */}
        <Button
          mode="contained"
          onPress={() => router.push('/listado')}
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          Ver jugadores
        </Button>
      </View>
    </>
  );
}
