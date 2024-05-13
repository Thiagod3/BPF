import {View,StyleSheet, Text, ScrollView} from 'react-native';
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import HeaderComp from '../../components/HeaderComp.js';
import UncreatedTeamComp from '../../components/UncreatedTeamComp.js'
import CreateTeamComp from '../../components/CreatedTeamComp.js';



export default function CreateTeam() {
  const navigation = useNavigation();

    return(
        <View style={styles.container}>


            {/* Se não tiver time, mostrar: */}
            <View style={styles.CTeam}>
                <UncreatedTeamComp></UncreatedTeamComp>
            </View>

            {/* Se tiver time, mostrar: */}
            {/* <View style={styles.CTeam}>
                <CreateTeamComp></CreateTeamComp>
            </View> */}


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
    CTeam:{       
        height: "85%",
        margin: 15,
    },
    header: {
        width: '100%'
    },
})