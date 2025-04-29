// app/detalle.tsx
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Dimensions, ActivityIndicator } from 'react-native';
import { Appbar, Card, Title, Paragraph, Button as PaperButton, Text } from 'react-native-paper';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { styles } from '../styles/detalleStyles';


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
  videoFile?: string;
};

export default function Detalle() {
  const router = useRouter();
  const { id: playerId } = useLocalSearchParams<{ id: string }>();
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!playerId) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const snap = await getDoc(doc(db, 'players', playerId));
        if (snap.exists()) {
          setPlayer({ id: snap.id, ...(snap.data() as Omit<Player,'id'>) });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [playerId]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
        <Text>Cargando jugador…</Text>
      </View>
    );
  }

  if (!player) {
    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => router.back()} />
          <Appbar.Content title="Jugador no encontrado" />
        </Appbar.Header>
        <View style={styles.center}>
          <Text>Lo sentimos, no encontramos ese jugador.</Text>
        </View>
      </>
    );
  }

  return (
    <>

      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.card}>
          <Card.Cover source={{ uri: player.image }} />
          <Card.Content>
            <Title>{player.name}</Title>
            <Paragraph>Número: {player.number}</Paragraph>
            <Paragraph>Edad: {player.age} años</Paragraph>
            <Paragraph>Altura: {player.height} m</Paragraph>
            <Paragraph>Peso: {player.weight} kg</Paragraph>
            <Paragraph>Posición: {player.position}</Paragraph>
            <Paragraph>
              Estadísticas: PPG {player.ppg} | RPG {player.rpg} | APG {player.apg}
            </Paragraph>
          </Card.Content>
          <Card.Actions style={styles.actions}>
            <PaperButton
              mode="contained"
              onPress={() =>
                router.push(`/media?playerId=${encodeURIComponent(player.id)}`)
              }
            >
              Ver vídeo
            </PaperButton>
          </Card.Actions>
        </Card>
      </ScrollView>
    </>
  );
}

