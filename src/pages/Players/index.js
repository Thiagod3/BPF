import {View, StyleSheet} from 'react-native';
import HeaderComp from '../../components/HeaderComp.js';
import PlayerCardComp from '../../components/PlayerCardComp';
import { ScrollView } from 'react-native';

export default function Players(){
    
    return (
        <View style={styles.container}>
            <ScrollView style={styles.PCard}>
                <PlayerCardComp></PlayerCardComp>
                <PlayerCardComp></PlayerCardComp>
                <PlayerCardComp></PlayerCardComp>
                <PlayerCardComp></PlayerCardComp>
                <PlayerCardComp></PlayerCardComp>
            </ScrollView>
            <View>
                <HeaderComp></HeaderComp>
            </View>            
        </View>
    );
}


const styles = StyleSheet.create({
    container: {  
        display: 'flex',
        flexDirection: 'column-reverse',
        justifyContent: 'flex-end',
        width: '100%',
        height: '100%',
        backgroundColor: '#808080',
    },
    PCard: {
        display: 'flex',
        alignSelf: 'center',
        paddingTop: 10,
    },
})