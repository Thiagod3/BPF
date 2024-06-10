import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import apiURL from "../../utils/API";


export default function Login() {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      console.log(apiURL)
      const response = await fetch(`${apiURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao fazer login");
      }

      const responseData = await response.json();
      const token = responseData.token;
      const userId = responseData.userId;

      // Aqui você pode salvar o token no AsyncStorage para usar posteriormente
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('userId', userId.toString());

      // console.log("Token do Login: " + token)
      // console.log("ID do Login: " + userId)
      

      //Alert.alert("Sucesso", "Login realizado com sucesso!");
      // console.log(responseData);
      navigation.navigate("Matches");
    } catch (error) {
      //console.error("Erro de autenticação:", error);
      Alert.alert(
        "Erro",
        error.message || "Falha ao fazer login. Verifique suas credenciais."
      );
    }
  };

  const handleCreateAcc = () => {
    console.log("clicou");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/BoraProFutLogo.png")} />

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
        onPress={handleLogin}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.createacc}
        title="CreateAcc"
        onPress={() => {
          navigation.navigate("CreateAccount");
        }}
      >
        <Text style={styles.createaccText}>Criar uma nova conta?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    padding: 36,
    gap: 16,
    backgroundColor: "#333333",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#D9D9D9",
    marginBottom: 16,
    paddingLeft: 8,
    fontSize: 18,
  },
  loginButton: {
    height: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#FF731D",
  },
  loginButtonText: {
    fontSize: 20,
    color: "white",
  },
  createaccText: {
    fontSize: 20,
    color: "white",
    textDecorationLine: "underline",
  },
});
