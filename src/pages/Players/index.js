import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Text,
  TextInput,
  Keyboard,
  Alert
} from "react-native";
import { Button } from "@rneui/themed";
import HeaderComp from "../../components/HeaderComp.js";
import PlayerCardComp from "../../components/PlayerCardComp";
import { Ionicons } from "@expo/vector-icons";
import { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiURL from "../../utils/API.js";

export default function Players() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showUsersWithoutTeam, setShowUsersWithoutTeam] = useState(true);

  const mostrarBotao = true;
  useFocusEffect(
    useCallback(() => {
      // Função para buscar usuários da API
      const fetchUsers = async () => {
        const endpoint = showUsersWithoutTeam
          ? `${apiURL}/api/users`
          : `${apiURL}/api/usersWithoutTeam`;
        try {
          const response = await fetch(endpoint);
          if (!response.ok) {
            throw new Error("Erro ao buscar usuários: " + response.statusText);
          }
          const data = await response.json();
          setUsers(data);
          setFilteredUsers(data);
          console.log(users[0])
        } catch (error) {
          console.error(error);
          setError(
            "Erro ao buscar usuários. Verifique sua conexão e tente novamente."
          );
        }
      };
      fetchUsers();
    }, [showUsersWithoutTeam])
  );

  const filterUsers = (text) => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleKeyPress = (event) => {
    if (event.nativeEvent.key === "Enter") {
      Keyboard.dismiss();
      filterUsers(searchText);
    }
  };

  const handleSearch = () => {
    filterUsers(searchText);
  };

  const handleToggle = () => {
    setShowUsersWithoutTeam((prevShowUsersWithoutTeam) => !prevShowUsersWithoutTeam);
  };

  // Função para renderizar cada item da lista de usuários
  const renderItem = ({ item }) => (
    <PlayerCardComp
      id={item.id}
      name={item.name}
      position={item.position}
      image={item.image}
      description={item.description}
    /> // Usando o componente PlayerCard
  );

  // Modifiquei a função keyExtractor
  const keyExtractor = (item, index) => item.id ? item.id.toString() : index.toString();

  return (
    <View style={styles.container}>
      {/* Adicionei Horizontal true para tirar um erro de VirtualList */}
      <ScrollView horizontal={true} overScrollMode="never" style={styles.PCard}>
        <FlatList
          overScrollMode="never"
          data={filteredUsers}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </ScrollView>

      {search && (
        <View style={styles.innerContainer}>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Pesquisar pelo nome..."
              style={styles.input}
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
              onKeyPress={handleKeyPress}
            />
            <Button radius={"sm"} type="clear" onPress={handleSearch}>
              <Ionicons name="search-sharp" size={30} color="black" />
            </Button>
          </View>
        </View>
      )}



      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.buttonContainer}>
        <Button title={showUsersWithoutTeam ? "Mostrar usuários sem time" : "Mostrar Todos os Usuários"} onPress={handleToggle} color={"#113B8F"} />
      </View>

      <View>
        <HeaderComp
          mostrarBotao={mostrarBotao}
          toggleSearch={() => setSearch((prevSearch) => !prevSearch)}
        />
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
  innerContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    backgroundColor: "#D9D9D9",
    gap: 20,
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
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
  buttonContainer: {
    alignItems: "center",
    marginTop: 15,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
});
