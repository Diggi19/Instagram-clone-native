import { View, Text } from 'react-native'
import React from 'react'

const SocialSingle = ({num,title}) => {
  return (
    <View style={{width:80,height:50,justifyContent:'center',alignItems:'center',backgroundColor:'black'}}>
      <Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>{num}</Text>
      <Text style={{color:'white',fontSize:17}}>{title}</Text>
    </View>
  )
}

export default SocialSingle