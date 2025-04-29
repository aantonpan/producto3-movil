// app/inicio.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import PlayerCard, { Player } from '../components/ui/PlayerCard';
import { styles } from '../styles/inicioStyles';

export default function Inicio() {
  const [players, setPlayers] = useState<Player[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db, 'players'));
      const data = snap.docs.map(d => {
        const doc = d.data() as any;
        return {
          id:       d.id,
          name:     doc.name,
          position: doc.position,
          ppg:      doc.ppg,
          rpg:      doc.rpg,
          apg:      doc.apg,
          image:    doc.image,
        };
      });
      setPlayers(data);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Listado de Jugadores' }} />
      <Header />
      {players.length === 0 ? (
        <View style={styles.content}>
          <Text>No hay jugadores disponibles</Text>
        </View>
      ) : (
        <FlatList
          data={players}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <PlayerCard
              player={item}
              onPress={() =>
                router.push({ pathname: '/detalle', params: { id: item.id } })
              }
            />
          )}
          contentContainerStyle={styles.list}
        />
      )}
      <Footer />
    </View>
  );
}
