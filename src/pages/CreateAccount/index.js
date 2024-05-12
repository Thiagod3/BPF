import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";


export default function CreateAccount() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");

  // const [user, setUser] = useState();

  const handleCreate = async () => {
    //Verifica se dados foram inseridos e são validos
    if (!email || !username || !password || !confirmpassword || !description || !position) {
      Alert.alert("Dado vazio", "Preencha o campo vazio");
      return
    } else if (password !== confirmpassword) {
      Alert.alert(
        "Senhas Invalidas",
        "A senha digitada não é igual a senha de confirmação!"
      );
      return
    }

    const userData = {
      email: email,
      username: username,
      password: password,
      description: description,
      position: position,
    };

    // setUser(userData);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        Alert.alert("Ocorreu um erro no cadastro", "Tente novamente mais tarde")
        throw new Error("Erro ao enviar os dados para a API.");
      }else {
        console.log("Dados enviados com sucesso para a API.");
        Alert.alert("Dados Cadastrados", "O usuário foi cadastrado com sucesso")
        navigation.navigate("Login")
      }
    } catch (error) {
      console.error("Erro:", error.message);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={require("../../../assets/BoraProFutLogo.png")} />
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
          value={confirmpassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Posição  ex: Atacante, Goleiro..."
          value={position}
          onChangeText={(text) => setPosition(text)}
        />

        <TextInput
          style={styles.inputDescription}
          placeholder="Descrição do Usuário"
          multiline={true}
          numberOfLines={4}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />

        <TouchableOpacity
          style={styles.loginButton}
          title="register"
          onPress={handleCreate}
        >
          <Text style={styles.loginButtonText}>CADASTRAR-SE</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
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
  inputDescription: {
    height: 100,
    textAlign: "left",
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
