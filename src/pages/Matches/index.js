import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import HeaderComp from "../../components/HeaderComp.js";
import MatchCardComp from "../../components/MatchCardComp.js";

export default function Matches() {
  const [matchs, setMatchs] = useState([]);
  const [error, setError] = useState(null);

  useFocusEffect( useCallback(() => {
    // Função para buscar Partidas da API
    const fetchMatchs = async () => {
      try {
        const response = await fetch("http://192.168.42.69:5000/api/matches");
        if (!response.ok) {
          throw new Error("Erro ao buscar partidas: " + response.statusText);
        }
        const data = await response.json();
        //console.log("Dados recebidos:", data); // Log para verificar os dados recebidos
        setMatchs(data);
      } catch (error) {
        console.error(error);
        setError(
          "Erro ao buscar partidas. Verifique sua conexão e tente novamente."
        );
      }
    };

    // Chamando a função para buscar Partidas
    fetchMatchs();
  }, []));

  // Função para renderizar cada item da lista de usuários
  const renderItem = ({ item }) => (
    <MatchCardComp 
      id={item.id} 
      name={item.name} 
      location={item.location} 
      field={item.field} 
      paid={item.paid} 
      organizer={item.TIME}
      image={item.image}
    />
  );

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} style={styles.MCard}>
        <FlatList
          data={matchs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
      <TouchableOpacity
        style={styles.createMatch}
        onPress={() => {
          navigation.navigate("CreateMatch");
        }}
      >
        <Ionicons name="add-outline" size={32} color="#FF731D" />
        {/* <Ionicons name="football-outline" size={26} color="#FF731D" /> */}
        {/* <Text style={styles.createMatchText}>Criar uma partida</Text> */}
      </TouchableOpacity>
      <View style={styles.header}>
        <HeaderComp></HeaderComp>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column-reverse",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
    backgroundColor: "#808080",
  },
  createMatch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    //width: 250,
    right: 10,
    padding: 10,
    gap: 5,
    borderRadius: 50,
    backgroundColor: "#113B8F",
    position: "absolute",
    bottom: 20,
    alignSelf: "flex-end",
    // alignSelf: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  createMatchText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF731D",
  },
  MCard: {
    display: "flex",
    alignSelf: "center",
  },
  header: {
    width: "100%",
  },
});
