import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';


const SettingsScreen = ({navigation, route}) => {
    const [data, setData] = React.useState('')
    const checkParam = () =>{
        if(route.params){
            setdata(route.params)
        }
    }
    React.useEffect(() => {
        checkParam()
    }, [])
    return(
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <Text >{data ? JSON.stringify(data) : 'No data'}</Text>
        </View>
    )
}
export default SettingsScreen