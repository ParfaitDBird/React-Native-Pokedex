import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemeContext } from '../Context/ThemeContext/ThemeContext';
import { PokemonFull } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';

interface Props{
    pokemon: PokemonFull;
}

export const PokemonDetails = ({pokemon}: Props) => {
    
    const {theme:{colors}} = useContext(ThemeContext);
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                ...StyleSheet.absoluteFillObject,
            }}
        >
            {/*Types View */}
            <View style={{
                ...styles.container,
                marginTop:400
            }}/>
            <Text style={styles.title}>Types</Text>
            <View style={{flexDirection:'row'}}>
            {
                    pokemon.types.map(({type})=> (
                        <Text
                            style={{
                                ...styles.regularText,
                                color:colors.text,
                                marginRight:10,
                            }}
                            key={type.name}
                        >
                            {type.name}
                        </Text>
                    ))
                }
            </View>
            {/* PESO */}
            <Text style={{...styles.title,color:colors.text,}}>Peso</Text>
            <Text style={{...styles.regularText, color:colors.text}}>{pokemon.weight}lb </Text>
            {/*Sprites View */}
            <Text style={{...styles.title,color:colors.text}}>Sprites</Text>
            <ScrollView
             horizontal={true}
             showsHorizontalScrollIndicator={false}
            >
                <FadeInImage
                    uri={pokemon.sprites.front_default}
                    style={styles.basicSprite}
                />
                <FadeInImage
                    uri={pokemon.sprites.back_default}
                    style={styles.basicSprite}
                />
                <FadeInImage
                    uri={pokemon.sprites.front_shiny}
                    style={styles.basicSprite}
                />
                <FadeInImage
                    uri={pokemon.sprites.back_shiny}
                    style={styles.basicSprite}
                />
            </ScrollView>
                {/*Habilidades View */}
                <View style={{
                    ...styles.container,
                }}/>
            <Text style={{...styles.title,color:colors.text}}>Habilidades</Text>
            <View style={{flexDirection:'row'}}>
            {
                    pokemon.abilities.map(({ability})=> (
                        <Text
                            style={{
                                ...styles.regularText,
                                marginRight:10,
                            }}
                            key={ability.name}
                        >
                            {ability.name}
                        </Text>
                    ))
                }
            </View>

            {/*Movimientos View */}
                <View style={{
                    ...styles.container,
                }}/>
            <Text style={{...styles.title,color:colors.text}}>Movimientos</Text>
            <View style={{flexDirection:'row',flexWrap:'wrap'}}>
            {
                    pokemon.moves.map(({move})=> (
                        <Text
                            style={{
                                ...styles.regularText,
                                color:colors.text,
                                marginRight:10,
                            }}
                            key={move.name}
                        >
                            {move.name}
                        </Text>
                    ))
                }
            </View>
            {/*STATS View */}
            <View style={{
                    ...styles.container,
                }}/>
            <Text style={{...styles.title,color:colors.text}}>Stats</Text>
            <View>
            {
                    pokemon.stats.map((stat,i)=> (
                          <View 
                            key={stat.stat.name + i}
                            style={{flexDirection:'row'}}
                          >
                            <Text
                                style={{
                                    ...styles.regularText,
                                    color:colors.text,
                                    marginRight:10,
                                    width:150,
                                }}
                                key={stat.stat.name}
                                
                            >
                                {stat.stat.name}
                            </Text>
                            <Text
                                style={{
                                    ...styles.regularText,
                                    color:colors.text,
                                    fontWeight:'bold'
                                }}
                                key={stat.base_stat}
                                
                            >
                                {stat.base_stat}
                            </Text>
                        </View>
                    ))
                }
                <View style={{
                    marginBottom:50,
                    alignItems:'center',
                }}>
                <FadeInImage
                    uri={pokemon.sprites.front_default}
                    style={styles.basicSprite}
                />
                </View>
                

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:20,
    },
    title:{
        marginHorizontal:10,
        fontWeight:'bold',
        fontSize:22,
        marginTop:20, 
    },
    regularText:{
        marginHorizontal:10,
        fontSize:19,
    },
    basicSprite:{
        width:100,
        height:100,
    }
});
