import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from './homeScreen'
import SettingsScreen from './settingsScreen'
import Bridge from './bridge'


const MainStack = createStackNavigator()

const MainApp = () => {
    return(
        <MainStack.Navigator>
            <MainStack.Screen name="Bridge" component={Bridge}/>
            <MainStack.Screen name="Home" component={HomeScreen}/>
            <MainStack.Screen name="Settings" component={SettingsScreen}/>
        </MainStack.Navigator>
    )
}
export default MainApp