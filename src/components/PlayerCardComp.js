import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

//utils criadas
import renderImage from "../utils/renderImage";
import mapPositionToCode from "../utils/mapPositionToCode";

const PlayerCardComp = ({ name, position, image }) => {

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        {renderImage(image)}
        <Text style={styles.profileText}>{mapPositionToCode(position)}</Text>
      </View>
      <Text style={styles.containerText}>{name}</Text>
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
});

export default PlayerCardComp;
