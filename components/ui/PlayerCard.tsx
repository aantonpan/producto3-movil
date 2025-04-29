// components/ui/PlayerCard.tsx
import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

export type Player = {
  id: string;
  name: string;
  position: string;
  ppg: number;
  rpg: number;
  apg: number;
  image: string;
};

type Props = {
  player: Player;
  onPress: () => void;
};

export default function PlayerCard({ player, onPress }: Props) {
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Cover source={{ uri: player.image }} style={styles.cover} />
      <Card.Content>
        <Title>{player.name}</Title>
        <Paragraph>Posición: {player.position}</Paragraph>
        <Paragraph>
          PPG: {player.ppg} | RPG: {player.rpg} | APG: {player.apg}
        </Paragraph>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    elevation: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cover: {
    height: 160,
  },
});
