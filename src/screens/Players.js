import {View, StyleSheet} from 'react-native';
import HeaderComp from '../components/HeaderComp.js';
import PlayerCardComp from '../components/PlayerCardComp';

const Players = () => {
    
    return (
        <View style={styles.container}>
            <View style={styles.PCard}>
                <PlayerCardComp></PlayerCardComp>
            </View>
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
export default Players;