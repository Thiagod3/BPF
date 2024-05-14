import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import HeaderComp from "../../components/HeaderComp.js";
import PlayerCardComp from "../../components/PlayerCardComp";
import { useState, useEffect, useCallback } from "react";

import { useFocusEffect } from "@react-navigation/native";

export default function Players() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useFocusEffect( useCallback(() => {
    // Função para buscar usuários da API
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users`);
        if (!response.ok) {
          throw new Error("Erro ao buscar usuários: " + response.statusText);
        }
        const data = await response.json();
       // console.log("Dados recebidos:", data); // Log para verificar os dados recebidos
        setUsers(data);
      } catch (error) {
        console.error(error);
        setError(
          "Erro ao buscar usuários. Verifique sua conexão e tente novamente."
        );
      }
    };

    // Chamando a função para buscar usuários
    fetchUsers();
  }, []));

  // Função para renderizar cada item da lista de usuários
  const renderItem = ({ item }) => (
    <PlayerCardComp
      name={item.name}
      position={item.position}
      image={item.image}
    /> // Usando o componente PlayerCard
  );

  

  return (
    <View style={styles.container}>
        {/* Adicionei Horizontal true para tirar um erro de VirtualList */}
      <ScrollView horizontal={true} style={styles.PCard}>
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
      <View>
        <HeaderComp></HeaderComp>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
    backgroundColor: "#808080",
  },
  PCard: {
    display: "flex",
    alignSelf: "center",
    paddingTop: 10,
    marginBottom: 10,
  },
});
