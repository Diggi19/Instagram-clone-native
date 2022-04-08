import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import colorpallot from '../colors/colorpallot'

const StoryDesign = ({isActive,name,imageurl}) => {
    
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>console.log('story pressed')} style={styles.imgcontainer}>
                <Image source={{uri:imageurl}} style={[styles.avataimag,{borderColor: isActive ? 'orange':'grey',}]} resizeMode='cover'/>
            </TouchableOpacity>
            <Text style={styles.text}>{
                name.length > 11 ? name.slice(0,10).toLowerCase()+ '...':name.toLowerCase()
            }</Text>
            {/* avatar image */}
            {/* avatar name */}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:70,
        height:140,
        maxWidth:100,
        marginRight:10,
        marginLeft:10,
        marginTop:15,
    },
    imgcontainer:{
        width:'100%',
        height:'50%'
    },
    avataimag:{
        width:'100%',
        height:'100%',
        borderRadius:50,
        borderWidth:2
    },
    text:{
        color:'white',
        textAlign:'center',
        marginTop:5,
        fontSize:12
        
    },
})

export default StoryDesign
