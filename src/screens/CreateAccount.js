import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';

const CreateAccount = ({ navigation }) => {
  const [email, setEmail] = useState ('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confpassword, setConfPassword] = useState('');

  const handleCreate = () => {
    console.log('Usuário:', email);
    console.log('Usuário:', username);
    console.log('Senha:', password);
    // Ver a lógica com o Lucas
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/BoraProFutLogo.png")}/>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        secureTextEntry
        value={confpassword}
        onChangeText={(text) => setConfPassword(text)}
      />
      <TouchableOpacity 
        style={styles.loginButton}
        title="Login" 
        onPress={handleCreate} 
      >
        <Text style={styles.loginButtonText}>CADASTRAR-SE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 36,
    gap:16,
    backgroundColor: '#333333'
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#D9D9D9',
    marginBottom: 16,
    paddingLeft: 8,
    fontSize: 18,
  },
  loginButton: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#FF731D'
  },
  loginButtonText: {
    fontSize: 20,
    color: 'white',
  },
  createaccText: {
    fontSize: 20,
    color: 'white',
    textDecorationLine: 'underline'
  }
});

export default CreateAccount;