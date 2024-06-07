import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import HeaderComp from "../../components/HeaderComp.js";
import UncreatedTeamComp from "../../components/UncreatedTeamComp.js";
import CreatedTeamComp from "../../components/CreatedTeamComp.js";
import api from "../../../config/api.js";
import apiURL from "../../utils/API.js";

export default function CreateTeam() {
  const navigation = useNavigation();

  const [user, setUser] = useState("");
  const [team, setTeam] = useState("");

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
          `${apiURL}/user/profile/${userId}`,
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
        `${apiURL}/api/user/team/${userId}`
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

  return (
    <View style={styles.container}>
      {team && team.length > 0 ? (
        <View style={styles.CTeam}>
          <CreatedTeamComp
            team={team}
          />
        </View>
      ) : (
        <View style={styles.CTeam}>
          <UncreatedTeamComp />
        </View>
      )}

      {/* Se tiver time, mostrar: */}

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
  CTeam: {
    height: "85%",
    margin: 15,
  },
  header: {
    width: "100%",
  },
});
