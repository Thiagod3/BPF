import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  Platform,
  Alert 
} from "react-native";
import { CheckBox, FAB } from "@rneui/themed";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation,  } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import DateTimePicker from "@react-native-community/datetimepicker";

const CreateMatchComp = () => {
  
  const navigation = useNavigation();

  const [selectedField, setField] = React.useState(0);
  const [selectedPrice, setPrice] = React.useState(0);
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [dateMatch, setDateMatch] = useState("");
  const [price, setPriceValue] = useState(0);


  const [user, setUser] = useState("");
  const [team, setTeam] = useState("");


  const [match, setMatch] = useState();

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Recupera o token e o ID do usuário do AsyncStorage
        const token = await AsyncStorage.getItem("token");
        const userId = await AsyncStorage.getItem("userId");

        // Se não houver token, redireciona para a tela de login
        if (!token || !userId) {
          navigation.navigate("Login");
          return;
        }

        // Faz uma solicitação ao servidor para obter os dados do usuário
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/user/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao carregar dados do usuário, Erro A");
        }

        const userData = await response.json();
        setUser(userData);

        // Após definir o usuário, busque os dados do time
        fetchUserTeam(userData.id);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        Alert.alert("Erro", "Erro ao carregar dados do usuário");
      }
    };

    fetchUserData();
  }, []);

  const fetchUserTeam = async (userId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/team/${userId}`
      );

      if (!response.ok) {
        throw new Error("Erro ao carregar dados do time");
      }

      const teamData = await response.json();

      if (Array.isArray(teamData) && teamData.length > 0) {
        const teamId = teamData[0].id;
        setTeam(teamId); // Define apenas o valor do id
      } else {
        throw new Error("Você precisa de um time para acessar essa função");
      }
    } catch (error) {
      Alert.alert(
        "Crie um time!!",
        error.message,
        [
          {
            text: "OK",
            onPress: () => {
              navigation.goBack();
            }
          }
        ],
        { cancelable: false }
      );
    }
  };

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const datePickerChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
        setDateMatch(formatDate(currentDate));
      }
    } else {
      toggleDatePicker();
    }
  };

  const formatDate = (rawDate) => {
    let date = new Date(rawDate);

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  // objeto que recebe os dados
  async function insereDados() {
    const matchData = {
      city: city,
      location: location,
      field: selectedField,
      paid: selectedPrice,
      price: selectedPrice === 1 ? price : null,
      date: dateMatch,
      time_organizador_id: team,
      contact: contact
    };

    setMatch(matchData)
    console.log(match)

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/matches/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(matchData)
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar os dados para a API.');
      }

      console.log('Dados enviados com sucesso para a API.');
    } catch (error) {
      console.error('Erro:', error.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.loc}>
        <Text style={styles.locText}>Criar Partida</Text>
      </View>

      <View style={styles.inputBox}>
        <TextInput
          placeholder="Digite o endereço"
          name="location"
          style={styles.input}
          onChangeText={(text) => setLocation(text)}
        />
        <MaterialCommunityIcons name="map-marker" size={24} color="black" />
      </View>

      <View style={styles.inputBox}>
        <TextInput
          placeholder="Cidade"
          name="city"
          style={styles.input}
          onChangeText={(text) => setCity(text)}
        />
        <MaterialCommunityIcons name="city-variant-outline" size={24} color="black" />
      </View>

      <Pressable onPress={toggleDatePicker} style={styles.inputBox}>
        <TextInput
          placeholder="Dia da partida"
          style={styles.input}
          value={dateMatch}
          onChangeText={setDateMatch}
          editable={false}
        />
        <Ionicons name="calendar-outline" size={24} color="black" />
      </Pressable>

      <View style={styles.info}>
        <Text style={styles.infoText}>Tipo de campo: </Text>
        <View style={styles.infoBox}>
          <CheckBox
            containerStyle={styles.boxes}
            checked={selectedField === 0}
            onPress={() => setField(0)}
            checkedIcon="dot-circle-o"
            title="Areia"
            size={20}
            uncheckedIcon="circle-o"
            checkedColor="#FF731D"
          />
          <CheckBox
            containerStyle={styles.boxes}
            checked={selectedField === 1}
            onPress={() => setField(1)}
            checkedIcon="dot-circle-o"
            title="Society"
            size={20}
            uncheckedIcon="circle-o"
            checkedColor="#FF731D"
          />
          <CheckBox
            containerStyle={styles.boxes}
            checked={selectedField === 2}
            onPress={() => setField(2)}
            checkedIcon="dot-circle-o"
            title="Gramado"
            size={20}
            uncheckedIcon="circle-o"
            checkedColor="#FF731D"
          />
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoText}>Campo Pago? </Text>
        <View style={styles.infoBox}>
          <CheckBox
            containerStyle={styles.boxes}
            checked={selectedPrice === 1}
            onPress={() => setPrice(1)}
            checkedIcon="dot-circle-o"
            title="Sim"
            size={20}
            uncheckedIcon="circle-o"
            checkedColor="#FF731D"
          />
          <CheckBox
            containerStyle={styles.boxes}
            checked={selectedPrice === 0}
            onPress={() => setPrice(0)}
            checkedIcon="dot-circle-o"
            title="Não"
            size={20}
            uncheckedIcon="circle-o"
            checkedColor="#FF731D"
          />
        </View>
        {selectedPrice === 1 && (
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Digite o preço"
              style={styles.input}
              value={price}
              onChangeText={setPriceValue}
              keyboardType="numeric"
            />
          </View>
        )}
      </View>

      
      <Text style={styles.infoText}>Forma de contato: </Text>
      <View style={styles.inputBox}>
        <TextInput
          placeholder="Ex: Instagram @SeuUser"
          name="contact"
          style={styles.input}
          onChangeText={(text) => setContact(text)}
        />
        <MaterialCommunityIcons name="chat-processing-outline" size={24} color="black" />
      </View>

      {showPicker && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={datePickerChange}
        />
      )}
      {/* <View style={styles.inputBox}>
        <TextInput placeholder="--:--" style={styles.input} />
        <MaterialCommunityIcons name="clock-outline" size={24} color="black" />
      </View> */}

      <FAB
        title="criar partida!!"
        color="#113B8F"
        onPress={() => {
          insereDados();
          navigation.navigate('Matches');
        }}
        titleStyle={{ color: "#FF731D", fontWeight: "bold", fontSize: 20 }}
        upperCase
        icon={<Ionicons name="football-outline" size={30} color="#FF731D" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    padding: 20,
    margin: 10,
    gap: 15,
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
  },
  locText: {
    width: "100%",
    fontWeight: "bold",
    fontSize: 26,
  },
  loc: {
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  infoBox: {
    flexDirection: "row",
    gap: -30,
  },
  boxes: {
    backgroundColor: "#D9D9D9",
  },
  box: {},
  infoText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  address: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 10,
  },
  inputBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    height: 50,
    width: "90%",
    borderRadius: 50,
    paddingHorizontal: 30,
  },
  input: {
    height: "100%",
    width: "100%",
  },
});
export default CreateMatchComp;
