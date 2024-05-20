import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
  TextInput,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Button } from '@rneui/themed';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HeaderComp from "../../components/HeaderComp.js";
import MatchCardComp from "../../components/MatchCardComp.js";

//utils criadas
import BackHandlerComponent from "../../utils/BackHandlerComponent.js";

export default function Matches() {

  const navigation = useNavigation();


  const [matchs, setMatchs] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState("");
  const [team, setTeam] = useState("");
  const [hasMatch, setHasMatch] = useState(false);
  const [search, setSearch] = useState(false);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [searchText, setSearchText] = useState('');

  const mostrarBotao = true;

  useFocusEffect(
    useCallback(() => {
      const fetchMatchs = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/matches`);
          if (!response.ok) {
            throw new Error("Erro ao buscar partidas: " + response.statusText);
          }
          const data = await response.json();
          
          // Ordenar partidas conforme o `city` do usuário
          const sortedMatches = data.sort((a, b) => {
            const userCity = user.city ? user.city.toLowerCase() : "";
            const cityA = a.city.toLowerCase();
            const cityB = b.city.toLowerCase();

            if (cityA === userCity && cityB !== userCity) {
              return -1;
            }
            if (cityA !== userCity && cityB === userCity) {
              return 1;
            }
            return 0;
          });

          setMatchs(sortedMatches);
          setFilteredMatches(sortedMatches);
          isCreated();
        } catch (error) {
          console.error(error);
          setError(
            "Erro ao buscar partidas. Verifique sua conexão e tente novamente."
          );
        }
      };

      fetchMatchs();
    }, [user.city])
  );

  useEffect(() => {
    isCreated();
  }, [team, matchs]);

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


  const isCreated = () => {
    if (!team[0] || typeof team[0].id === 'undefined') {
      return false;
    }

    if (!Array.isArray(matchs)) {
      return false;
    }

    const isMatchFound = matchs.some(match => {
      if (typeof match.time_organizador_id === 'undefined') {
        return false;
      }

      return Number(match.time_organizador_id) === Number(team[0].id);
    });
    setHasMatch(isMatchFound);
  };

  const filterMatches = (text) => {
      const filtered = matchs.filter(match => match.city.toLowerCase().includes(text.toLowerCase()));
      setFilteredMatches(filtered);
  };

  const handleKeyPress = (event) => {
      if (event.nativeEvent.key === 'Enter') {
          Keyboard.dismiss();
          filterMatches(searchText);
      }
  };

  const handleSearch = () => {
    filterMatches(searchText);
  };

  // Função para renderizar cada item da lista de usuários
  const renderItem = ({ item }) => (
    <MatchCardComp
      id={item.id}
      city={item.city}
      location={item.location}
      field={item.field}
      paid={item.paid}
      organizer={item.TIME}
      image={item.image}
      price={item.price}
      contact={item.contact}
    />
  );

  return (
    <View style={styles.container}>
      <BackHandlerComponent />
      <FlatList
        overScrollMode="never"
        data={filteredMatches}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={<View style={styles.gapBottom} />}
      />

      {hasMatch ? (
        <TouchableOpacity
          style={styles.finishMatch}
          onPress={() => {
            navigation.navigate("FinishMatch");
          }}
        >
          <Ionicons name="add-outline" size={32} color="#FF731D" />
          <Text style={styles.matchText}>Começar a partida</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.createMatch}
          onPress={() => {
            isCreated();
            navigation.navigate("CreateMatch");
          }}
        >
          <Ionicons name="add-outline" size={32} color="#FF731D" />
          <Text style={styles.matchText}>Criar uma partida</Text>
        </TouchableOpacity>
      )}


      {search && <View style={styles.innerContainer}>
        <Text style={styles.title}>Busque pela cidade</Text>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Pesquisar pela cidade..."
            style={styles.input}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            onKeyPress={handleKeyPress}
          />
          <Button radius={"sm"} type="clear" onPress={handleSearch}>
            
            <Ionicons name="search-sharp" size={30} color="black" />
          </Button>
        </View>
      </View>}
      


      <View style={styles.header}>
        <HeaderComp mostrarBotao={mostrarBotao} toggleSearch={() => setSearch(prevSearch => !prevSearch)}/>
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
  },
  innerContainer: {
      alignItems: "center",
      justifyContent: "center",
      width: "90%",
      backgroundColor: '#D9D9D9',
      gap: 20,
      padding: 20,
      borderRadius: 10,
      margin: 20,
  },
  title: {
      fontSize: 24,
      fontWeight: "bold"
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
});
