import {
    StyleSheet, Text, View, Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useCallback } from "react";
import { Button, } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import api from "../../config/api";
import apiURL from "../utils/API";

const { width, height } = Dimensions.get('window');


export default function EditPositionComp({onClose}) {
    const navigation = useNavigation();

    const [position, setPosition] = useState("");

    const [user, setUser] = useState("");

    const refreshPage = useCallback(() => {
        navigation.navigate('Matches')
        navigation.navigate('Profile', { key: Math.random().toString() });
    }, [navigation]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                const userId = await AsyncStorage.getItem("userId");

                if (!token || !userId) {
                    navigation.navigate("Login");
                    return;
                }

                const response = await fetch(
                    `${apiURL}/user/profile/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Erro ao carregar dados do usuário, Erro A");
                }

                const userData = await response.json();
                setUser(userData);
                
            } catch (error) {
                console.error("Erro ao carregar dados do usuário:", error);
                Alert.alert("Erro", "Erro ao carregar dados do usuário");
            }
        };

        fetchUserData();
    }, []);

    async function updateCity() {
        const userData = {
            id: user.id,
            newcity: position
        }

        try {
            const response = await fetch(`${apiURL}/api/user/update/position/${user.id}/${position}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar os dados para a API.');
            }

            console.log('Dados enviados com sucesso para a API.');
            refreshPage();
            onClose();
        } catch (error) {
            console.error('Erro:', error.message);
        }
    }

    useEffect(() => {
        if (position) {
            updateCity(user.id, position);
        }
    }, [position, user.id]);


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
                        <Button
                            containerStyle={styles.buttons}
                            color={"#FF731D"}
                            onPress={() => { setPosition("atacante") }}
                        >ATA</Button>
                    </View>

                    <View style={styles.buttonRow}>
                        <Button
                            containerStyle={styles.buttons}
                            color={"#FF731D"}
                            onPress={() => { setPosition("pontaEsquerda") }}
                        >PE</Button>
                        <Button containerStyle={styles.buttons} color={"#FF731D"}
                            onPress={() => { setPosition("pontaDireita") }}>PD</Button>
                    </View>

                    <View style={styles.button}>
                        <Button containerStyle={styles.buttons} color={"#FF731D"}
                            onPress={() => { setPosition("segundoAtacante") }}>SA</Button>
                    </View>

                    <View style={styles.button}>
                        <Button containerStyle={styles.buttons} color={"#FF731D"}
                            onPress={() => { setPosition("meioCampo") }}>MC</Button>
                    </View>

                    <View style={styles.buttonRow}>
                        <Button containerStyle={styles.buttons} color={"#FF731D"}
                            onPress={() => { setPosition("meiaEsquerda") }}>ME</Button>
                        <Button containerStyle={styles.buttons} color={"#FF731D"}
                            onPress={() => { setPosition("meiaDireita") }}>MD</Button>
                    </View>

                    <View style={styles.button}>
                        <Button containerStyle={styles.buttons} color={"#FF731D"}
                            onPress={() => { setPosition("volante") }}>VOL</Button>
                    </View>

                    <View style={styles.buttonRow}>
                        <Button containerStyle={styles.buttons} color={"#FF731D"}
                            onPress={() => { setPosition("lateralEsquerda") }}>LE</Button>
                        <Button containerStyle={styles.buttons} color={"#FF731D"}
                            onPress={() => { setPosition("lateralDireita") }}>LD</Button>
                    </View>

                    <View style={styles.button}>
                        <Button containerStyle={styles.buttons} color={"#FF731D"}
                            onPress={() => { setPosition("zagueiro") }}>ZAG</Button>
                    </View>

                    <View style={styles.button}>
                        <Button containerStyle={styles.buttons} color={"#FF731D"}
                            onPress={() => { setPosition("goleiro") }}>GOL</Button>
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