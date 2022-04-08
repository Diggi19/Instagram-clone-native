import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ExpSingleImage = ({post}) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={()=>navigation.navigate('ExpImagebigScreen',{post})} style={{width:115,height:125,margin:2,borderWidth:.3,borderColor:'black'}}>
      <Image style={{width:'100%',height:'100%'}} source={{uri:post.imageurl}} resizeMode="cover"/>
    </TouchableOpacity>
  )
}

export default ExpSingleImage

