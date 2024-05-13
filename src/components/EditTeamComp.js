import { ButtonGroup } from "@rneui/themed";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { View } from "react-native"


const EditProfile = ({ onClose }) => {

    return(
        <TouchableOpacity
            activeOpacity={1}
            style={styles.teste}
            onPress={onClose}
        >
                <ButtonGroup
                    buttons={[
                        <View style={styles.buttonContainer}>
                            <FontAwesome name="camera" size={30} color="#FF731D" />
                            <Text style={styles.buttonText}>Câmera</Text>
                        </View>,
                        <View style={styles.buttonContainer}>
                             <FontAwesome name="photo" size={30} color="#FF731D" />
                            <Text style={styles.buttonText}>Galeria</Text>
                        </View>,
                    ]}
                    containerStyle={styles.buttons}
                />
        </TouchableOpacity>
        
    );
}

const styles = StyleSheet.create({
    teste: {
        flexDirection: 'column-reverse',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        position: 'absolute'
    },
    buttons:{
        height: '15%',
        width: '100%',
        marginBottom: -3,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor:'#113B8F',
        borderColor: 'transparent',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: "#FF731D",
        marginTop: 5,
    },
})

export default EditProfile;