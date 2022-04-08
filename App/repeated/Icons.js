import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const Icons = ({name,size,color,onPressed}) => {
    return (
        <TouchableOpacity onPress={onPressed}>
            <Ionicons style={styles.Icons} name={name}  color={color} size={size}   />
        </TouchableOpacity>
        
    )
}
const styles = StyleSheet.create({
    Icons:{
        marginLeft:3,
        marginRight:3,
    }
})


export default Icons
