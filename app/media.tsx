import { View, Text, Button } from 'react-native';
import { Stack, useRouter } from 'expo-router';

export default function Media() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: 'Reproductor Multimedia' }} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Pantalla de Reproductor</Text>
        <Button title="Volver al Inicio" onPress={() => router.push('../inicio')} />
      </View>
    </>
  );
}
