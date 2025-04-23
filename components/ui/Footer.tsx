import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>FP067 - Grupo 3 · WeScript</Text>
      <Text style={styles.subtext}>
        Candela · Argos · Daniel · Víctor
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#222',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 12,
  },
  subtext: {
    color: '#aaa',
    fontSize: 10,
  },
});
