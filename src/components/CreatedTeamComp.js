import {View,StyleSheet, Image, Text, Modal, TouchableOpacity} from 'react-native';
import { Button } from "@rneui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import EditTeamComp from "./EditTeamComp";

import { useState } from 'react';


export default function CreateTeamComp() {

    const [opt, setOpt] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const handleShowopt = () => {
        setOpt(!opt);
      };
    

    return (
        <View style={styles.container}>
            <View style={styles.teamPic}>
                <Image source={require("../../assets/BoraProFutLogo.png")} style={styles.profilePic} />
                <Button
                    color="#FF731D"
                    icon={
                        <MaterialCommunityIcons
                            name="progress-pencil"
                            size={30}
                            color="black"
                        />
                    }
                    containerStyle={styles.teamPicButton}
                    onPress={() => {
                        handleShowopt();
                        setModalVisible(true);
                    }}
                />           
            </View>
            
            <View style={styles.InnerContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.teamTitle}>TIME DE TAL</Text>
                </View>
                <View style={styles.bioContainer}>
                    <Text style={styles.bioText}>Time dos guri q veio pras cabeça</Text>
                </View>
                
                
            </View>

            <Button
                title="membros"
                color="#113B8F"
                uppercase
                icon={<Ionicons name="eye-outline" size={30} color="#FF731D" />}
                containerStyle={styles.memberButton}                
                titleStyle={styles.memberButtonTitle}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(false);
                }}
            >
                <TouchableOpacity
                activeOpacity={1}
                style={{ flex: 1, backgroundColor: "rgba(1, 1, 1, 0.75)" }}
                onPress={() => setModalVisible(false)}
                ></TouchableOpacity>
                <EditTeamComp onClose={() => setModalVisible(false)} />
            </Modal>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        gap: 20,
    },
    teamPic: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: -50,
    },
    teamPicButton:{
        marginLeft: 150,
        borderRadius: 50,
    },
    InnerContainer: {  
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
    },
    titleContainer: {
        width: '100%',        
        borderStyle: "solid",
        borderBottomWidth: 2,
        padding: 10,
    },
    teamTitle: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    bioContainer: {
        width: '100%',
        padding: 20,
        paddingBottom: 50
    },
    bioText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '400',
    },
    memberButton:{
        borderRadius: 10,
        
    },
    memberButtonTitle:{
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF731D',
        padding: 10
    }
})