// app/detalle.tsx
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  Button,
  ActivityIndicator
} from 'react-native';
import {
  useLocalSearchParams,
  useRouter,
  Stack
} from 'expo-router';
import { styles } from '@/styles/detalleStyles';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

type Player = {
  id: string;
  name: string;
  number: number;
  position: string;
  age: number;
  height: string;
  weight: number;
  ppg: number;
  rpg: number;
  apg: number;
  image: string;
  videoFile: string;
};

export default function Detalle() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [jugador, setJugador] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchJugador = async () => {
      try {
        const docRef = doc(db, 'players', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as Omit<Player, 'id'>;
          setJugador({ id: docSnap.id, ...data });
        } else {
          console.warn('Jugador no encontrado');
        }
      } catch (error) {
        console.error('Error obteniendo jugador:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJugador();
  }, [id]);

  // Estado de carga
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 8 }}>Cargando jugador...</Text>
      </View>
    );
  }

  // Si no hay jugador
  if (!jugador) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        <Text>Jugador no encontrado.</Text>
      </View>
    );
  }

  // Vista de detalle
  return (
    <>
      <Stack.Screen options={{ title: jugador.name }} />
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={{ uri: jugador.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.data}>Número: {jugador.number}</Text>
        <Text style={styles.data}>Edad: {jugador.age} años</Text>
        <Text style={styles.data}>Altura: {jugador.height} m</Text>
        <Text style={styles.data}>Peso: {jugador.weight} kg</Text>
        <Text style={styles.data}>Posición: {jugador.position}</Text>
        <Text style={styles.data}>PPG: {jugador.ppg}</Text>
        <Text style={styles.data}>RPG: {jugador.rpg}</Text>
        <Text style={styles.data}>APG: {jugador.apg}</Text>

        <View style={{ marginTop: 24 }}>
          <Button
            title="Ver vídeo"
            onPress={() =>
              router.push(
                `/media?playerId=${encodeURIComponent(jugador.id)}`
              )
            }
          />
        </View>
      </ScrollView>
    </>
  );
}
