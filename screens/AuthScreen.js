import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

export default function AuthScreen({ setRole }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigation = useNavigation();

  const handleAdminLogin = () => {
    if (password === 'test') {
      setRole('admin');
      setIsAuthenticated(true);
    } else {
      alert('Mot de passe incorrect');
    }
  };

  const handlePlayerLogin = () => {
    setRole('player');
    setIsAuthenticated(true);
  };

  useFocusEffect(
    React.useCallback(() => {
      if (isAuthenticated) {
        navigation.navigate('Formation');
      }
    }, [navigation, isAuthenticated])
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page d'authentification</Text>
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Se connecter en tant qu'admin" onPress={handleAdminLogin} />
      <Button title="Se connecter en tant que joueur" onPress={handlePlayerLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: '80%',
  },
});