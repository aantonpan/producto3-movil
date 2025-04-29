// app/inicio.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import { styles } from '../styles/inicioStyles';
import PlayerCard, { Player } from '../components/ui/PlayerCard';



export default function Inicio() {
  const [players, setPlayers] = useState<Player[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocs(collection(db, 'players'));
        const data: Player[] = snap.docs.map(d => {
          const docData = d.data() as any;
          return {
            id:       d.id,
            name:     docData.name,
            position: docData.position,
            ppg:      docData.ppg,
            rpg:      docData.rpg,
            apg:      docData.apg,
            image:    docData.image,
          };
        });
        setPlayers(data);
      } catch (e) {
        console.error('Error obteniendo jugadores:', e);
      }
    })();
  }, []);

  const renderItem = ({ item }: { item: Player }) => (
    <PlayerCard
      player={item}
      onPress={() =>
        router.push({
          pathname: '/detalle',
          params:   { id: item.id }
        })
      }
    />
  );

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
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
      <Footer />
    </View>
  );
}
