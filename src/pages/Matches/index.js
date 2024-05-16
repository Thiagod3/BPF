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
import AsyncStorage from "@react-native-async-storage/async-storage";

import HeaderComp from "../../components/HeaderComp.js";
import MatchCardComp from "../../components/MatchCardComp.js";

//utils criadas
import BackHandlerComponent from "../../utils/BackHandlerComponent.js";

export default function Matches() {
  const [matchs, setMatchs] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState("");
  const [team, setTeam] = useState("");

  useFocusEffect(
    useCallback(() => {
      // Função para buscar Partidas da API
      const fetchMatchs = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/matches`);
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
    }, [])
  );

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
      setTeam(teamData);
    } catch (error) {
      console.error("Erro na busca do time:", error);
    }
  };

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
      price={item.price}
    />
  );

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <BackHandlerComponent />
      <FlatList
        overScrollMode="never"
        data={matchs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={<View style={styles.gapBottom} />}
      />


        <TouchableOpacity
          style={styles.createMatch}
          onPress={() => {
            navigation.navigate("CreateMatch");
          }}
        >
          <Ionicons name="add-outline" size={32} color="#FF731D" />
          <Text style={styles.matchText}>Criar uma partida</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.finishMatch}
        // onPress={() => {
        //   navigation.navigate("CreateMatch");
        // }}
        >
          <Ionicons name="add-outline" size={32} color="#FF731D" />
          <Text style={styles.matchText}>Começar a partida</Text>
        </TouchableOpacity>
      <View style={styles.header}>
        <HeaderComp />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#808080",
  },
  createMatch: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#113B8F",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  finishMatch: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#113B8F",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  matchText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF731D",
    marginLeft: 5,
  },
  MCard: {
    flex: 1,
    alignSelf: "center",
  },
  header: {
    width: "100%",
  },
  gapBottom: {
    height: 75,
  }
});
