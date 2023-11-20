// FormationScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setVote, resetVotes, cancelResetVotes } from '../reducer/user';

export default function FormationScreen() {
  const dispatch = useDispatch();
  const { resetVotes, participants } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');

  const saveVotes = async (updatedVotes) => {
    try {
      await AsyncStorage.setItem('votes', JSON.stringify(updatedVotes));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des votes :', error);
    }
  };

  const handleVote = (participantId, voteType) => {
    if (resetVotes) {
      return;
    }

    dispatch(setVote({ participantId, voteType }));
    saveVotes(participants);
  };

  // const handleResetVotes = () => {
  //   dispatch(resetVotes());

  //   const timeoutId = setTimeout(() => {
  //     dispatch(cancelResetVotes());
  //   }, 3000);

  //   return () => clearTimeout(timeoutId);
  // };

  useEffect(() => {
    if (resetVotes) {
      const timeoutId = setTimeout(() => {
        dispatch(cancelResetVotes());
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [resetVotes, dispatch]);

  const filteredParticipants = participants.filter((participant) =>
    participant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={[styles.participantContainer, styles.participantSeparator]}>
      <Text style={[styles.participantName, { flex: 1 }]}>{`${item.name} ${item.firstName}`}</Text>
      <TouchableOpacity onPress={() => handleVote(item.id, 'absent')}>
        <Text style={[styles.voteButton, { borderColor: '#FF5733', color: '#FF5733' }]}>Absent</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleVote(item.id, 'entrainement')}>
        <Text style={[styles.voteButton, { borderColor: '#33FF57', color: '#33FF57' }]}>Entrainement</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleVote(item.id, 'match')}>
        <Text style={[styles.voteButton, { borderColor: '#3385FF', color: '#3385FF' }]}>Match</Text>
      </TouchableOpacity>
    </View>
  );

  const renderVoteCount = ({ item }) => (
    <View style={styles.voteContainer}>
      <Text style={styles.voteCount}>
        {`${item.name} ${item.firstName}: ${item.vote}`}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.participantsList}>
        <Text style={styles.title}>Liste des participants</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un participant"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
        <FlatList
          data={filteredParticipants}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.votesContainer}>
        <Text style={styles.counterTitle}>Votes actuels:</Text>
        <FlatList
          data={participants}
          keyExtractor={(item) => item.id}
          renderItem={renderVoteCount}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f5f5f5', // Couleur de fond
  },
  participantsList: {
    flex: 1,
    padding: 2,
  },
  participantSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc', // Couleur de la ligne de séparation
    paddingBottom: 1,
    marginBottom: 1,
  },
  votesContainer: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24, // Augmentation de la taille de la police
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333', // Couleur du texte
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc', // Couleur de la bordure
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 8, // Coins arrondis
    backgroundColor: '#fff', // Couleur de fond
  },
  participantContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#fff', // Couleur de fond des participants
    padding: 10,
    borderRadius: 8, // Coins arrondis
    elevation: 3, // Ombre légère
  },
  participantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Couleur du texte
  },
  voteButton: {
    borderWidth: 1,
    padding: 8,
    marginHorizontal: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
  counterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333', // Couleur du texte
  },
  voteCount: {
    fontSize: 16,
    color: '#555', // Couleur du texte
  },
});


// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet, TextInput } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { setVote, resetVotes, cancelResetVotes } from '../reducer/user';

// export default function FormationScreen() {
//   const dispatch = useDispatch();
//   const { resetVotes, participants } = useSelector((state) => state.user);
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleVote = (participantId, voteType) => {
//     if (resetVotes) {
//       return;
//     }

//     dispatch(setVote({ participantId, voteType }));
//   };

//   const handleResetVotes = () => {
//     dispatch(resetVotes());

//     const timeoutId = setTimeout(() => {
//       dispatch(cancelResetVotes());
//     }, 3000);

//     return () => clearTimeout(timeoutId);
//   };

//   useEffect(() => {
//     if (resetVotes) {
//       const timeoutId = setTimeout(() => {
//         dispatch(cancelResetVotes());
//       }, 3000);

//       return () => clearTimeout(timeoutId);
//     }
//   }, [resetVotes, dispatch]);

//   const filteredParticipants = participants.filter((participant) =>
//     participant.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const renderItem = ({ item }) => (
//     <View style={[styles.participantContainer, styles.participantSeparator]}>
//       <Text style={[styles.participantName, { flex: 1 }]}>{`${item.name} ${item.firstName}`}</Text>
//       <TouchableOpacity onPress={() => handleVote(item.id, 'absent')}>
//         <Text style={[styles.voteButton, { borderColor: '#FF5733', color: '#FF5733' }]}>Absent</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => handleVote(item.id, 'entrainement')}>
//         <Text style={[styles.voteButton, { borderColor: '#33FF57', color: '#33FF57' }]}>Entrainement</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => handleVote(item.id, 'match')}>
//         <Text style={[styles.voteButton, { borderColor: '#3385FF', color: '#3385FF' }]}>Match</Text>
//       </TouchableOpacity>
//     </View>
//   );
  
//   const renderVoteCount = ({ item }) => (
//     <View style={styles.voteContainer}>
//       <Text style={styles.voteCount}>
//         {`${item.name} ${item.firstName}: ${item.vote}`}
//       </Text>
//     </View>
//   );
  

//   return (
//     <View style={styles.container}>
//       <View style={styles.participantsList}>
//         <Text style={styles.title}>Liste des participants</Text>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Rechercher un participant"
//           value={searchTerm}
//           onChangeText={(text) => setSearchTerm(text)}
//         />
//         <FlatList
//           data={filteredParticipants}
//           keyExtractor={(item) => item.id}
//           renderItem={renderItem}
//         />
//       </View>
//       <View style={styles.votesContainer}>
//         <Text style={styles.counterTitle}>Votes actuels:</Text>
//         <FlatList
//           data={participants}
//           keyExtractor={(item) => item.id}
//           renderItem={renderVoteCount}
//         />
//         {/* <Button title="Réinitialiser les votes" onPress={handleResetVotes} /> */}
//       </View>
//     </View>
//   )};
  
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//   },
//   participantsList: {
//     flex: 1,
//     padding: 16,
//   },
//   participantSeparator: {
//     borderBottomWidth: 1,
//     borderBottomColor: 'gray', // Vous pouvez choisir une couleur de bordure appropriée
//     paddingBottom: 5, // Ajustez si nécessaire pour l'espace entre la ligne et le texte
//     marginBottom: 5, // Ajustez si nécessaire pour l'espace entre les participants
//   },
//   votesContainer: {
//     flex: 1,
//     padding: 16,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   searchInput: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 16,
//     padding: 8,
//   },
//   participantContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   participantName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   voteButton: {
//     borderWidth: 1,
//     padding: 5,
//     marginHorizontal: 5,
//     borderRadius: 5,
//     textAlign: 'center',
//   },
//   counterTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   counterText: {
//     fontSize: 16,
//   },
// });