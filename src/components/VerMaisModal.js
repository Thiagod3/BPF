import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../config/api";
import apiURL from "../utils/API";

const VerMaisModal = ({
  visible,
  onClose,
  id,
  name,
  position,
  description,
}) => {
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
      addPlayerToTeam();
    }
  }, [teamId]);

  const addPlayerToTeam = async () => {
    try {
      const response = await fetch(
        `${apiURL}/api/user/add-player`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: playerId,
            team_id: teamId,
          }),
        }
      );

      if (response.ok) {
        Alert.alert("Sucesso", "Jogador inserido com sucesso.");
      } else {
        const text = await response.text();
        throw new Error(`Erro ao inserir jogador: ${text}`);
      }
    } catch (error) {
      console.error("Erro ao inserir jogador:", error);
      Alert.alert("Erro", "Erro ao inserir jogador.");
    }
  };

  const deletePlayer = async () => {
    console.log("expulseeeeiiii")
  };

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
              onPress={deletePlayer}
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
