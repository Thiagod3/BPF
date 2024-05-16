import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

const MenuComp = ({handleMenu}) => {

    const navigation = useNavigation();
    
    const handlePress = (route) => {
        navigation.navigate(route);
        handleMenu();
    }

    const handleLogOut = async() => {
        console.log("entrou")
        Alert.alert('Sair', 'Você deseja deslogar?', [
            {
            text: 'Cancelar',
            onPress: () => null,
            style: 'cancel',
            },
            {
            text: 'Sim',
            onPress: async () => {
                await AsyncStorage.removeItem('token');
                await AsyncStorage.removeItem('userId');
                navigation.navigate('Login');
            },
            },
        ]);

    }

    

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => handlePress("Matches")}>
                <MaterialCommunityIcons name="flag-variant" size={40} color="#FF731D" />
                <Text style={styles.buttonText}>Partidas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handlePress("Players")}>
                <MaterialCommunityIcons name="run" size={40} color="#FF731D" />
                <Text style={styles.buttonText}>Jogadores</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handlePress("Profile")}>
                <Ionicons name="person-sharp" size={40} color="#FF731D" />
                <Text style={styles.buttonText}>Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handlePress("Team")}>
                <MaterialCommunityIcons name="account-group" size={40} color="#FF731D" />
                <Text style={styles.buttonText}>Time</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handlePress("Rank")}>
                <MaterialCommunityIcons name="trophy-award" size={40} color="#FF731D" />
                <Text style={styles.buttonText}>Rank geral</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogOut}>
            <MaterialCommunityIcons name="logout" size={40} color="#FF731D" />
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
            </View>
)};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        alignItems: 'flex-end',
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: 244,
        height: 50,
        backgroundColor: '#113B8F',
        borderWidth: 3,
        borderColor: '#FF731D',
        paddingLeft: 10,
        gap: 15,
    },
    buttonText: {
        color: '#FF731D',
        fontSize: 28
    }
})

export default MenuComp;