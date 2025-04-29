import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av'; 

const HEADER_HEIGHT = 220;

export default function Header() {
  return (
    <View style={styles.header}>
      <Video
        source={{
          uri: 'https://firebasestorage.googleapis.com/v0/b/producto3-movil.firebasestorage.app/o/video_header.mp4?alt=media&token=104bc6ff-ba95-46fd-bf74-08b71d1b9ea7',
        }}
        rate={1.0}
        volume={0.8}
        isMuted
        resizeMode={ResizeMode.COVER} 
        isLooping
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>Atlas DC</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  overlay: {
    height: HEADER_HEIGHT,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    letterSpacing: 1.5,
  },
});
