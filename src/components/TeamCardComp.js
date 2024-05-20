import { View, Text, TouchableOpacity, StyleSheet, } from "react-native";
import { CheckBox } from '@rneui/themed';

//utils criadas
import renderImageCards from "../utils/renderImageCards";
import mapPositionToCode from "../utils/mapPositionToCode";
import { useState } from "react";

const TeamCardComp = ({ id, name, image, numberMatches, isSelected, onSelect }) => {
    
const [check1, setCheck1] = useState(false);

  return (
    
    <View style={styles.container}>
      <View style={styles.profile}>
        {renderImageCards(image)}
      </View>
      <Text style={styles.containerText}>{name}</Text>
      
      <CheckBox
            containerStyle={styles.boxes}       
            checked={isSelected}
            onPress={onSelect}
            checkedIcon="dot-circle-o"
            size={20}
            uncheckedIcon="circle-o"
            checkedColor="#FF731D"
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
  boxes: {
    backgroundColor: "#D9D9D9",
  },
});

export default TeamCardComp;
