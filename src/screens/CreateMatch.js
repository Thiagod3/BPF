import {View, StyleSheet, TouchableOpacity, Text, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeaderComp from '../components/HeaderComp.js';
import CreateMatchComp from '../components/CreateMatchComp.js'

const CreateMatch = () => {
    
    return (
        
        <View style={styles.container}> 
                <ScrollView>
                    <CreateMatchComp></CreateMatchComp>
                </ScrollView>
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
export default CreateMatch;