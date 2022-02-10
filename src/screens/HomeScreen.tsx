import React, { useContext } from 'react'
import { View,Text,Image, FlatList, ActivityIndicator, TouchableOpacity, } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { UsePokemonPaginated } from '../Hooks/UsePokemonPaginated'
import {styles } from '../Theme/appTheme'
import { PokemonCards } from '../components/PokemonCards';
import Icon from'react-native-vector-icons/Ionicons'
import {useScrollToTop } from '@react-navigation/native'
import useHandleScroll from '../Hooks/HandleScroll'
import { currenttheme, ThemeContext } from '../Context/ThemeContext/ThemeContext';
var flag:number
if (currenttheme==='dark') {
    flag=1
}else{
    flag=0
    
}
export const HomeScreen = () => {
    const { top } = useSafeAreaInsets ();
    const{ simplePokemonList, loadpokemon }= UsePokemonPaginated();
    const { handleScroll, showButton } = useHandleScroll();
    const ref = React.useRef(null);
    useScrollToTop(ref);
    const {setDarkTheme, setLightTheme,theme:{colors}} = useContext(ThemeContext);
    return (
        <>

            <Image
                style= {{
                    ...styles.pokebolaBG,
                }}
                source={flag===1
                ?require('../assets/pokebola-blanca.png')
                :require('../assets/pokebola.png')
            }
            />
            
            <View
                style={{ alignItems:'center', flexDirection:'row'}}
            >
                
                <FlatList 
                    data={simplePokemonList}
                    keyExtractor={(pokemon)=>pokemon.id}
                    showsVerticalScrollIndicator={false }
                    numColumns={2}
                    //header
                    ListHeaderComponent={( <Text style={{ 
                        ...styles.title,
                        ...styles.globalMargin,
                        color:colors.text,
                        top:top +20,
                        marginBottom: top +20,
                        paddingBottom: 10
                    }}>Pokedex</Text>
                    )
                    
                }
                    renderItem={({item}) => ( <PokemonCards pokemon={item} />)}
                    
                    //infinite scroll
                    onEndReached={loadpokemon}
                    onEndReachedThreshold={0.4}
                    ListFooterComponent={(<ActivityIndicator 
                        style={{height:100}}
                        size={20}
                        color="grey"
                        />
                    )}
                    ref={ref}
                    onScroll={handleScroll}
                />

              {showButton &&                 
              <TouchableOpacity
                            onPress={()=> 
                            {
                                if (flag===1) {
                                setLightTheme()
                                flag=0
                            } else {
                                setDarkTheme()
                                flag=1
                            }}}
                        // activeOpacity={0.8}
                            style={{
                                position:'absolute',
                                right:30,
                                top:27,
                            }}
                            
                >
                    <Icon
                        name="sunny-outline"
                        color="pink"
                        size={35 }
                    />
                </TouchableOpacity>}
            </View>      
        </>
    )
}
