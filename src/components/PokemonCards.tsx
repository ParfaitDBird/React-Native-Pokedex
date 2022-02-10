import React, { useContext } from 'react'
import { StyleSheet,Text, View,TouchableOpacity, Dimensions, Image } from 'react-native';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/core';
import ImageColors from 'react-native-image-colors'
import { ThemeContext } from '../Context/ThemeContext/ThemeContext';

const windowWidth = Dimensions.get('window').width

interface Props{
    pokemon: SimplePokemon;
}

export const PokemonCards = ({pokemon}: Props) => {

    const {theme:{colors}} = useContext(ThemeContext);
    const [bgColor, setbgColor] = useState(colors.background)
    const isMounted = useRef(true);
    const navigation = useNavigation<any>();;

 
     useEffect(() => {
        ImageColors.getColors(pokemon.picture, { fallback: 'FEBC87'})
        .then(colors => {
            if (!isMounted.current) return;
            //ternario
            (colors.platform === 'android')
                ? setbgColor(colors.dominant || '#FEBC87' )
                : setbgColor(colors.platform || '#FEBC87' )
            
        });

        return() => {
            isMounted.current = false
        }


     }, [])

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('PokemonScreen'as never, {
                simplePokemon:pokemon,
                color: bgColor} as never
                 )}
        >
        <View style={{
            ...styles.cardContainer,
            width:windowWidth*0.44,
            backgroundColor: bgColor
        }}>
            {/*Nombre del pokemon y ID */}
            <View>
                <Text style={{
                    ...styles.name,
                    color:colors.card
                    }}>
                    {pokemon.name}
                    {'\n#'+pokemon.id}
                </Text>
            </View>

        <View style={styles.pokebolaContainer}>
        <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
        />
        </View>


        <FadeInImage
            uri={pokemon.picture}
            style={ styles.PokemonImage}
        />


        </View>

        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    cardContainer:{
        marginHorizontal:10,
        height:120,
        width:160,
        marginBottom:25,
        borderRadius:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,

    },
    name:{
        fontSize:20,
        fontWeight:'bold',
        top: 20,
        left: 10,
    },
    pokebola:{
        width:100,
        height:100,
        position:'absolute',
        right:-25,
        bottom:-25
    },
    PokemonImage:{
        width:120,
        height: 120,
        position: 'absolute',
        right:-8,
        bottom: -5,

    },
    pokebolaContainer:{
        width:100,
        height:100,
        position:'absolute',
        bottom: 0,
        right: 0,
        overflow:'hidden',
        opacity:0.5,
    }
});
