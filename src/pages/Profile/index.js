import { View, Text, StyleSheet, Image, Modal, TouchableOpacity} from "react-native";
import Header from '../../components/HeaderComp';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from "@rneui/themed";
import { useState } from "react";
import EditProfile from "../../components/EditProfileComp";


export default function Profile(){
    
    const [opt, setOpt] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);


    const handleShowopt = () => {
        setOpt(!opt)
    }

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <View style={styles.info} id="name">
                    <Text style={styles.infoText}>FULANO DE TAL</Text>
                </View>

                <View style={styles.info} id="team">
                    <Text style={styles.infoText}>TIME</Text>
                    <Image
                        source={require("../../../assets/teamTemp.png")}
                    />
                    <Text style={styles.infoText}>Cortinas FC</Text>
                </View>
                
                <Text style={styles.bio}>Bio...</Text>
            </View>

            <View style={styles.profile}>
                <View style={styles.profile}>
                    <Image 
                        source={require("../../../assets/profile-pic.png")}
                        style={styles.profilePic}
                        />
                    <Text style={styles.profileText}>ATA</Text>
                </View>
                <Button
                    color="#FF731D"
                    icon={
                        <MaterialCommunityIcons name="progress-pencil" size={30} color="black" />
                    }
                    containerStyle={styles.profileButton}
                    onPress={() => {
                        handleShowopt();
                        setModalVisible(true);
                    }}
                />
            </View>
            
            <View style={styles.header}>
                <Header></Header>
            </View>  
            
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
                >
                </TouchableOpacity>
                <EditProfile onClose={() => setModalVisible(false)} />
            </Modal>
            
        </View>
            
        
    );
}


const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'column-reverse',
        backgroundColor: '#808080',
        gap: 15,
    },
    infoContainer:{
        backgroundColor: '#D9D9D9',
        width: '90%',
        borderRadius: 10,
    },
    info:{
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingVertical: 10,
    },
    infoText:{
        fontSize: 25,
        fontWeight: 'bold'
    },
    bio: {
        fontSize: 25,
        color: '#808080',
        paddingHorizontal: 50,
        paddingVertical: 10

    },
    profile: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileText:{
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 25,
        width: 60,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#F2F2F2',
        backgroundColor: '#113B8F',
        borderRadius: 10,
        marginTop: -15
    },
    profilePic: {
        height: 200,
        width: 200,
        borderRadius: 100,
    },
    profileButton: {
        marginTop: -45,
        marginLeft: 150,
        borderRadius: 50
    },
    header: {
        width: '100%'
    },

    editProfile:{
        position: 'absolute'
    },
})