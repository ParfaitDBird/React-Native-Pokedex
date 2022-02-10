import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

export const Loading = () => {
    return (
            <View style={styles.activitycontainer}>
                <ActivityIndicator
                size={50}
                color='grey'
                />
            <Text>LOADING</Text>
            </View>
    )
}
const styles = StyleSheet.create({
    activitycontainer:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    titlesearch:{
        fontSize:35,
        fontWeight:'bold',
        color:'black',
        marginRight:5,
    }
});