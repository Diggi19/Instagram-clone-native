import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../../../Firebase';

const ComponentHeader = ({post}) => {
    const navigation = useNavigation()
    const currentUser = auth.currentUser.email
  return (
      <>
    <View style={{backgroundColor:'black',width:'100%',height:50,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
      <TouchableOpacity style={{marginLeft:10}} onPress={()=>navigation.navigate(post.email === currentUser?"AccountScreen":"ExploreScreen")}>
        <Ionicons name="arrow-back-outline" size={30} color="white" />
      </TouchableOpacity>
      <Text style={{width:200,fontSize:20,color:'white'}}>Post</Text>
    </View>
    <View style={{backgroundColor:'grey',width:'100%',height:1,opacity:.6}}></View>
    </>
  )
}

export default ComponentHeader

const styles = StyleSheet.create({})