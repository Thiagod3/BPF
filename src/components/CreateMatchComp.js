import React, { useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, TextInput} from 'react-native';
import { CheckBox, FAB } from '@rneui/themed';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const CreateMatchComp = () => {

    const [selectedField, setField] = React.useState(0);
    const [selectedPrice, setPrice] = React.useState(0);

    return (
        <View style={styles.container}>
            <View style={styles.loc}>                
                <Text style={styles.locText}>Onde será a partida?</Text>
                <Image 
                    source={require("../../assets/mapTEMP.png")}
                    style={styles.locPic}
                />
            </View>            
            <View style={styles.inputBox}>
                <TextInput 
                    placeholder='Procurar'
                    style={styles.input}
                />     
                <MaterialCommunityIcons name="magnify" size={24} color="black" />
            </View>
            
            <View style={styles.info}>
                <Text style={styles.infoText}>Tipo de campo: </Text>
                <View style={styles.infoBox}>
                    <CheckBox
                    containerStyle={styles.boxes}
                    checked={selectedField === 0}
                    onPress={() => setField(0)}
                    checkedIcon="dot-circle-o"
                    title='Areia'
                    size={20}
                    uncheckedIcon="circle-o"
                    checkedColor="#FF731D"
                    />
                    <CheckBox
                    containerStyle={styles.boxes}
                    checked={selectedField === 1}
                    onPress={() => setField(1)}
                    checkedIcon="dot-circle-o"
                    title='Society'
                    size={20}
                    uncheckedIcon="circle-o"
                    checkedColor="#FF731D"
                    />
                    <CheckBox
                    containerStyle={styles.boxes}
                    checked={selectedField === 2}
                    onPress={() => setField(2)}
                    checkedIcon="dot-circle-o"
                    title='Gramado'
                    size={20}
                    uncheckedIcon="circle-o"
                    checkedColor="#FF731D"
                    />
                </View>
            </View>

            <View style={styles.info}>
                <Text style={styles.infoText}>Campo Pago? </Text>
                <View style={styles.infoBox}>
                    <CheckBox
                    containerStyle={styles.boxes}
                    checked={selectedPrice === 0}
                    onPress={() => setPrice(0)}
                    checkedIcon="dot-circle-o"
                    title='Sim'
                    size={20}
                    uncheckedIcon="circle-o"
                    checkedColor="#FF731D"
                    />
                    <CheckBox
                    containerStyle={styles.boxes}
                    checked={selectedPrice === 1}
                    onPress={() => setPrice(1)}
                    checkedIcon="dot-circle-o"
                    title='Não'
                    size={20}
                    uncheckedIcon="circle-o"
                    checkedColor="#FF731D"
                    />
                </View>
            </View>

            <View style={styles.inputBox}>
                <TextInput 
                    placeholder='dd/mm'
                    style={styles.input}
                />     
                <Ionicons name="calendar-outline" size={24} color="black" />
            </View>
            <View style={styles.inputBox}>
                <TextInput 
                    placeholder='--:--'
                    style={styles.input}
                />     
                <MaterialCommunityIcons name="clock-outline" size={24} color="black" />
            </View>


            <FAB
                title="bora pro fut!!"
                color="#113B8F"
                titleStyle={{color:'#FF731D', fontWeight: 'bold', fontSize: 20}}
                upperCase
                icon={<Ionicons name="football-outline" size={30} color="#FF731D" />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        padding: 20,
        margin: 10,
        gap: 15,
        borderRadius: 10,
        backgroundColor: '#D9D9D9',
    },
    locText:{
        width: '100%',
        fontWeight: 'bold',
        fontSize: 26,
    },
    loc: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    info: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoBox: {        
        flexDirection: 'row',
        gap: -30
    },
    boxes:{
        backgroundColor: '#D9D9D9'
    },
    box:{
        
    },
    infoText: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    address: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap: 10
    },
    inputBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        height: 50,
        width: '90%',
        borderRadius: 50,
        paddingHorizontal: 30
    },
    input: {
        height: '100%',
        width: '60%'
    }
})
export default CreateMatchComp;