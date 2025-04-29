import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  ActivityIndicator,
  Text as RNText
} from 'react-native';
import {
  Card,
  Title,
  DataTable,
  Button as PaperButton,
  IconButton
} from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
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
  weight: string;
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
    if (!playerId) return setLoading(false);
    (async () => {
      try {
        const snap = await getDoc(doc(db, 'players', playerId));
        if (snap.exists()) {
          setPlayer({ ...(snap.data() as Omit<Player,'id'>), id: snap.id });
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
        <RNText>Cargando jugador…</RNText>
      </View>
    );
  }
  if (!player) {
    return (
      <View style={styles.center}>
        <RNText>Jugador no encontrado.</RNText>
      </View>
    );
  }

  // datos para zebra stripes
  const rows = [
    ['Número', `${player.number}`],
    ['Edad',   `${player.age} años`],
    ['Altura', `${player.height} m`],
    ['Peso',   `${player.weight} kg`],
    ['Posición', player.position],
    ['PPG',    `${player.ppg}`],
    ['RPG',    `${player.rpg}`],
    ['APG',    `${player.apg}`],
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Cover
          source={{ uri: player.image }}
          style={styles.cover}
        />
        <Card.Content>
          <Title style={styles.title}>{player.name}</Title>

          {rows.map(([label, value], i) => (
            <View
              key={label}
              style={[
                styles.row,
                i % 2 === 1 && styles.rowEven
              ]}
            >
              <DataTable.Cell textStyle={styles.cellLabel}>
                {label}
              </DataTable.Cell>
              <DataTable.Cell
                textStyle={styles.cellValue}
                numeric
              >
                {value}
              </DataTable.Cell>
            </View>
          ))}
        </Card.Content>

        <Card.Actions style={styles.actions}>
          <PaperButton
            
            icon="play-circle"
            mode="contained"
            contentStyle={{ flexDirection: 'row-reverse' }}
            style={styles.playButton}
            labelStyle={{ color: '#FFFFFF', fontSize: 16 }}
            onPress={() => router.push(`/media?playerId=${player.id}`)}
            
          >
            Ver vídeo
          </PaperButton>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}
