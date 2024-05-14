import { useNavigation } from "@react-navigation/native";
import { Text, StyleSheet, View } from "react-native";

import HeaderComp from "../../components/HeaderComp";
import RankComp from "../../components/rankComp";

export default function Rank() {
    const navigation = useNavigation();

    return(
        <View style={styles.container}>

            <RankComp></RankComp>
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
    header: {
        width: '100%'
    },
})