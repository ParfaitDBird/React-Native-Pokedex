import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { PokemonScreen } from '../screens/PokemonScreen';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { ThemeContext } from '../Context/ThemeContext/ThemeContext';

export type RootStackParams = {
  HomeScreen: undefined,
  PokemonScreen: { simplePokemon: SimplePokemon, color: string}
}


const Stack = createStackNavigator<RootStackParams>();

export const Tab1 = () => {
  const {theme} = useContext(ThemeContext);
  return (
    <Stack.Navigator
    
    screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: theme.colors.background,
        }
    }}
    
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />

    </Stack.Navigator>
  );
}