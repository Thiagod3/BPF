import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  Platform,
} from "react-native";
import { CheckBox, FAB } from "@rneui/themed";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import DateTimePicker from "@react-native-community/datetimepicker";

const CreateMatchComp = () => {
  const [selectedField, setField] = React.useState(0);
  const [selectedPrice, setPrice] = React.useState(0);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [dateMatch, setDateMatch] = useState("");

  const [match, setMatch] = useState();

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

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
        console.log(dateMatch);
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
      name: name,
      location: location,
      field: selectedField,
      paid: selectedPrice,
      date: dateMatch
    };

    setMatch(matchData)
    console.log(match)

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/matches/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(match)
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
        {/* <Image
          source={require("../../assets/mapTEMP.png")}
          style={styles.locPic}
        /> */}
      </View>

      <View style={styles.inputBox}>
        <TextInput
          placeholder="De uma nome para a partida..."
          name="location"
          style={styles.input}
          onChangeText={(text) => setName(text)}
        />
      </View>

      <View style={styles.inputBox}>
        <TextInput
          placeholder="Digite o endereço..."
          name="location"
          style={styles.input}
          onChangeText={(text) => setLocation(text)}
        />
        <MaterialCommunityIcons name="map-marker" size={24} color="black" />
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
        title="bora pro fut!!"
        color="#113B8F"
        onPress={insereDados}
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
    width: "60%",
  },
});
export default CreateMatchComp;
