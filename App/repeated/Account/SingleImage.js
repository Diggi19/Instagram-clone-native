import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../../../Firebase'

const SingleImage = ({post}) => {
  const navigation = useNavigation()
  const currentUser = auth.currentUser.email
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('ImagebigScreen',{post})} style={{width:115,height:125,margin:2,borderWidth:.3,borderColor:'black'}}>
      <Image style={{width:'100%',height:'100%'}} source={{uri:post.imageurl}} resizeMode="cover"/>
    </TouchableOpacity>
  )
}

export default SingleImage

