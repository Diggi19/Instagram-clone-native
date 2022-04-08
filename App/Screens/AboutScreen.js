import React from 'react'
import { View, Text } from 'react-native'
import BottomNav from '../components/BottomNav'

const AboutScreen = () => {
    return (
        <View style={{flex:1}}>
            <Text style={{color:'black'}}>about screen</Text>
                <BottomNav/>           
        </View>
    )
}

export default AboutScreen
