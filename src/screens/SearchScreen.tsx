import React, { useEffect } from 'react'
import {  View,StyleSheet, Text,FlatList, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Loading } from '../components/Loading';
import { PokemonCards } from '../components/PokemonCards';
import { SearchInput } from '../components/SearchInput';
import { UsePokemonSearch } from '../Hooks/UsePokemonSearch';
import { useState } from 'react';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';


const screenWidth = Dimensions.get('window').width
export const SearchScreen = () => {

    const {top} = useSafeAreaInsets();
    const { isFetching,simplePokemonList} =  UsePokemonSearch();
    
    const [term, setTerm] = useState('')
    const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([])
    useEffect(() => {

        if(term.length==0){
            return setPokemonFiltered([]);
        }
        if(isNaN(Number(term))){
            setPokemonFiltered(simplePokemonList.filter(
                (poke) => poke.name.toLowerCase().includes(term.toLowerCase()))
            )
        }else {
            const pokemonbyId = simplePokemonList.find(poke => poke.id === term);
           setPokemonFiltered(
               (pokemonbyId) ? [pokemonbyId] : []
           ) 
        }
    }, [term])
    if(isFetching) {
        return<Loading/>
    }
    return (
        <View style = {{
            flex:1, 
            
            //marginHorizontal: 20,
        }}>
        <SearchInput
            onDebounce={(value) => setTerm(value)}
            style={{
                position: 'absolute',
                zIndex: 999,
                width:screenWidth-40,
                top:top + 15,
                marginHorizontal:15
            }}    
        />
        <FlatList
                    data={pokemonFiltered}
                    keyExtractor={(pokemon)=>pokemon.id}
                    showsVerticalScrollIndicator={false }
                    numColumns={2}
                    //header
                    ListHeaderComponent={( <Text style={{ 
                        ...styles.titlesearch,
                        paddingBottom: 10,
                        marginTop: top + 60,
                    }}>{term}</Text> )}
                    renderItem={({item}) => ( <PokemonCards pokemon={item} />)}
                    

                />
            
        </View>
    )
}

const styles = StyleSheet.create({

    titlesearch:{
        fontSize:35,
        fontWeight:'bold',
        color:'black',
        marginHorizontal:15
    }
});

