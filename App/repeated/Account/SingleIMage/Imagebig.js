import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const Imagebig = ({image}) => {
    return (
        <View style={styles.container}>
            <Image source={{uri:image}} style={{width:'100%',height:'100%'}} resizeMode='cover'/>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        alignSelf:'center',
        width:"98%",
        height:300,
    },
})

export default Imagebig
