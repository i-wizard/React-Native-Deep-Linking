import { StatusBar } from 'expo-status-bar';
import React, { isValidElement } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Platform, Button } from 'react-native';
import Animated, { cos } from 'react-native-reanimated'
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from './screens/homeScreen'
import SettingsScreen from './screens/settingsScreen'



const PREFIX = Linking.createURL('/')
//THE ABOVE CODE CREATES THE SCHEME ACCORDING TO THE ENVIRONMENT, IF IN EXPO "EXP:/" ELSE IT TAKES THE SCHEME IN YOUR APP.JSON
export default function App() {
  const [data, setData] = React.useState(null)
  const [screen, setScreen ] = React.useState(null)
  const AppStack = createStackNavigator()
  const linking = {
    prefixes:[PREFIX],
    config:{
      screens:{
        Home:'Home',
        Settings:'Settings'
      }
    }
  }

// DEEP LINKING FXNS

const setFirstScreen = info => {
  let {path} = info
  console.log(PREFIX)
  alert(JSON.stringify(info))
  setScreen(path)
  
}
const getInitialUrl = async () => {
  console.log('opened from cold start')
  let initialUrl = await Linking.getInitialURL()
  initialUrl && setData(Linking.parse(initialUrl))
  // console.log(Linking.parse(initialUrl))
  setFirstScreen(Linking.parse(initialUrl))

}
const handleDeepLinking = event => {
  let data = Linking.parse(event.url)
  // console.log(data)
  setData(data)
  setFirstScreen(data)
}
React.useEffect(() => {
  
  //THE LINE BELOW WILL ONLY WORK IF THE APP WAS ALREADY RUNNING IN THE BACKGROUD WHEN THE LINKWAS CLICKED
  Linking.addEventListener('url', handleDeepLinking)
  //THE GETINITIAL URL FXN IS TO CHECK WHETHER THE LINK APP WAS OPENED FROM THE LINK WHEN IT WAS'T RUNNIN ON THE BACKGROUND
  !data && getInitialUrl()
  return () => {
    Linking.removeEventListener('url')
  }
}, [])
// END DEEPLINKING FXNS
if(screen == null) return null
else if(screen == 'Settings'){
  return(
    <NavigationContainer linking={linking}>
    <AppStack.Navigator>
    <AppStack.Screen name="Settings" component={SettingsScreen}/>
  </AppStack.Navigator>
  </NavigationContainer>
  )
}
else{

  return(
  
  <NavigationContainer linking={linking}>
    <AppStack.Navigator>
      <AppStack.Screen name="Home" component={HomeScreen}/>
    
    </AppStack.Navigator>
  </NavigationContainer>
  )
}
// if(true){
//   return(
//     <View style={styles.container}>
//       <StatusBar style="auto" />
//       <Button style={{marginBottom:20}} title="Web Browwer" onPress={() => Linking.openURL('https://expo.io/')}/>
//       <Text>Next Line</Text>
//       <Button title="In app browser" onPress={() => WebBrowser.openBrowserAsync('https://expo.io/')}/>
//     <Text>{data ? JSON.stringify(data) : "App not opened from deep Link"}</Text>
//     </View>
//   )
// }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:30,
    backgroundColor: '#fff',
  },
});
// { href="exp://192.168.43.95:19000/Settgs?id=90772672"}
// {href="myapp://Settings?id=90772672" }