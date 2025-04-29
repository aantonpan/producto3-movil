import React, { useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import {
  Stack,
  useRouter,
  useLocalSearchParams
} from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { styles } from '../styles/mediaStyles';


export default function Media() {
  const { playerId } = useLocalSearchParams<{ playerId: string }>();
  const router = useRouter();

  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!playerId) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const docRef = doc(db, 'players', playerId);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data() as { videoFile?: string };
          setVideoUri(data.videoFile ?? null);
        } else {
          console.warn('Documento de jugador no existe');
        }
      } catch (e) {
        console.error('Error obteniendo videoFile:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, [playerId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Reproductor Multimedia' }} />
      {videoUri ? (
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: videoUri }}
            style={styles.video}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
          />
        </View>
      ) : (
        <View style={styles.center}>
          <Text>No hay vídeo para este jugador.</Text>
          <Text
            style={styles.link}
            onPress={() => router.back()}
          >
            ← Volver
          </Text>
        </View>
      )}
    </>
  );
}
