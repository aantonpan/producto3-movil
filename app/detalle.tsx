import { View, Text, Button } from 'react-native';
import { Stack, useRouter } from 'expo-router';

export default function Detalle() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: 'Detalle del Jugador' }} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Pantalla de Detalle</Text>
        <Button title="Ir a Reproductor" onPress={() => router.push('../media')} />
      </View>
    </>
  );
}
