import React,{ createContext, useReducer,useEffect } from "react"
import { useColorScheme } from "react-native";
import { themeReducer, ThemeState, lightTheme, darkTheme } from './ThemeReducer';

interface ThemeContextProps{
    theme: ThemeState,
    setDarkTheme: () => void;
    setLightTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);
export var currenttheme = useColorScheme()


export const ThemeProvider = ({children}: any) =>{

    const colorScheme = useColorScheme();
    const [theme, dispatch] = useReducer(themeReducer, (colorScheme==='dark') ? darkTheme : lightTheme  );
    useEffect(() => {
      (colorScheme==='light')
        ? setLightTheme()
        : setDarkTheme()
    }, [colorScheme]);
    
    const setDarkTheme = () =>{
        dispatch({type:'set_dark_Theme'})
        currenttheme = colorScheme
       // console.log("Set dark theme")
    }
    const setLightTheme = () =>{
        dispatch({type:'set_light_Theme'})
        currenttheme = colorScheme
       // console.log("Set light theme")
    }

    return(
        <ThemeContext.Provider value={{
            theme,     
            setDarkTheme,
            setLightTheme,
            
        }}>
            {children}
        </ThemeContext.Provider>
    )
}