import { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { styles as customStyles } from '@/styles/inicioStyles';

// 🆕 Importamos Header y Footer
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';

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
      <View style={customStyles.card}>
        <Image source={{ uri: item.image }} style={customStyles.image} />
        <View style={customStyles.info}>
          <Text style={customStyles.name}>{item.name}</Text>
          <Text>Posición: {item.position}</Text>
          <Text>PPG: {item.ppg} | RPG: {item.rpg} | APG: {item.apg}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    // 🆕 Envolvemos todo en un View para poder incluir Header y Footer
    <View style={pageStyles.container}>
      <Stack.Screen options={{ title: 'Listado de Jugadores' }} />

      {/* 🆕 Header (parte superior) */}
      <Header />

      {/* Contenido principal: lista de jugadores o mensaje si está vacía */}
      {players.length === 0 ? (
        <View style={pageStyles.content}>
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

      {/* 🆕 Footer (parte inferior) */}
      <Footer />
    </View>
  );
}

// 🆕 Estilos para estructurar la pantalla
const pageStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

