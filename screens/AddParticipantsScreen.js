import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addParticipant, removeParticipant } from '../reducer/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const validateData = (name, firstName, sex, level) => {
  return (
    name.trim() !== '' &&
    firstName.trim() !== '' &&
    sex.trim() !== '' &&
    level >= 1 &&
    level <= 10
  );
};

export default function AddParticipantsScreen() {
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [pickerValue, setPickerValue] = useState(null);
  const [level, setLevel] = useState('');
  const [isPickerVisible, setPickerVisible] = useState(false);
  const dispatch = useDispatch();
  const participants = useSelector((state) => state.user.participants);
  const [isModalVisible, setModalVisible] = useState(false);

  // useEffect(() => {
  //   const loadParticipants = async () => {
  //     try {
  //       const storedParticipants = await AsyncStorage.getItem('participants');
  //       if (storedParticipants) {
  //         const parsedParticipants = JSON.parse(storedParticipants);
  //         dispatch({ type: 'user/setParticipants', payload: parsedParticipants });
  //       }
  //     } catch (error) {
  //       console.error('Erreur lors du chargement des participants :', error);
  //     }
  //   };

  //   loadParticipants();
  // }, [dispatch]);

  const saveParticipants = async (updatedParticipants) => {
    try {
      await AsyncStorage.setItem('participants', JSON.stringify(updatedParticipants));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des participants :', error);
    }
  };

  const handleAddParticipant = () => {
    if (validateData(name, firstName, pickerValue, level)) {
      const newParticipant = {
        id: String(participants.length + 1),
        name: name.trim(),
        firstName: firstName.trim(),
        sex: pickerValue,
        level: Number(level),
        vote: '',
      };
      dispatch(addParticipant(newParticipant));
      saveParticipants([...participants, newParticipant]);
      setName('');
      setFirstName('');
      setPickerValue('');
      setLevel('');
    } else {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs correctement.');
    }
  };

  const handleRemoveParticipant = (participantId) => {
    const updatedParticipants = participants.filter(
      (participant) => participant.id !== participantId
    );
    dispatch({ type: 'user/setParticipants', payload: updatedParticipants });
    saveParticipants(updatedParticipants);
  };

  const renderPicker = () => {
    if (isModalVisible) {
      return (
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setPickerValue('Homme');
                setModalVisible(false);
              }}
            >
              <Text>Homme</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setPickerValue('Femme');
                setModalVisible(false);
              }}
            >
              <Text>Femme</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      );
    }
  };

  const renderParticipant = ({ item }) => (
    <View style={styles.participantContainer}>
      <Text>{`${item.name} ${item.firstName} - Niveau: ${item.level}`}</Text>
      <TouchableOpacity onPress={() => handleRemoveParticipant(item.id)}>
        <Text style={styles.removeButton}>Supprimer</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un participant</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
     <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.pickerInput}>
          <Text>{pickerValue || 'Sélectionner le sexe'}</Text>
        </View>
      </TouchableOpacity>
      {renderPicker()}
      <TextInput
        style={styles.input}
        placeholder="Niveau (1-10)"
        value={level}
        onChangeText={(text) => setLevel(text)}
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={handleAddParticipant}>
        <Text style={styles.addButton}>Ajouter</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>Liste des participants</Text>
      <FlatList
        data={participants}
        keyExtractor={(item) => item.id}
        renderItem={renderParticipant}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    padding: 8,
  },
  pickerInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    padding: 8,
    justifyContent: 'center',
  },
  picker: {
    height: 40,
    marginBottom: 8,
  },
  addButton: {
    color: 'blue',
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  participantContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  removeButton: {
    color: 'red',
    fontWeight: 'bold',
  },
    modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalButton: {
    backgroundColor: 'white',
    padding: 16,
    width: '80%',
    marginVertical: 8,
    alignItems: 'center',
  },
});
