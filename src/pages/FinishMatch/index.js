import { Text, View, StyleSheet } from "react-native";

import FinishMatchComp from "../../components/FinishMatchComp";
import HeaderComp from "../../components/HeaderComp";


export default function FinishMatch() {

    return(
        <View style={styles.container}>
            <FinishMatchComp/>
            <View style={styles.header}>
                <HeaderComp/>
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
    header: {
        width: '100%'
    },
})