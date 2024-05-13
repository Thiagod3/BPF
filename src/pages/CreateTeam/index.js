import { Text, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import HeaderComp from "../../components/HeaderComp";
import CreateNewTeam from "../../components/CreateNewTeam";

export default function CreateTeam() {
    const navigation = useNavigation();

    return(
        <View style={styles.container}>

            <CreateNewTeam></CreateNewTeam>
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