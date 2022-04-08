import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

const BottomNav = () => {
    const navigation = useNavigation()
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={()=>navigation.navigate('HomeScreen')}>
            <Avatar size={60} rounded icon={{ name: 'home', type: 'font-awesome',color:'grey' }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('ExploreScreen')}>
            <Avatar size={60} rounded icon={{ name: 'search', type: 'font-awesome',color:'grey' }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('CameraScreen')}>
            <Avatar size={60} rounded icon={{ name: 'camera', type: 'font-awesome',color:'grey' }} />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('AboutScreen')}>
            <Avatar size={60} rounded icon={{ name: 'heart', type: 'font-awesome',color:'grey' }} />
        </TouchableOpacity>

        <TouchableOpacity style={{marginRight:10}}  onPress={()=>navigation.navigate('AccountScreen')}>
            <Avatar size={40} rounded source={{uri:'https://randomuser.me/api/portraits/men/36.jpg'}}/>        
        </TouchableOpacity>


    </View>
  )
}

export default BottomNav

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:50,
        backgroundColor:'black',
        position:'absolute',
        bottom:0,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
        
    },
})