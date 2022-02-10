import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Tabs } from './src/Navigator/Tabs';
import { ThemeContext, ThemeProvider } from './src/Context/ThemeContext/ThemeContext';
export const App = () => {
  const {theme} = useContext(ThemeContext);
  return (
<ApState>
    <NavigationContainer
      theme={theme}
    >
      {/* <Navigator/> */}
      <Tabs
      
      />
    </NavigationContainer>
</ApState>
  )
}
const ApState = ({children}: any) => {
  return(
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}
export default App;
