

// HomeScreen.js
import AsyncStorage from '@react-native-async-storage/async-storage';

// HomeScreen.js
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setParticipants, setVote, resetVotes, addParticipant, removeParticipant } from '../reducer/user';
import { NavigationContainer } from '@react-navigation/native';



export default function HomeScreen({ navigation }) {
  const participants = useSelector((state) => state.user.participants);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      try {
        // Chargement des participants
        const storedParticipants = await AsyncStorage.getItem('participants');
        if (storedParticipants) {
          const parsedParticipants = JSON.parse(storedParticipants);
          dispatch(setParticipants(parsedParticipants));
        }

        // Chargement des votes
        const storedVotes = await AsyncStorage.getItem('votes');
        if (storedVotes) {
          const parsedVotes = JSON.parse(storedVotes);
          dispatch(setVote(parsedVotes));
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    };

    loadData();
  }, [dispatch]);

  const navigateToFormation = () => {
    navigation.navigate('Formation');
  };

  const navigateToSummary = () => {
    navigation.navigate('Résumé');
  };

  const navigateToAddParticipants = () => {
    navigation.navigate('Ajouter Participants');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>🏐 Bienvenue sur l'appli du volley 🏐 </Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={navigateToFormation}>
          <Text style={styles.buttonText}>🏐 Participation 🏐</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToSummary}>
          <Text style={styles.buttonText}>🔐 Formation des équipes 🔐</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToAddParticipants}>
          <Text style={styles.buttonText}>🔐 Ajouter Participants 🔐</Text>
        </TouchableOpacity>
      </View>
      <Text>Nombre total de participants : {participants.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  greeting: {
    fontSize: 18,
    marginBottom: 16,
  },
  buttonsContainer: {
    marginTop: 16,
  },
  button: {
    backgroundColor: '#ADD8E6',
    padding: 16,
    marginBottom: 16,
    width: '80%',
    alignItems: 'center',
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});



