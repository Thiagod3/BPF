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

const TeamPlayersModal = ({ visible, onClose, team }) => {
  const [teamPlayers, setTeamPlayers] = useState([]);

  const fetchPlayers = async (teamId) => {
    try {
      const response = await fetch(
        `${apiURL}/api/teamPlayers/${teamId}`
      );

      if (!response.ok) {
        throw new Error(`Erro ao buscar jogadores: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      setTeamPlayers(data);
    } catch (error) {
      console.log(
        "\nErro na requisição de verificar usuários do time: " + error
      );
    }
  };

  useEffect(() => {
    if (team && team.length > 0) {
      fetchPlayers(team[0].id);
    }
  }, [team]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {teamPlayers.length > 0 ? (
            teamPlayers.map((player) => (
              <View key={player.Jogador_ID} style={styles.playerContainer}>
                <Text style={styles.playerTitle}>{player.Jogador}</Text>
                <Text style={styles.playerName}>{player.position}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noPlayer}>
              Não Possui jogadores
            </Text>
          )}

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonClose]}
              onPress={onClose}
            >
              <Text style={styles.modalButtonText}>Fechar</Text>
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
  modalPlayers: {
    fontSize: 20,
    marginBottom: 10,
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
  modalButtonClose: {
    backgroundColor: "#113B8F",
  },
  modalButtonText: {
    color: "#FF731D",
    fontSize: 16,
  },
  playerContainer: {
    display: 'flex',
    width: "100%",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    paddingBottom: 5,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBlockColor: '#113B8F'
  },
  playerTitle: {
    fontWeight: "bold",
  },
  playerName: {
    fontSize: 16,
  },
  noPlayer: {
    textAlign: 'center',
    fontWeight: 'bold',
    width: "100%",
    marginBottom: 10,
  }
});

export default TeamPlayersModal;
