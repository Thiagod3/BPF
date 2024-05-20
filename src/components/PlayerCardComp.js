import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

//utils criadas
import renderImageCards from "../utils/renderImageCards";
import mapPositionToCode from "../utils/mapPositionToCode";

import PlayerAddModal from "./PlayerAddModal";

const PlayerCardComp = ({ id, name, position, image, description }) => {
  const [PlayerAddVisibility, setPlayerAddVisibility] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        {renderImageCards(image)}
        <Text style={styles.profileText}>{mapPositionToCode(position)}</Text>
      </View>
      <Text style={styles.containerText}>{name}</Text>
      <TouchableOpacity
        onPress={() => setPlayerAddVisibility(true)}
        style={styles.seeMore}
      >
        <Text style={styles.seeMoreText}>Ver mais</Text>
        <Ionicons name="chevron-forward" size={36} color="black" />
      </TouchableOpacity>

      <PlayerAddModal
        visible={PlayerAddVisibility}
        onClose={() => setPlayerAddVisibility(false)}
        name={name}
        position={position}
        description={description}
        id={id}

      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 320,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
  },
  containerText: {
    paddingTop: 15,
    fontSize: 24,
  },
  profile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: -10,
  },
  profileText: {
    textAlign: "center",
    height: 20,
    width: 50,
    color: "#F2F2F2",
    backgroundColor: "#113B8F",
    borderRadius: 10,
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

export default PlayerCardComp;
