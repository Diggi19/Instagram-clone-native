import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icons from '../Icons'

const CreateHeader = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{width:'20%',marginLeft:10}} onPress={()=>console.log('back arrow pressed')}>
                <Icons name="arrow-back" size={30} color="white" onPressed={()=>navigation.navigate('HomeScreen')} />
            </TouchableOpacity>
            <View style={{width:'70%'}}>
                <Text style={{color:'white',marginLeft:50,fontSize:19,fontWeight:'bold'}}>New Post</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:45,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        marginTop:10
    },
})

export default CreateHeader
