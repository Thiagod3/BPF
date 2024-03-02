import {View, StyleSheet, TouchableOpacity, Text, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import HeaderComp from '../../components/HeaderComp.js';
import MatchCardComp from '../../components/MatchCardComp.js';

export default function Matches(){

    const navigation = useNavigation(); 
    
    return (
        <View style={styles.container}> 
            <ScrollView style={styles.MCard}>
                <MatchCardComp></MatchCardComp>
                <MatchCardComp></MatchCardComp>
                <MatchCardComp></MatchCardComp>
            </ScrollView>           
            <TouchableOpacity style={styles.createMatch} onPress={() => {navigation.navigate("CreateMatch")}} >
                <Ionicons name="football-outline" size={26} color="#FF731D" />
                <Text style={styles.createMatchText}>Crie sua partida!</Text>
            </TouchableOpacity>
            <View style={styles.header}>
                <HeaderComp></HeaderComp>
            </View>            
        </View>
    );
}


const styles = StyleSheet.create({
    container: {  
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        height: '100%',
        backgroundColor: '#808080',
    },
    createMatch: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        padding: 10,
        gap: 5,
        borderRadius: 50,
        backgroundColor: '#113B8F',
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,        
      },
    createMatchText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF731D'
    },
    MCard: {
        display: 'flex',
        alignSelf: 'center',
    },
    header: {
        width: '100%'
    },
})