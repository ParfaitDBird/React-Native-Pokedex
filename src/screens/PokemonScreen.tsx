import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Text, View,StyleSheet,TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { RootStackParams } from '../Navigator/Tab1'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from'react-native-vector-icons/Ionicons'
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../Hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails';


interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {};
export const PokemonScreen = ({ route, navigation }: Props) => {
    const {simplePokemon, color} = route.params
    const { id,name,picture } = simplePokemon;
    const {top}=useSafeAreaInsets();

    const {isLoading, pokemon} = usePokemon(id)
    //console.log(pokemon)
    return (
        <View style={{
            flex:1
        }}>
            {/* Header container */}
            <View style={{
                    ...styles.headercontainer,
                    backgroundColor:color,
                }}>

                    {/* BACK BUTTON */}
                    <TouchableOpacity
                        onPress={()=> navigation.pop()}
                        activeOpacity={0.8}
                        style={{
                            ...styles.backButton,
                            top:top + 5,
                        }}
                    >
                        <Icon
                            name="arrow-back-outline"
                            color="white"
                            size={35 }
                        />
                    </TouchableOpacity>
                    {/* NOMBRE DE POKEMON */}
                    <Text
                    style={{
                        ...styles.pokemonName,
                        top: top + 45
                    }}
                    > 
                    {name +'\n'} #{id}
                    </Text>

                    {/*POKEBOLA BLANCA */}
                    <Image
                        source={require('../assets/pokebola-blanca.png')}
                        style={styles.pokeball}
                    />
                    {/* IMAGEN POKEMON */}
                    <FadeInImage
                        uri={picture}
                        style={styles.pokemonImage}
                    />
            </View> 
            {/*Detalles y loading */}
            {
                isLoading 
                ?(
                    <View style={ styles.loadingIndicator}>
                    <ActivityIndicator
                    color={color}
                    size={50}
                    />
                </View>
                )
                : <PokemonDetails pokemon={ pokemon} />
            }

        </View>
    )
}


const styles = StyleSheet.create({
    headercontainer:{
        height:370,
        zIndex: 999,
        alignItems:'center',
        borderBottomRightRadius:1000,
        borderBottomLeftRadius:1000,
    },
    backButton:{
        position:'absolute',
        left:20,
    },
    pokemonName:{
        color:'white',
        fontSize:40,
        alignSelf:'flex-start',
        left:20,
    },
    pokeball:{
        width:250,
        height:250,
        bottom:-10,
        opacity: 0.7
    },
    pokemonImage:{
        width:250,
        height:250,
        position:'absolute',
        bottom:-20,
    },
    loadingIndicator:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});
