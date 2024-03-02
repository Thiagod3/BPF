import { useNavigation } from "@react-navigation/native";

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function Login(){  
  const navigation = useNavigation(); 

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Usuário:', username);
    console.log('Senha:', password);
    // Ver a lógica com o Lucas
  };

  const handleCreateAcc = () => {
    console.log('clicou');
  }

  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/BoraProFutLogo.png")}/>

      <TextInput
        style={styles.input}
        placeholder="Usuário"
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

      <TouchableOpacity 
        style={styles.loginButton}
        title="Login" 
        onPress={() => {navigation.navigate("Matches")}} 
      >
      <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity 
            style={styles.createacc}
            title="CreateAcc" 
            onPress={() => {navigation.navigate("CreateAccount")}} 
            >
            <Text style={styles.createaccText}>Criar uma nova conta?</Text>
        </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
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