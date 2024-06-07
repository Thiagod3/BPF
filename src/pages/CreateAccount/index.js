import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import apiURL from "../../utils/API";


export default function CreateAccount() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [position, setPosition] = useState("");
  const [city, setCity] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleCreate = async () => {
    //Verifica se dados foram inseridos e são validos
    if (!email || !username || !password || !confirmpassword || !position) {
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
      position: position,
      city: city,
    };

    // setUser(userData);

    try {
      const response = await fetch(
        `${apiURL}/api/users/create`,
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
      } else {
        console.log("Dados enviados com sucesso para a API.");
        Alert.alert("Dados Cadastrados", "O usuário foi cadastrado com sucesso")
        navigation.navigate("Login")
      }
    } catch (error) {
      console.error("Erro:", error.message);
    }
  };

  const [value, setValue] = useState(null);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="#D9D9D9"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };

  const data = [
    { label: 'Atacante', value: 'atacante' },
    { label: 'Goleiro(a)', value: 'goleiro' },
    { label: 'Zagueiro(a)', value: 'zagueiro' },
    { label: 'Meio campo', value: 'meio de campo' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
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

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Selecione sua posição"
        value={value}
        onChange={item => {
          setValue(item.value);
          setPosition(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="#808080" name="Safety" size={20} />
        )}
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={styles.loginButton}
        title="register"
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.loginButtonText}>CADASTRAR</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmação de Cadastro</Text>

            <Text style={styles.modalText}>Para melhor experiência, recomendamos informar sua cidade</Text>
            <Text style={styles.modalTextInfo}>Essa informação poderá ser trocada a qualquer momento</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Cidade"
              value={city}
              onChangeText={(text) => setCity(text)}
            />

            <Text style={styles.modalText}>Deseja confirmar o cadastro?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonConfirm]}
                onPress={() => {
                  setModalVisible(false);
                  handleCreate();
                }}
              >
                <Text style={styles.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "auto",
    padding: 36,
    backgroundColor: "#333333",
  },
  contentContainer: {
    width: "100%",
    height: "100%",
    gap: 16,
    justifyContent: "center",
    alignItems: "center"
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
  dropdown: {
    width: "100%",
    height: 50,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    marginBottom: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    padding: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    margin: 10,
    backgroundColor: "#D9D9D9",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalTextInfo:{
    fontSize: 12,
    marginTop: -10,
    marginBottom: 20,
    textAlign: "center",
  },
  modalInput:{
    height: 40,
    width: "100%",
    alignSelf:"center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#D9D9D9",
    marginBottom: 16,
    paddingLeft: 8,
    fontSize: 18,

  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtonCancel: {
    backgroundColor: "#FF731D",
  },
  modalButtonConfirm: {
    backgroundColor: "#113B8F",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
});
