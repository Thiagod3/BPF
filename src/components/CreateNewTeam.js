import {
  View,
  StyleSheet,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { Button, Input, FAB } from "@rneui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import EditTeamComp from "./EditTeamComp";

export default function CreateNewTeam() {
  const [opt, setOpt] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleShowopt = () => {
    setOpt(!opt);
  };

  return (
    <View style={styles.container}>
      <View style={styles.teamLogoContainer}>
        <Image
          style={styles.teamLogo}
          source={require("../../assets/BoraProFutOutline.png")}
        />
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
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputName}>
          <Input
            rightIcon={
              <MaterialCommunityIcons
                name="lead-pencil"
                size={30}
                color="black"
              />
            }
            placeholder="Nome"
            textAlign="center"
            inputContainerStyle={{ borderBottomWidth: 0 }}
          />
        </View>
        <View style={styles.inputBio}>
          <Input
            rightIcon={
              <MaterialCommunityIcons
                name="lead-pencil"
                size={30}
                color="black"
              />
            }
            placeholder="Bio..."
            inputContainerStyle={{ borderBottomWidth: 0, paddingVertical: 20 }}
            rightIconContainerStyle={{ marginBottom: -80 }}
          />
        </View>
      </View>

      <View style={styles.createButton}>
        <FAB
          title="criar meu time"
          color="#113B8F"
          titleStyle={{ color: "#FF731D", fontWeight: "bold", fontSize: 20 }}
          upperCase
          icon={
            <Ionicons name="add-circle-outline" size={30} color="#FF731D" />
          }
          onPress={() => {
            console.log("Levar à team e mudar pra created");
          }}
        />
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
        <EditTeamComp onClose={() => setModalVisible(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 50,
    gap: 20,
    borderRadius: 10,
  },
  teamLogoContainer: {
    gap: -50,
  },
  teamPicButton: {
    marginLeft: 150,
    borderRadius: 50,
  },
  formContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9D9D9",
    width: "85%",
    gap: 10,
    borderRadius: 10,
  },
  teamLogo: {
    height: 200,
    width: 200,
  },
  inputName: {
    width: "100%",
    height: 50,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
  },
  inputBio: {
    width: "100%",
    borderBottomEndRadius: 2,
    borderStyle: "solid",
    borderColor: "black",
  },
  createButton: {
    marginTop: 50,
  },
});
