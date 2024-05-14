import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import Header from "../../components/HeaderComp";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "@rneui/themed";
import { useState, useEffect } from "react";
import EditProfile from "../../components/EditProfileComp";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
  const navigation = useNavigation();

  const [opt, setOpt] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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
      setTeam(teamData);
    } catch (error) {
      console.error("Erro na busca do time:", error);
    }
  };

  const handleShowopt = () => {
    setOpt(!opt);
  };

  function mapPositionToCode(position) {

    const lowerCasePosition = position.toLowerCase();

    switch (lowerCasePosition) {
      case "atacante":
        return "ATA";
      case "goleiro":
        return "GOL";
      case "Zagueiro":
        return "ZAG";
      case "meio de campo":
        return "MC";
      default:
        return "ND";
    }
  }



  return (
    <View style={styles.container}>
      <ScrollView style={styles.infoContainer}>
        <View style={styles.info} id="name">
          <Text style={styles.infoText}>{user.name}</Text>
        </View>

        {team &&
          team.length > 0 && ( // Verifica se team não é null e se tem pelo menos um elemento
            <View style={styles.info} id="team">
              <Text style={styles.infoText}>TIME</Text>
              {team[0].image && ( // Verifica se team[0].image não é undefined
                <Image
                  source={{ uri: team[0].image }}
                  style={styles.teamPic}
                />
              )}
              <Text style={styles.infoText}>{team[0].team_name}</Text>
            </View>
          ) || (
            <View style={styles.info} id="team">
              <Text style={styles.bio}>Não Possui um Time</Text>
            </View>
          )}
        <Text style={styles.bio}>{user.description}</Text>
      </ScrollView>

      <View style={styles.profile}>
        <View style={styles.profile}>
          <Image source={{ uri: `${user.image}}` }} style={styles.profilePic} />
          {user && (
            <Text style={styles.profileText}>{mapPositionToCode(user.position)}</Text>
          )}
        </View>
        <Button
          color="#FF731D"
          icon={
            <MaterialCommunityIcons
              name="progress-pencil"
              size={30}
              color="black"
            />
          }
          containerStyle={styles.profileButton}
          onPress={() => {
            handleShowopt();
            setModalVisible(true);
          }}
        />
      </View>

      <View style={styles.header}>
        <Header></Header>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{ flex: 1, backgroundColor: "rgba(1, 1, 1, 0.75)" }}
          onPress={() => setModalVisible(false)}
        ></TouchableOpacity>
        <EditProfile onClose={() => setModalVisible(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    justifyContent: "flex-end",
    flexDirection: "column-reverse",
    backgroundColor: "#808080",
    gap: 15,
  },
  infoContainer: {
    backgroundColor: "#D9D9D9",
    width: "90%",
    borderRadius: 10,
    marginBottom: 20,
  },
  info: {
    alignItems: "center",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  infoText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  bio: {
    fontSize: 25,
    color: "#808080",
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  profile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  profileText: {
    textAlign: "center",
    textAlignVertical: "center",
    height: 25,
    width: 60,
    fontSize: 20,
    fontWeight: "bold",
    color: "#F2F2F2",
    backgroundColor: "#113B8F",
    borderRadius: 10,
    marginTop: -15,
  },
  profilePic: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  teamPic: {
    height: 200,
    width: 200,
    borderRadius: 100,
    marginVertical: 10,
  },
  profileButton: {
    marginTop: -45,
    marginLeft: 150,
    borderRadius: 50,
  },
  header: {
    width: "100%",
  },

  editProfile: {
    position: "absolute",
  },
});
