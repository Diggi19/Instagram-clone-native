import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Icons from '../Icons'

const ExpImageHeader = ({item}) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageholder}>
                <Image source={{uri:item.profile_pic}} style={styles.image}/>
                <Text style={styles.text}>{item.username}</Text>
            </View>
            <View style={{marginRight:5}}>
                <Icons name='ellipsis-horizontal' size={20} color="white" onPressed={()=>console.log('edit menu')} w/>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:55,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:2,
        backgroundColor:'black'
    },
    imageholder:{
        width:120,
        height:30,
        marginLeft:15,
        flexDirection:'row',
        alignItems:'center'
    },
    image:{
        width:30,
        height:30,
        borderRadius:50,
        borderWidth:2,
        borderColor:'orange'
    },
    text:{
        marginLeft:5,
        color:'white',
        fontWeight:'bold'
    },

})

export default ExpImageHeader
