import React, { useState } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import MenuComp from './MenuComp';
import Ionicons from '@expo/vector-icons/Ionicons';


const HeaderComp = ({toggleSearch }) => {

    const [showMenu, setShowMenu] = useState(false);

    const handleMenu = () => {
        setShowMenu(!showMenu);      
    }

    return (
        <View style={styles.container}>
            <View style={styles.icons}>
                <Image 
                source={require("../../assets/BoraProFutLogo.png")}
                style={styles.logo}
                />
                <View style={styles.menu}>
                    <TouchableOpacity
                     onPress={toggleSearch}
                    >
                        <Ionicons name="search-outline" size={40} color="#FF731D"/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleMenu}
                    >
                        <Ionicons name="reorder-three-outline" size={60} color="#FF731D" />
                    </TouchableOpacity>     

                </View>
            </View>
            {showMenu && <MenuComp handleMenu={handleMenu}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 90,
        backgroundColor: '#113B8F',
        borderBottomWidth: 5,
        borderBottomColor: '#FF731D',
        paddingTop: 20
    },
    logo:{
        height: 60,
        width: 60,
    },
    icons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
    menu: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HeaderComp;