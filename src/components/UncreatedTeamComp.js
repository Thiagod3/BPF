import {View,StyleSheet, Text, ScrollView} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { FAB } from "@rneui/themed";
import { Ionicons } from '@expo/vector-icons';



export default function CreateTeamComp() {

    const navigation = useNavigation(); 

    return(
            <View style={styles.container}>
                <Text style={styles.CTeamTitle}>Parece que você ainda não faz parte de um time</Text>

                <Text style={styles.CTeamText}>
                    Que tal criar um time agora mesmo e chamar todos os seus amigos pro fut?
                </Text>

                <FAB
                    title="criar meu time"
                    color="#113B8F"
                    titleStyle={{ color: "#FF731D", fontWeight: "bold", fontSize: 20 }}
                    upperCase
                    icon={<Ionicons name="add-circle-outline" size={30} color="#FF731D" />}
                    onPress={() => {navigation.replace("CreateTeam")}}
                />
            </View>
    );

}

const styles = StyleSheet.create({
    container: {  
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#D9D9D9',
        gap: 70,
        padding: 20,        
        borderRadius: 10,
    },
    CTeamTitle: {
        textAlign: 'center',
        fontSize: 26,
        fontWeight: 'bold',
    },
    CTeamText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
    },
})