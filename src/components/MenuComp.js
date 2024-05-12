import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const MenuComp = () => {

    const navigation = useNavigation(); 

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => {navigation.replace("Matches")}}>
                <MaterialCommunityIcons name="flag-variant" size={40} color="#FF731D" />
                <Text style={styles.buttonText}>Partidas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {navigation.replace("Players")}}>
                <MaterialCommunityIcons name="run" size={40} color="#FF731D" />
                <Text style={styles.buttonText}>Jogadores</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {navigation.replace("Profile")}}>
                <Ionicons name="person-sharp" size={40} color="#FF731D" />
                <Text style={styles.buttonText}>Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} >
            <MaterialCommunityIcons name="account-group" size={40} color="#FF731D" />
                <Text style={styles.buttonText}>Time</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Ionicons name="chatbubble-ellipses-sharp" size={40} color="#FF731D" />
                <Text style={styles.buttonText}>Conversas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <MaterialCommunityIcons name="trophy-award" size={40} color="#FF731D" />
                <Text style={styles.buttonText}>Rank geral</Text>
            </TouchableOpacity>            
        </View>
    );
}

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