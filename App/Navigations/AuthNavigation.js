import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import LoginScreen from '../Screens/LoginScreen'
import SigninScreen from '../Screens/SigninScreen'

const Stack = createStackNavigator()


const AuthNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='LoginScreen' component={LoginScreen} options={{headerShown:false}}/>
                <Stack.Screen name='SigninScreen' component={SigninScreen} options={{headerShown:false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default AuthNavigation
