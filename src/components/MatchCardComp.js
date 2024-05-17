import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Modal from "./layout/Modal";

//Utils Criadas
import renderImage from "../utils/renderImage";

const MatchCardComp = ({
  id,
  organizer,
  image,
  location,
  city,
  contact,
  paid,
  field,
  price,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const matchId = id;

  const [match, setMatch] = useState();

  async function showMatch() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/matches/${matchId}`
      );
      if (!response.ok) {
        throw new Error(
          "Erro ao buscar partida especifica: " + response.statusText
        );
      }
      const data = await response.json();
      //console.log("Partida recebida:", data); // Log para verificar os dados recebidos
      setMatch(data);

      showMatchData();
    } catch (error) {
      console.error(error);
      setError(
        "Erro ao buscar a partida especifica. Verifique sua conexão e tente novamente."
      );
    }
  }

  async function showMatchData() {
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.team}>
        {(image && renderImage(image)) || (
          <Image source={require("../../assets/BoraProFutOutline.png")} />
        )}
        <Text style={styles.teamName}>Jogo de {organizer}</Text>
      </View>

      <View style={styles.address}>
        <Ionicons name="location-outline" size={30} color="black" />
        <Text style={styles.addressText}>{location + " - " + city}</Text>
      </View>
      <TouchableOpacity onPress={showMatch} style={styles.seeMore}>
        <Text style={styles.seeMoreText}>Ver mais</Text>
        <Ionicons name="chevron-forward" size={36} color="black" />
      </TouchableOpacity>

      {/* Modal para mostrar detalhes da partida */}
      <Modal
        visible={modalVisible} // Passando a visibilidade do modal como propriedade
        onClose={() => setModalVisible(false)} // Função para fechar o modal
        id={id}
        location={location}
        field={field}
        paid={paid}
        organizer={organizer}
        price={price}
        contact={contact}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 320,
    padding: 50,
    margin: 10,
    gap: 15,
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
  },
  teamName: {
    textAlign:"center",
    paddingTop: 15,
    fontWeight: "bold",
    fontSize: 26,
  },
  team: {
    alignItems: "center",
    justifyContent: "center",
    gap: -10,
  },
  teamPic: {
    height: 120,
    width: 120,
    borderRadius: 100,
  },
  infoContainer: {
    width: "100%",
    alignItems: "flex-start",
    gap: 10,
  },
  info: {
    flexDirection: "row",
  },
  infoText: {
    fontSize: 16,
  },
  address: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 10,
  },
  addressText: {
    fontSize: 20,
  },
  seeMore: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    fontSize: 23,
  },
  seeMoreText: {
    fontSize: 23,
  },
});

export default MatchCardComp;
