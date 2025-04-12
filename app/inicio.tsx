import { View, Text, Button } from 'react-native';
import { Stack, useRouter } from 'expo-router';

export default function Inicio() {
  const router = useRouter(); // Hook para navegar entre pantallas

  return (
    <>
      <Stack.Screen options={{ title: 'Listado de Jugadores' }} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Pantalla de Inicio</Text>
        <Button title="Ir a Detalle" onPress={() => router.push('../detalle')} />
      </View>
    </>
  );
}
