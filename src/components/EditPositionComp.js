import {
    Image, StyleSheet, Text, View, Dimensions, ImageBackground,
    Pressable,
} from "react-native";
import { Button } from "@rneui/themed";

import { FontAwesome } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get('window');


export default function EditPositionComp() {


    return (
        <View style={styles.container}>
            <Text style={styles.containerText}> Selecione sua posição:</Text>

            {/* ATA = ATACANTE
            PE E PD = PONTA ESQUERDA E DIREITA
            SA = SEGUNDO ATACANTE
            MC = MEIO CAMPO 
            ME E MD = MEIA ESQUERDA E DIREITA
            VOL = VOLANTE
            LE E LD = LATERAL ESQUERDA E DIREITA
            ZAG = ZAGUEIRO
            GOL = GOLEIRO */}

            <View style={styles.innerContainer}>
                <View style={styles.field}>
                    <View style={styles.centerLine} />
                    <View style={styles.centerCircle}>
                        <View style={styles.ball} />
                    </View>

                    <View style={styles.goalAreaTop}>
                        <View style={styles.goalBox} />
                        <View style={styles.penaltyBox} />
                    </View>
                    <View style={styles.goalAreaBottom}>
                        <View style={styles.goalBox} />
                        <View style={styles.penaltyBox} />
                    </View>


                    <View style={styles.button}>
                        <Button containerStyle={styles.buttons} color={"#FF731D"}>ATA</Button>
                    </View>

                    <View style={styles.buttonRow}>
                        <Button containerStyle={styles.buttons} color={"#FF731D"}>PE</Button>
                        <Button containerStyle={styles.buttons} color={"#FF731D"}>PD</Button>
                    </View>

                    <View style={styles.button}>
                        <Button containerStyle={styles.buttons} color={"#FF731D"}>SA</Button>
                    </View>

                    <View style={styles.button}>
                        <Button containerStyle={styles.buttons} color={"#FF731D"}>MC</Button>
                    </View>

                    <View style={styles.buttonRow}>
                        <Button containerStyle={styles.buttons} color={"#FF731D"}>ME</Button>
                        <Button containerStyle={styles.buttons} color={"#FF731D"}>MD</Button>
                    </View>

                    <View style={styles.button}>
                        <Button containerStyle={styles.buttons} color={"#FF731D"}>VOL</Button>
                    </View>

                    <View style={styles.buttonRow}>
                        <Button containerStyle={styles.buttons} color={"#FF731D"}>LE</Button>
                        <Button containerStyle={styles.buttons} color={"#FF731D"}>LD</Button>
                    </View>

                    <View style={styles.button}>
                        <Button containerStyle={styles.buttons} color={"#FF731D"}>ZAG</Button>
                    </View>

                    <View style={styles.button}>
                        <Button containerStyle={styles.buttons} color={"#FF731D"}>GOL</Button>
                    </View>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        width: "100%",
        height: height / 1.2,
        backgroundColor: "#113B8F",
        marginTop: -50,
        gap: 10
    },
    containerText: {
        fontSize: 20,
        color: "#D9D9D9"
    },
    buttonContainer: {
        alignItems: "center",
        gap: 15,
    },
    buttonRow: {
        flexDirection: "row",
        gap: 130,
    },
    buttons: {
        width: 80,
        height: 40,
        borderRadius: 10,
    },
    innerContainer: {
        width: width / 1.1,
        height: height / 1.4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    field: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 3,
        borderColor: "white",
        width: '100%',
        height: '100%', 
        backgroundColor: 'green',
        gap: 20,
        position: 'relative',
    },
    centerLine: {
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: 'white',
    },
    centerCircle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 100, 
        height: 100, 
        marginLeft: -50, 
        marginTop: -50, 
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ball: {
        width: 20,
        height: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    goalAreaTop: {
        position: 'absolute',
        top: 0,
        left: '15%',
        right: '15%',
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -3
    },
    goalAreaBottom: {
        position: 'absolute',
        bottom: 0,
        left: '15%',
        right: '15%',
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: -3
    },
    goalBox: {
        width: '50%',
        height: '100%',
        borderColor: 'white',
        borderWidth: 2,
    },
});