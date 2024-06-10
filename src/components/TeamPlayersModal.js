import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";

import apiURL from "../utils/API";
import renderImagePlayers from "../utils/renderImagePlayers";
import mapPositionToCode from "../utils/mapPositionToCode";
import VerMais from "./VerMaisModal";

const TeamPlayersModal = ({ visible, onClose, team }) => {
  const [teamPlayers, setTeamPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const fetchPlayers = async (teamId) => {
    try {
      const response = await fetch(
        `${apiURL}/api/teamPlayers/${teamId}`
      );

      if (!response.ok) {
        throw new Error(`Erro ao buscar jogadores: ${response.statusText}`);
      }

      const data = await response.json();
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

  const handlePlayerSelect = (player) => {
    setSelectedPlayer(player);
  };

  const handleModalClose = () => {
    setSelectedPlayer(null);
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
          <ScrollView style={styles.scrollContainer} overScrollMode="never">
            {teamPlayers.length > 0 ? (
              teamPlayers.map((player) => (
                <View key={player.Jogador_ID} style={styles.playerContainer}>
                  <View style={styles.ImgContainer}>
                    {renderImagePlayers(player.image)}
                    <Text style={styles.playerPos}>{mapPositionToCode(player.position)}</Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => handlePlayerSelect(player)}
                    style={styles.expdContainer}
                  >
                    <View style={styles.infoContainer}>
                      <Text style={styles.playerName}>{player.Jogador}</Text>
                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={styles.playerDesc}
                      >
                        {player.description}
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={36} color="black" />
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.noPlayer}>
                Não Possui jogadores
              </Text>
            )}
          </ScrollView>

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

      {selectedPlayer && (
        <VerMais
          visible={!!selectedPlayer}
          onClose={handleModalClose}
          name={selectedPlayer.Jogador}
          position={selectedPlayer.position}
          description={selectedPlayer.description}
          id={selectedPlayer.Jogador_ID}
        />
      )}
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
    maxHeight: 500,
    backgroundColor: "#D9D9D9",
    gap: 10,
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
    fontSize: 18,
    fontWeight: "bold"
  },
  scrollContainer: {
    width: "100%",
  },
  playerContainer: {
    display: 'flex',
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    padding: 10,
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderBlockColor: '#113B8F',
    backgroundColor: "#C0C0C0",
  },
  infoContainer: {
    width: "50%"
  },
  expdContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  ImgContainer: {
    alignItems: "center",
    gap: -15
  },
  playerName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  playerDesc: {
  },
  playerPos: {
    textAlign: "center",
    height: 20,
    width: 50,
    color: "#F2F2F2",
    backgroundColor: "#113B8F",
    borderRadius: 10,
  },
  noPlayer: {
    textAlign: 'center',
    fontWeight: 'bold',
    width: "100%",
    marginBottom: 10,
  }
});

export default TeamPlayersModal;