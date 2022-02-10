import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tab1 } from './Tab1';
import Icon from'react-native-vector-icons/Ionicons'
import { Tab2Screen } from './Tab2';
import { ThemeContext } from '../Context/ThemeContext/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();



export const Tabs= () => {
  const {theme:{colors}} = useContext(ThemeContext);
  return (
      <Tab.Navigator
          
          sceneContainerStyle={{
              backgroundColor: colors.background,
          }}
          screenOptions={{
              tabBarActiveTintColor: colors.primary,
              tabBarStyle:{
                  position:'absolute',
                  //backgroundColor: 'rgba(255,255,255,0.92)', 
                  paddingBottom: 10, //( Platform.OS === 'ios') ? 0 : 10, 
                  borderWidth: 0,
                  elevation: 0,
                  
              },
              
              
              
          }}
      >
        <Tab.Screen 
        name="Pokedex" 
        component={Tab1} 
        options={{
            tabBarLabel: "listado",
            headerShown:false,
            tabBarIcon: ({color}) => (
            <Icon 
              color={color} 
              size={20}
              name="list-outline"          
            />
            
            )
        }}
        />
        <Tab.Screen 
  
        name="Settings" 
        component={Tab2Screen} 
        options={{
          tabBarLabel: "Buscar",
          headerShown:false,
          tabBarIcon: ({color}) => (
          <Icon 
            color={color} 
            size={25}
            name="search-outline"          
          />
          
          )
      }}
        />
  
      </Tab.Navigator>
      
  );
  
}