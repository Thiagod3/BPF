import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

const PlayerCardComp = () => {

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image 
                    source={require("../../assets/profile-pic.png")}
                    style={styles.profilePic}
                    />
                <Text style={styles.profileText}>ATA</Text>
            </View>
            <Text style={styles.containerText}>Fulano de Tal</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 320,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#D9D9D9',
    },
    containerText:{
        paddingTop: 15,
        fontSize: 24,
    },
    profile: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: -10
    },
    profileText:{
        textAlign: 'center',
        height: 20,
        width: 50,
        color: '#F2F2F2',
        backgroundColor: '#113B8F',
        borderRadius: 10,
    },
    profilePic: {
        height: 150,
        width: 150,
        borderRadius: 100,
    },
})

export default PlayerCardComp;