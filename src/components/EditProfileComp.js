import { ButtonGroup } from "@rneui/themed";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfile = ({ onClose }) => {


  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work.');
        return;
      }
      
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true // Request base64 data
      });

      if (!result.canceled) {
        const base64 = await convertToBase64(result.assets[0].uri);
        uploadImage(base64);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const convertToBase64 = async (uri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
      return base64;
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return null;
    }
  };

  const uploadImage = async (base64Image) => {
    try {
      // URL da sua API
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/user/uploadImage`;

      const userId = await AsyncStorage.getItem("userId");

      // Dados que você deseja enviar para o servidor (neste caso, apenas a imagem)
      const data = {
        image: base64Image,
        userId: userId,
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erro na requisição de atualizar imagem');
      }

      // Exibe uma mensagem de sucesso se a imagem for enviada com sucesso
      Alert.alert('Sucesso', 'Imagem atualizada com sucesso');
    } catch (error) {
      Alert.alert('Erro', 'Falha no envio da imagem');
    }
};

  return (
    <TouchableOpacity activeOpacity={1} style={styles.teste} onPress={onClose}>
      <ButtonGroup
        buttons={[
          <View style={styles.buttonContainer}>
            <Pressable style={styles.galleryButton}>
              <FontAwesome name="camera" size={32} color="#FF731D" />
              <Text style={styles.buttonText}>Câmera</Text>
            </Pressable>
          </View>,
          <View style={styles.buttonContainer}>
            <Pressable onPress={pickImage} style={styles.galleryButton}>
              <FontAwesome name="photo" size={32} color="#FF731D" />
              <Text style={styles.buttonText}>Galeria</Text>
            </Pressable>
          </View>,
          <View style={styles.buttonContainer}>
            <Pressable style={styles.galleryButton}>
              <FontAwesome name="soccer-ball-o" size={32} color="#FF731D" />
              <Text style={styles.buttonText}>Trocar posição</Text>
            </Pressable>
          </View>,
        ]}
        containerStyle={styles.buttons}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  teste: {
    flexDirection: "column-reverse",
    height: "100%",
    width: "100%",
    alignItems: "center",
    position: "absolute",
  },
  buttons: {
    height: "15%",
    width: "100%",
    marginBottom: -3,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#113B8F",
    borderColor: "transparent",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FF731D",
    marginTop: 5,
  },
  galleryButton: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  }
});

export default EditProfile;
