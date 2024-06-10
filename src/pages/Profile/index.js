import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import Header from "../../components/HeaderComp";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import EditProfile from "../../components/EditProfileComp";
import EditPositionComp from "../../components/EditPositionComp";
import EditCityComp from "../../components/EditCityComp";
import EditBioComp from "../../components/EditBioComp";
import mapPositionToCode from "../../utils/mapPositionToCode";
import renderImage from "../../utils/renderImage";
import apiURL from "../../utils/API";

export default function Profile() {
  const navigation = useNavigation();

  const [opt, setOpt] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [positionModalVisible, setPositionModalVisible] = useState(false);
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [bioModalVisible, setBioModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const [user, setUser] = useState("");
  const [team, setTeam] = useState("");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
  const [inputHeight, setInputHeight] = useState(0);

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

  async function updateBio() {
    console.log('Iniciando atualização da bio...');
    const userData = {
      id: user.id,
      newBio: bio
    }

    try {
      const response = await fetch(`${apiURL}/api/user/update/bio/${user.id}/${bio}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar os dados para a API.');
      }

      console.log('Dados enviados com sucesso para a API.');
      refreshPage();
    } catch (error) {
      console.error('Erro ao atualizar bio:', error.message);
    }
  }

  const handleShowOpt = () => {
    setOpt(!opt);
  };

  const handleUpdateBio = (newBio) => {
    setBio(newBio);
  };

  useEffect(() => {
    if (bio) {
      updateBio(user.id, bio);
      refreshPage();
    }
  }, [bio, user.id]);

  async function updateCity() {
    const userData = {
      id: user.id,
      newcity: city
    }

    try {
      const response = await fetch(`${apiURL}/api/user/update/city/${user.id}/${city}`, {
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
      console.error('Erro ao atualizar cidade:', error.message);
    }
  }

  const handleUpdateCity = (newCity) => {
    setCity(newCity);
  };

  useEffect(() => {
    if (city) {
      updateCity(user.id, city);
      refreshPage();
    }
  }, [city, user.id]);

  const refreshPage = useCallback(() => {
    navigation.navigate('Matches')
    navigation.navigate('Profile', { key: Math.random().toString() });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.infoContainer} overScrollMode="never">
        <View style={styles.info} id="name">
          <Text style={styles.infoText}>{user.name}</Text>
        </View>

        {(team && team.length > 0 && (
          <View style={styles.info} id="team">
            <Text style={styles.infoText}>TIME</Text>
            {(team[0].image && renderImage(team[0].image)) || (
              <Image source={require("../../../assets/BoraProFutOutline.png")} />
            )}
            <Text style={styles.infoText}>{team[0].name}</Text>
          </View>
        )) || (
            <View style={styles.info} id="team">
              <Text style={styles.bio}>Não Possui um Time</Text>
            </View>
          )}


        <View style={styles.infoCity} id="name">
          <Ionicons name="location-outline" size={30} color="black" />
          <Text style={styles.infoText}>{user.city}</Text>
          <Button
            color="#FF731D"
            icon={
              <MaterialCommunityIcons
                name="progress-pencil"
                size={30}
                color="black"
              />
            }
            containerStyle={styles.cityButton}
            onPress={() => {
              setCityModalVisible(true);
            }}
          />
        </View>

        <View style={styles.infoBio}>
          <Pressable style={styles.pressable} onPress={() => {
            setBioModalVisible(true);
          }}>
              <Text style={styles.bio}>{user.description}</Text>
              <Text style={styles.inputText}>Pressione para editar</Text>
          </Pressable >
        </View>


      </ScrollView>

      <View style={styles.profile}>
        <View style={styles.profile}>
          {(user.image && renderImage(user.image)) || (
            <Image source={require("../../../assets/profile-pic.png")} />
          )}
          {user && (
            <Text style={styles.profileText}>
              {mapPositionToCode(user.position)}
            </Text>
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
            handleShowOpt();
            setModalVisible(true);
          }}
        />
      </View>


      <View style={styles.header}>
        <Header />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{ flex: 1, backgroundColor: "rgba(1, 1, 1, 0.45)" }}
          onPress={() => setModalVisible(false)}
        ></TouchableOpacity>
        <EditProfile
          onClose={() => setModalVisible(false)}
          onEditPosition={() => {
            setModalVisible(false);
            setPositionModalVisible(true);
          }}
        />
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={positionModalVisible}
        onRequestClose={() => {
          setPositionModalVisible(false);
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{ flex: 1, backgroundColor: "rgba(1, 1, 1, 0.45)" }}
          onPress={() => setPositionModalVisible(false)}
        ></TouchableOpacity>
        <EditPositionComp onClose={() => setPositionModalVisible(false)} />
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={cityModalVisible}
        onRequestClose={() => {
          setCityModalVisible(false);
        }}
        containerStyle={styles.modal}
      >
        <EditCityComp
          onUpdateCity={handleUpdateCity}
          onClose={() => setCityModalVisible(false)}
        />
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={bioModalVisible}
        onRequestClose={() => {
          setBioModalVisible(false);
        }}
        containerStyle={styles.modal}
      >
        <EditBioComp
          onUpdateBio={handleUpdateBio}
          onClose={() => setBioModalVisible(false)}
        />
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
    flexDirection: "column-reverse",
    backgroundColor: "#808080",
    gap: 15,
  },
  infoContainer: {
    backgroundColor: "#D9D9D9",
    width: "90%",
    height: "auto",
    borderRadius: 10,
    marginBottom: 20,
  },
  info: {
    alignItems: "center",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  infoBio: {
    alignItems: "center",
    paddingVertical: 10,
  },
  infoCity: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  infoText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  bio: {
    fontSize: 25,
    color: "#333333",
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
  cityButton: {
    borderRadius: 50,
  },
  header: {
    width: "100%",
  },
  alignSelf: "center",
  button: {
    alignSelf: "center",
    width: "60%",
    borderRadius: 20,
    marginTop: 40,
    marginBottom: 10,
  },
  pressable: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  inputText: {
    alignSelf: "center",
    color: "#808080",
  },
  cityContainer: {
    flex: 1,
    backgroundColor: "rgba(1, 1, 1, 0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    alignItems: "center",
    justifyContent: "center",
  }
});
