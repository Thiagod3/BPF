import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, FlatList, Keyboard, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Button, ButtonGroup } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";


import TeamCardComp from './TeamCardComp';

export default function FinishMatchComp() {
  const navigation = useNavigation();

  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [user, setUser] = useState("");
  const [userTeam, setUserTeam] = useState("");
  const [match, setMatch] = useState();
  const [teamsMatch, setTeamsMatch] = useState();
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  useEffect(() => {
    //Fetch para obter todos os times
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/teams`);
        if (!response.ok) {
          throw new Error("Erro ao buscar times: " + response.statusText);
        }
        const data = await response.json();
        setTeams(data);
        setFilteredTeams(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    if (userTeam && userTeam.length > 0) {
      excludeUserTeam();
    }
  }, [userTeam]);

  const excludeUserTeam = () => {
    const filtered = teams.filter(team => team.id !== userTeam[0].id);
    setFilteredTeams(filtered);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const userId = await AsyncStorage.getItem("userId");

        if (!token || !userId) {
          navigation.navigate("Login");
          return;
        }

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
      setUserTeam(teamData);
    } catch (error) {
      console.error("Erro na busca do time:", error);
    }
  };

  const filterTeams = (text) => {
    const filtered = teams.filter(team => team.name.toLowerCase().includes(text.toLowerCase()));
    setFilteredTeams(filtered);
  };

  const handleKeyPress = (event) => {
    if (event.nativeEvent.key === 'Enter') {
      Keyboard.dismiss();
      filterTeams(searchText);
    }
  };

  const handleSearch = () => {
    filterTeams(searchText);
  };

  async function deletaDados() {
    const matchData = {
      id: userTeam[0].id
    };

    setMatch(matchData)
    console.log(match)

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/matches/delete/${userTeam[0].id}`, {
        method: 'DELETE',
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

  async function incrementMatches() {
    const userData = {
      userTeamId: userTeam[0].id,
      rivalTeamId: selectedTeamId
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/teams/incrementMatches/${userTeam[0].id}/${selectedTeamId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar os dados para a API.');
      }

      console.log('Dados enviados com sucesso para a API.');
    } catch (error) {
      console.error('Erro:', error.message);
    }
  }

  const renderItem = ({ item }) => (
    <TeamCardComp
      id={item.id}
      name={item.name}
      image={item.image}
      numberMatches={item.numberMatches}
      isSelected={item.id === selectedTeamId}
      onSelect={() => setSelectedTeamId(item.id)}
    />
  );

  return (
    <ScrollView overScrollMode="never" style={styles.container} contentContainerStyle={styles.Scrollcontainer}>
      <ScrollView horizontal={true} overScrollMode="never" style={styles.PCard}>
        <FlatList
          data={filteredTeams}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View style={styles.gapBottom} />}
        />
      </ScrollView>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Informe o time adversário</Text>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Busque pelo nome do time..."
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          incrementMatches();
          deletaDados();
          navigation.navigate('Matches');
        }}
      >
        <Ionicons name="football-outline" size={30} color="#FF731D" />
        <Text style={styles.buttonText}>BORA PRO FUT!!</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  Scrollcontainer: {
    flex: 1,
    flexDirection: "column-reverse",
    justifyContent: "flex-end",
    alignItems: "center",

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
  PCard: {
    display: "flex",
    alignSelf: "center",
    paddingTop: 10,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    position: "absolute",
    bottom: 20,
    alignSelf: "",
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
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF731D",
    marginLeft: 5,
  },
  gapBottom: {
    height: 75,
  }
});
