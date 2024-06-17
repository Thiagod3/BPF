import React, { useEffect, useState } from "react";
import { Alert, TouchableOpacity, StyleSheet, Text, View, TextInput } from "react-native";

export default function EditTeamBioComp({ onClose, onUpdateBio }) {

    const [newBio, setNewBio] = useState('');

    const handleConfirm = () => {
        onUpdateBio(newBio); // Chamando a função onUpdateCity com o novo valor da cidade
        setNewBio(''); // Limpar o input após confirmar
        onClose();
    };

    return (
        <TouchableOpacity
            style={styles.back}
            onPress={onClose}
        >
            <View style={styles.container}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Informe sua nova bio!</Text>
                    <TextInput
                        style={styles.modalInput}
                        placeholder="Digite aqui..."
                        multiline={true}
                        onChangeText={(text) => setNewBio(text)}
                    />

                    <Text style={styles.modalText}>A atualização pode não aparecer imediatamente</Text>
                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.modalButtonCancel]}
                            onPress={onClose}
                        >
                            <Text style={styles.modalButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.modalButtonConfirm]}
                            onPress={handleConfirm}
                        >
                            <Text style={styles.modalButtonText}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    back: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(1, 1, 1, 0.45)",
        justifyContent: 'center',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 30,
        padding: 20,
        borderRadius: 20,
        backgroundColor: "#D9D9D9",
    },
    modalContainer: {
        borderRadius: 10,
        width: "100%",
        alignItems: "center",
        margin: 10,
        backgroundColor: "#D9D9D9",
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 10,
    },
    modalText: {
        fontSize: 12,
        marginBottom: 20,
    },
    modalInput: {
        minHeight: 40,
        maxHeight: 300,
        width: "100%",
        alignSelf: "center",
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: "#D9D9D9",
        marginBottom: 16,
        paddingLeft: 8,
        fontSize: 18,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    modalButton: {
        flex: 1,
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    modalButtonCancel: {
        backgroundColor: "#FF731D",
    },
    modalButtonConfirm: {
        backgroundColor: "#113B8F",
    },
    modalButtonText: {
        color: "white",
        fontSize: 16,
    },
});
