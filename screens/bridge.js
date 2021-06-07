import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import HomeScreen from './homeScreen'
import SettingsScreen from './settingsScreen'


const Bridge = ({navigation, route}) => {
    const checkParams = () => {
        if(route.params){
            let param = route.param
            console.log(param)
            let {screen, data} = param
            screen == 'Settings' ? navigation.navigate('Settings', data) : navigation.navigate("Home")
        }
    }
    React.useEffect(() => {
        checkParams()
    }, [])
    return(
        <View>
            <Text>Bridge</Text>
        </View>
    )
}
export default Bridge