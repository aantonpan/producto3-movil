// components/ui/PlayerCard.tsx
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
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
    <View style={styles.wrapper}>
      <Card style={styles.card} onPress={onPress}>
        <Card.Cover source={{ uri: player.image }} style={styles.cover} />
        <Card.Content style={styles.content}>
          <Title style={styles.title}>{player.name}</Title>
          <Paragraph style={styles.meta}>
            Posición: {player.position}
          </Paragraph>
          <Paragraph style={styles.meta}>
            PPG: {player.ppg} | RPG: {player.rpg} | APG: {player.apg}
          </Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
}

const { width: screenW } = Dimensions.get('window');
const CARD_HORIZONTAL_MARGIN = 16;
const CARD_WIDTH = screenW - CARD_HORIZONTAL_MARGIN * 2;

const ORANGE = '#FFA500';
const DARK   = '#333333';

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 6,
    backgroundColor: '#FFFFFF',
  },
  cover: {
    height: 180,
  },
  content: {
    paddingVertical: 12,
  },
  title: {
    color: ORANGE,
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 8,
  },
  meta: {
    color: DARK,
    fontSize: 14,
    textAlign: 'center',
  },
});
