import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const ExpComponentHeader = () => {
    const navigation = useNavigation()
  return (
      <>
    <View style={{backgroundColor:'black',width:'100%',height:50,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
      <TouchableOpacity style={{marginLeft:10}} onPress={()=>navigation.navigate('ExploreScreen')}>
        <Ionicons name="arrow-back-outline" size={30} color="white" />
      </TouchableOpacity>
      <Text style={{width:200,fontSize:20,color:'white'}}>Explore</Text>
    </View>
    <View style={{backgroundColor:'grey',width:'100%',height:1,opacity:.6}}></View>
    </>
  )
}

export default ExpComponentHeader

const styles = StyleSheet.create({})