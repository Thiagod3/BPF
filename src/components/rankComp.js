import { FlatList, View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { useState, useEffect, useCallback } from "react";

import { useFocusEffect } from "@react-navigation/native";


export default function RankComp() {
    const [teams, setTeams] = useState([]);
    const [error, setError] = useState(null);
  
    useFocusEffect( useCallback(() => {
      // Função para buscar usuários da API
      const fetchTeams = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/teams`);
          if (!response.ok) {
            throw new Error("Erro ao buscar times: " + response.statusText);
          }
          const data = await response.json();
           // Ordenar os times com base no número de partidas jogadas (numberMatches)
        data.sort((a, b) => b.numberMatches - a.numberMatches);

         // console.log("Dados recebidos:", data); // Log para verificar os dados recebidos
          setTeams(data);
        } catch (error) {
          console.error(error);
          setError(
            "Erro ao buscar os times. Verifique sua conexão e tente novamente"
          );
        }
      };
  
      // Chamando a função para buscar times
      fetchTeams();
    }, []));


    const renderItem = ({ item, index }) => {
        let itemStyle = styles.renderContainer; // Estilo padrão para os itens
        if (index === 0) {
            itemStyle = [styles.renderContainer, { backgroundColor: 'gold' }];
        } else if (index === 1) {
            itemStyle = [styles.renderContainer, { backgroundColor: 'silver' }]; // Estilo para o segundo item
    } else if (index === 2) {
        itemStyle = [styles.renderContainer, { backgroundColor: '#cd7f32' }]; // Estilo para o terceiro item (cor de bronze)
    }
        
        return (
            <View style={itemStyle}>
                <Text style={styles.itemText}>{index + 1}°</Text>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.itemText}>{item.numberMatches}</Text>
            </View>
        );
    };
    return(
        <View style={styles.container}>
            <FlatList
                style={styles.flatList}
                data={teams}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "85%",
        width: "90%",
        margin: 10,
        borderRadius: 10,
        backgroundColor: "#D9D9D9",
      },
      flatList:{
        width:"100%",
      },
      renderContainer:{  
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#D9D9D9',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.6,

        elevation: 3,
      },
      itemText:{        
        fontSize: 26,
        fontWeight: 'bold',
      },
})