import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AboutScreen from '../Screens/AboutScreen'
import HomeScreen from '../Screens/HomeScreen';
import { Avatar } from 'react-native-elements';
import NewPostScreen from '../Screens/NewPostScreen';
import AppNavigations from '../Navigations/AppNavigations';
import AccountScreen from '../Screens/AccountScreen';
import CameraScreen from '../Screens/CameraScreen';

const Tab = createBottomTabNavigator();


const MainNavigation = ()=>{
        

    return(
        <Tab.Navigator screenOptions={{tabBarActiveTintColor:'white',tabBarIconStyle:{color:'grey'},tabBarStyle:{backgroundColor:'black',borderTopColor:'black',}}}>
            <Tab.Screen name="Home" component={AppNavigations} options={{tabBarIcon:({size,color})=><Avatar size={60} rounded icon={{ name: 'home', type: 'font-awesome',color:color }} />,tabBarShowLabel:false,headerShown:false }} />
            <Tab.Screen name="Explore" component={AboutScreen} options={{tabBarIcon:({size,color})=><Avatar size={60} rounded icon={{ name: 'search', type: 'font-awesome',color:color }}/>,tabBarShowLabel:false,headerShown:false }} />
            <Tab.Screen name="Camera" component={CameraScreen} options={{tabBarIcon:({size,color})=><Avatar size={60} rounded icon={{ name: 'camera', type: 'font-awesome',color:color }}/>,tabBarShowLabel:false,headerShown:false }} />
            <Tab.Screen name="Activity" component={AboutScreen} options={{tabBarIcon:({size,color})=><Avatar size={60} rounded icon={{ name: 'heart', type: 'font-awesome',color:color }}/>,tabBarShowLabel:false,headerShown:false }} />
            <Tab.Screen name="Account" component={AccountScreen} options={{tabBarIcon:({size,color})=><Avatar size={40} rounded source={{uri:'https://randomuser.me/api/portraits/men/36.jpg'}}/>,tabBarShowLabel:false,headerShown:false }} /> 

        </Tab.Navigator>
    )
}
 const BottomTabs = ()=> {
  return (
    <NavigationContainer>
        <MainNavigation/>
    </NavigationContainer>
  );
}

export default BottomTabs