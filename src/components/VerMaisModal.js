import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiURL from "../utils/API";

const VerMaisModal = ({
  visible,
  onClose,
  id,
  name,
  position,
  description,
}) => {
  const navigation = useNavigation();
  const [teamId, setTeamId] = useState("");
  const [playerId, setPlayerId] = useState(null);

  const fetchTeamId = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");

      if (userId) {
        const response = await fetch(
          `${apiURL}/api/user/team-by-admin/${userId}`
        );

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Erro ao buscar time: ${text}`);
        }

        const teamData = await response.json();
        if (teamData) {
          setTeamId(teamData.id);
        } else {
          Alert.alert("Erro", "Time não encontrado para o usuário logado.");
        }
      }
    } catch (error) {
      console.error("Erro ao buscar time:", error);
      Alert.alert("Erro", "Erro ao buscar time.");
    }
  };

  useEffect(() => {
    if (teamId && playerId) {
      deletePlayer(teamId, playerId);
    }
  }, [teamId, playerId]);

  const deletePlayer = async (teamId, playerId) => {
    try {
      const response = await fetch(`${apiURL}/api/user/deletePlayer/${teamId}/${playerId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao fazer requisição de deletar usuário");
      }

      if (response.status === 200) {
        Alert.alert("Deletado", "Jogador expulso do time!");
        refreshPage();
      }

    } catch (error) {
      console.error("Erro ao deletar o jogador:", error);
      Alert.alert("Erro", "Erro ao deletar o jogador.");
    }
  };

  const btnDelete = async () => {
    setPlayerId(id); // Atualiza o playerId
    await fetchTeamId();
  };

  const refreshPage = useCallback(() => {
    navigation.navigate("Matches");
    navigation.navigate("Team", { key: Math.random().toString() });
  }, [navigation]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitles}>Nome</Text>
          <Text style={styles.modalText}>{name}</Text>
          <Text style={styles.modalTitles}>Posição</Text>
          <Text style={styles.modalText}>{position}</Text>
          <Text style={styles.modalTitles}>Descrição</Text>
          <Text style={styles.modalText}>{description}</Text>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonCancel]}
              onPress={onClose}
            >
              <Text style={styles.modalButtonText}>Fechar detalhes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonConfirm]}
              onPress={btnDelete}
            >
              <Text style={styles.modalButtonText}>Expulsar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#D9D9D9",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: "flex-start",
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
  },
  modalTitles: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 10,
    padding: 20,
    backgroundColor: "#113B8F",
  },
  closeButtonText: {
    color: "#FF731D",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtonCancel: {
    backgroundColor: "#FF731D",
  },
  modalButtonConfirm: {
    backgroundColor: "#113B8F",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default VerMaisModal;
