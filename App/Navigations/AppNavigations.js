import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from '../Screens/HomeScreen'
import NewPostScreen from '../Screens/NewPostScreen'
import CameraScreen from '../Screens/CameraScreen'
import CameraPostScreen from '../Screens/CameraPostScreen'
import AboutScreen from '../Screens/AboutScreen'
import AccountScreen from '../Screens/AccountScreen'
import SearchScreen from '../Screens/SearchScreen'
import ImageBigView from '../repeated/Account/ImageBigView'
import ExpImageMain from '../repeated/explore/ExpImageMain'
import OtherUserScreen from '../Screens/OtherUserScreen'

const Stack = createStackNavigator()


const AppNavigations = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown:false,animationTypeForReplace:'pop'}}/>
                <Stack.Screen name='NewPost' component={NewPostScreen} options={{headerShown:false,animationTypeForReplace:'pop'}}/>
                <Stack.Screen name='CameraPost' component={CameraPostScreen} options={{headerShown:false,animationTypeForReplace:'push'}}/>
                <Stack.Screen name='AboutScreen' component={AboutScreen} options={{headerShown:false,animationTypeForReplace:'push'}}/>
                <Stack.Screen name='AccountScreen' component={AccountScreen} options={{headerShown:false,animationTypeForReplace:'push'}}/>
                <Stack.Screen name='CameraScreen' component={CameraScreen} options={{headerShown:false,animationTypeForReplace:'push'}}/>
                <Stack.Screen name='ExploreScreen' component={SearchScreen} options={{headerShown:false,animationTypeForReplace:'push'}}/>
                <Stack.Screen name='OtherUserScreen' component={OtherUserScreen} options={{headerShown:false,animationTypeForReplace:'push'}}/>

                <Stack.Screen name='ImagebigScreen' component={ImageBigView} options={{headerShown:false,animationTypeForReplace:'push'}}/>
                <Stack.Screen name='ExpImagebigScreen' component={ExpImageMain} options={{headerShown:false,animationTypeForReplace:'push'}}/>

            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default AppNavigations
