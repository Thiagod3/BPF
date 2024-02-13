import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MatchCardComp = () => {

    return (
        <View style={styles.container}>
            <View style={styles.team}>
                <Image 
                    source={require("../../assets/profile-pic.png")}
                    style={styles.teamPic}
                    />
                    <Text style={styles.teamName}>Gigante da Colina</Text>
            </View>
            
            <View style={styles.infoContainer}>
                <View style={styles.info}>
                    <Text style={styles.infoText}>Campo: </Text>
                    <Text style={styles.infoText}>Society</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoText}>Valor: </Text>
                    <Text style={styles.infoText}>Grátis</Text>
                </View>
            </View>

            <View style={styles.address}>
                <Ionicons name="location-outline" size={30} color="black" />
                <Text style={styles.addressText}>Rua dos bobos, 0</Text>
                <TouchableOpacity>
                    <Ionicons name="chevron-forward" size={36} color="black" />
                </TouchableOpacity>                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 320,
        padding: 50,
        margin: 10,
        gap: 15,
        borderRadius: 10,
        backgroundColor: '#D9D9D9',
    },
    teamName:{
        paddingTop: 15,
        fontWeight: 'bold',
        fontSize: 26,
    },
    team: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: -10
    },
    teamPic: {
        height: 120,
        width: 120,
        borderRadius: 100,
    },
    infoContainer: {
        width: '100%',
        alignItems: 'flex-start',
        gap: 10
    },
    info: {
        flexDirection: 'row',
    },
    infoText: {
        fontSize: 16,
    },
    address: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap: 10
    },
    addressText: {
        fontSize: 20,
    },
})

export default MatchCardComp;