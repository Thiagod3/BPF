import {
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Button } from "@rneui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import EditTeamComp from "./EditTeamComp";
import EditTeamBioComp from "./EditTeamBioComp";
import { useNavigation } from "@react-navigation/native";

import TeamPlayersModal from "./TeamPlayersModal";

import renderImage from "../utils/renderImage";

import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreateTeamComp({ team, userId }) {
  const navigation = useNavigation();

  const [opt, setOpt] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [PlayerAddVisibility, setPlayerAddVisibility] = useState(false);
  const [bioModalVisible, setBioModalVisible] = useState(false);
  const [bio, setBio] = useState("");

  const handleShowopt = () => {
    setOpt(!opt);
  };

  const handleUpdateBio = (newBio) => {
    setBio(newBio);
  };

  useEffect(() => {
    if (bio) {
      updateBio(team[0].id, bio);
      refreshPage();
    }
  }, [bio, team[0].id]);

  async function updateBio() {
    try {
      const response = await fetch(`${apiURL}/api/team/update/bio/${team[0].id}/${bio}`, {
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

  const refreshPage = useCallback(() => {
    navigation.navigate('Matches')
    navigation.navigate('Team', { key: Math.random().toString() });
  }, [navigation]);
  

  return (
    <View style={styles.container}>
      <View style={styles.teamPic}>
        {team[0].teamImage && (
            renderImage(team[0].teamImage)
        ) || (
            <Image source={require("../../assets/BoraProFutOutline.png")} />
        )}
        {/* Dois campos de admin para o retorno de cada requisição */}
        {team[0].Admin == team[0].Jogador_ID || team[0].user_admin_id == userId  && (
          <Button
          color="#FF731D"
          icon={
            <MaterialCommunityIcons
              name="progress-pencil"
              size={30}
              color="black"
            />
          }
          containerStyle={styles.teamPicButton}
          onPress={() => {
            handleShowopt();
            setModalVisible(true);
          }}
        />
        )}
        
      </View>

      <View style={styles.InnerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.teamTitle}>{team[0].TEAM}</Text>
        </View>
        <View style={styles.bioContainer}>
          <Pressable style={styles.pressable} onPress={() => {
            setBioModalVisible(true);
          }}>
              <Text style={styles.bioText}>{team[0].description}</Text>
              <Text style={styles.inputText}>Pressione para editar</Text>
          </Pressable >
        </View>
      </View>

      <Button
        title="membros"
        color="#113B8F"
        uppercase
        icon={<Ionicons name="eye-outline" size={30} color="#FF731D" />}
        containerStyle={styles.memberButton}
        titleStyle={styles.memberButtonTitle}
        onPress={() => setPlayerAddVisibility(true)}
      />

      <TeamPlayersModal team={team} userId={userId}  visible={PlayerAddVisibility} onClose={() => setPlayerAddVisibility(false)} />

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
        <EditTeamComp onClose={() => setModalVisible(false)} team={team} />
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
        <EditTeamBioComp
          onUpdateBio={handleUpdateBio}
          onClose={() => setBioModalVisible(false)}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "70%",
    width: "100%",
    gap: 20,
  },
  teamPic: {
    flexDirection: "column",
    alignItems: "center",
    gap: -50,
  },
  teamPicButton: {
    marginLeft: 150,
    borderRadius: 50,
  },
  InnerContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    backgroundColor: "#D9D9D9",
    margin: 10,
    borderRadius: 10,
  },
  titleContainer: {
    width: "100%",
    borderStyle: "solid",
    borderBottomWidth: 2,
    padding: 10,
  },
  teamTitle: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  bioContainer: {
    width: "100%",
    padding: 20,
    paddingBottom: 50,
  },
  pressable: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 20,
  },
  bioText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "400",
  },
  infoText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  memberButton: {
    borderRadius: 10,
  },
  memberButtonTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF731D",
    padding: 10,
  },
});
