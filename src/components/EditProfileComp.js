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
import { useCallback } from "react";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import api from "../../config/api";
import apiURL from "../utils/API";

const EditProfile = ({ onClose, onEditPosition }) => {
  const navigation = useNavigation();

  const getCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão negada',
          'Desculpe, nós precisamos de acesso à câmera.'
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 0.5,
      });

      if (!result.canceled) {
        const resizedUri = await resizeImage(result.assets[0].uri);
        const base64 = await convertToBase64(resizedUri);
        if (base64) {
          uploadImage(base64);
        } else {
          Alert.alert('Erro', 'Falha em converter a imagem para Base64.');
        }
      }
    } catch (error) {
      console.error('Error using camera:', error);
    }
  }

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão negada',
          'Desculpe, nós precisamos de acesso a galeria.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 0.5, // Adjust quality to reduce image size
        base64: false, // Do not request base64 data directly
      });

      if (!result.canceled) {
        const resizedUri = await resizeImage(result.assets[0].uri);
        const base64 = await convertToBase64(resizedUri);
        if (base64) {
          uploadImage(base64);
        } else {
          Alert.alert('Error', 'Falha em converter a imagem para Base64.');
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const resizeImage = async (uri) => {
    try {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 800, height: 800 } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );
      return manipulatedImage.uri;
    } catch (error) {
      console.error('Error resizing image:', error);
      return uri; // Return original URI if resizing fails
    }
  };

  const convertToBase64 = async (uri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return base64;
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return null;
    }
  };

  const uploadImage = async (base64Image) => {
    try {
      const apiUrl = `${apiURL}/api/user/uploadImage`;
      const userId = await AsyncStorage.getItem('userId');
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
        const errorText = await response.text();
        throw new Error(`Server error: ${errorText}`);
      }

      Alert.alert('Success', 'Imagem atualizada com sucesso!');
      refreshPage();

    } catch (error) {
      Alert.alert('Não suportado', `Falha no envio da imagem, por favor escolha uma imagem menor`);
    }
  };



  const refreshPage = useCallback(() => {
    navigation.navigate('Matches')
    navigation.navigate('Profile', { key: Math.random().toString() });
  }, [navigation]);

  return (
    <TouchableOpacity activeOpacity={1} style={styles.teste} onPress={onClose}>
      <ButtonGroup
        buttons={[
          <View style={styles.buttonContainer}>
            <Pressable style={styles.galleryButton} onPress={getCamera}>
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
            <Pressable onPress={onEditPosition} style={styles.galleryButton}>
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
