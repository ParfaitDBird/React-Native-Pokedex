import React, { useContext, useState } from 'react'
import { StyleProp, Text, View, ViewStyle } from 'react-native';

import {StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import   Icon  from 'react-native-vector-icons/Ionicons';
import { useDebouncedValue } from '../Hooks/useDebouncedValue';
import { useEffect } from 'react';
import { ThemeContext } from '../Context/ThemeContext/ThemeContext';


interface Props {
    style?: StyleProp<ViewStyle>
    onDebounce: (value:string) => void;
}
//Implementacion del debounce para controlar inputs de texto
export const SearchInput = ({style, onDebounce}:Props) => {


    const [textValue, setTextValue] = useState('')
    const debouncedValue = useDebouncedValue(textValue)

    const {theme:{colors}} = useContext(ThemeContext);
    useEffect (() => {
        onDebounce(debouncedValue);
    }, [debouncedValue])

    return (
        <View style = {{
            ...style as any,
            ...styles.container }}>
            <View style= {{...styles.textBackground,backgroundColor:colors.card}}>
                <TextInput
                    placeholder='Buscar pokemon'
                    style={{...styles.textInput,color:colors.text}}
                    autoCapitalize='none'
                    autoCorrect={false}
                    placeholderTextColor={colors.text}
                    value={textValue}
                    onChangeText={setTextValue}
                    
                />

                <Icon
                    name="search-outline"
                    color="grey"
                    size={30}
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        //backgroundColor:'blue',

    },
    textBackground:{
        borderRadius: 50,
        height:40,
        paddingHorizontal: 20,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    },
    textInput:{
        flex:1,
        fontSize:16,
        top:4,
    }
});