import { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { styles } from '@/styles/inicioStyles';

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

export default function Inicio() {
  const [players, setPlayers] = useState<Player[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'players'));
        const data = querySnapshot.docs.map(doc => {
          const player = doc.data() as Omit<Player, 'id'>;
          return { id: doc.id, ...player };
        });
        setPlayers(data);
      } catch (error) {
        console.error('Error obteniendo jugadores:', error);
      }
    };
    fetchPlayers();
  }, []);

  const renderItem = ({ item }: { item: Player }) => (
    <TouchableOpacity
      onPress={() =>
          router.push({
          pathname: '/detalle',
          params: { id: item.id },
        })
      }
    >
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>Posición: {item.position}</Text>
          <Text>PPG: {item.ppg} | RPG: {item.rpg} | APG: {item.apg}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen options={{ title: 'Listado de Jugadores' }} />
      {players.length === 0 ? (
        <View style={{ padding: 20 }}>
          <Text>No hay jugadores disponibles</Text>
        </View>
      ) : (
        <FlatList
          data={players}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16, backgroundColor: '#eee' }}
        />
      )}
    </>
  );
}
