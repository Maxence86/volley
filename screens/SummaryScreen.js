// SummaryScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { resetVotes } from '../reducer/user';
import { Picker } from '@react-native-picker/picker';

export default function SummaryScreen() {
  const dispatch = useDispatch();
  const { participants, resetVotes: shouldResetVotes } = useSelector((state) => state.user);

  const [teamSize, setTeamSize] = useState(4); // Taille par défaut de l'équipe
  const [teams, setTeams] = useState([]);

  const resetVotesAndTeams = () => {
    dispatch(resetVotes());
    setTeams([]); // Réinitialiser les équipes si nécessaire
    showAlert('Votes réinitialisés avec succès!');
  };

  useEffect(() => {
    if (shouldResetVotes) {
      // Réinitialiser les votes après avoir utilisé les informations
      dispatch(resetVotes());
      showAlert('Votes réinitialisés avec succès!');
    }
  }, [shouldResetVotes, dispatch]);

  const createRandomTeams = () => {
    const matchVoters = participants.filter((participant) => participant.vote === 'match');

    if (matchVoters.length === 0) {
      showAlert("Aucun participant n'a voté pour 'Match'.");
      return;
    }

    // Mélanger les votants pour un tirage au sort équitable
    const shuffledVoters = [...matchVoters].sort(() => Math.random() - 0.5);

    const numberOfTeams = Math.ceil(shuffledVoters.length / teamSize);
    const newTeams = Array.from({ length: numberOfTeams }, (_, index) => ({
      id: index + 1,
      members: shuffledVoters.slice(index * teamSize, (index + 1) * teamSize),
    }));

    setTeams(newTeams);
    showAlert('Équipes créées avec succès!');
  };

  const resetTeams = () => {
    setTeams([]);
    showAlert('Équipes réinitialisées avec succès!');
  };

  const showAlert = (message) => {
    Alert.alert('Message', message, [{ text: 'OK' }]);
  };

  const renderTeam = ({ item }) => (
    <View style={styles.teamContainer}>
      <Text style={styles.teamTitle}>Équipe {item.id}</Text>
      {item.members.map((member) => (
        <Text key={member.id} style={styles.teamMember}>{`${member.name} ${member.firstName}`}</Text>
      ))}
    </View>
  );

  const voteCount = (type) => {
    return participants.filter((participant) => participant.vote === type).length;
  };

  return (
    <View style={styles.container}>
      <View style={styles.votesContainer}>
        <Text style={styles.counterTitle}>Votes actuels:</Text>
        <Text style={styles.voteCountText}>Absent: {voteCount('absent')}</Text>
        <Text style={styles.voteCountText}>Entrainement: {voteCount('entrainement')}</Text>
        <Text style={styles.voteCountText}>Match: {voteCount('match')}</Text>
      </View>
      <Picker
        selectedValue={teamSize}
        onValueChange={(itemValue) => setTeamSize(itemValue)}
        style={styles.picker}
      >
        {[3, 4, 5, 6, 7, 8].map((size) => (
          <Picker.Item key={size} label={`${size} personnes par équipe`} value={size} />
        ))}
      </Picker>
      <Button title="Créer des équipes" onPress={createRandomTeams} />
      <Button title="Réinitialiser les votes" onPress={resetVotesAndTeams} />

      <FlatList
        data={teams}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTeam}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  votesContainer: {
    marginBottom: 16,
  },
  counterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  voteCountText: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    marginBottom: 16,
  },
  teamContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 10,
  },
  teamTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  teamMember: {
    fontSize: 14,
  },
});
