import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const demoProfile = 'https://www.google.com/search?q=random+user+profile+image&rlz=1C1UEAD_enIN965IN965&sxsrf=APq-WBvM5HtmMi5yJ-yd6UDlWfNra18z4Q:1646154599501&tbm=isch&source=iu&ictx=1&vet=1&fir=jEKGSUnCsU7zhM%252CbPlUbqqnEn6BTM%252C_%253B-MDL8yZl08DHlM%252C0kQOENfh8kv4_M%252C_%253B6bjEyVOADGlzmM%252CZR2FfF-3J0OZlM%252C_%253BeLflL_DUNKZY6M%252CcosjgdRCuqM-6M%252C_%253BWI4CgeoVrZccjM%252CcosjgdRCuqM-6M%252C_%253BCONZLy91yfi2QM%252Cp95q2I8iq6zoiM%252C_%253BKHGt2viSD-Vz3M%252CY5N9fwROZIZ_JM%252C_%253B5k038ZDUyLGI2M%252CcosjgdRCuqM-6M%252C_%253B6CZlqMt4JR5i6M%252C6qCAYQzG2MW_wM%252C_%253BxYjyTlr15pGKoM%252CFchqJbDFLfnj0M%252C_&usg=AI4_-kSnmo1oKmxsmsltB6A3CLIjiythQg&sa=X&ved=2ahUKEwj67Zfhs6X2AhVRmuYKHSAfAngQ9QF6BAgUEAE#imgrc=eLflL_DUNKZY6M'
const SingleSearchedUser = ({email,username,imageurl,following,followers}) => {
    const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('OtherUserScreen',{email,username,imageurl,followers,following})} style={{width:'93%',flexDirection:'row',alignItems:'center',height:50,backgroundColor:'black',alignSelf:'center',marginTop:10,marginBottom:10}}>
      <Image source={{uri:imageurl}} style={{width:45,height:45,borderRadius:50,borderWidth:2,borderColor:'orange',marginLeft:10}}/>
      <View>
        <Text style={{fontSize:17,color:'white',fontWeight:'bold',marginLeft:15}}>{username}</Text>
        <Text style={{fontSize:15,color:'grey',fontWeight:'bold',marginLeft:15}}>{email}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default SingleSearchedUser

const styles = StyleSheet.create({})