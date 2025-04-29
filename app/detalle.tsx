// app/detalle.tsx
import React, { useEffect, useState } from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import {
  Card,
  Title,
  DataTable,
  Button as PaperButton,
  Text
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
        setPlayer({ ...(snap.data() as Omit<Player, 'id'>), id: snap.id });
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
      <View style={styles.center}>
        <Text>Jugador no encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: player.image }} />
        <Card.Content>
          <Title style={styles.title}>{player.name}</Title>

          <DataTable>
            <DataTable.Row>
              <DataTable.Cell textStyle={styles.cellLabel}>Número</DataTable.Cell>
              <DataTable.Cell textStyle={styles.cellValue} numeric>{player.number}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell textStyle={styles.cellLabel}>Edad</DataTable.Cell>
              <DataTable.Cell textStyle={styles.cellValue} numeric>{player.age} años</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell textStyle={styles.cellLabel}>Altura</DataTable.Cell>
              <DataTable.Cell textStyle={styles.cellValue} numeric>{player.height} m</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell textStyle={styles.cellLabel}>Peso</DataTable.Cell>
              <DataTable.Cell textStyle={styles.cellValue} numeric>{player.weight} kg</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell textStyle={styles.cellLabel}>Posición</DataTable.Cell>
                <DataTable.Cell numeric textStyle={styles.cellValue}>{player.position}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell textStyle={styles.cellLabel}>PPG</DataTable.Cell>
              <DataTable.Cell textStyle={styles.cellValue} numeric>{player.ppg}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell textStyle={styles.cellLabel}>RPG</DataTable.Cell>
              <DataTable.Cell textStyle={styles.cellValue} numeric>{player.rpg}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell textStyle={styles.cellLabel}>APG</DataTable.Cell>
              <DataTable.Cell textStyle={styles.cellValue} numeric>{player.apg}</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </Card.Content>

        <Card.Actions style={styles.actions}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <PaperButton
              mode="contained"
              onPress={() => router.push(`/media?playerId=${player.id}`)}
            >
              Ver vídeo
            </PaperButton>
          </View>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}
