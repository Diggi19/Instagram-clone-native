import React from 'react'
import { View, Text, StyleSheet, Image, Button } from 'react-native'

const ImagePickerComponent = () => {
     // states
     const[selectedimage,setselectedimage]=React.useState(null)
     //functions
     const getLibrarypermisiion = async()=>{
         const result = await ImagePicker.getCameraPermissionsAsync()
         if (result.granted) {
             console.log('permisiion granted ')
         }else{
             console.log('permisiion not granted')
         }
     }
     
     // getting image
     const getImage = async()=>{
         const result = await ImagePicker.launchImageLibraryAsync({
             mediaTypes:ImagePicker.MediaTypeOptions.Images,
             allowsEditing:false,
             aspect:[4,3],
             quality:0.5,
 
         })
         if (!result.cancelled) {
             console.log(result)
             setselectedimage(result.uri)
         }else{
             console.log('selection was cancelled')
         }
     }
 
     // removing image 
     const removeImage=()=>{
         if (selectedimage) {
             setselectedimage(null)
         }
     }
 
     React.useEffect(()=>{
         getLibrarypermisiion()
     },[])
 
    return (
        <View style={{flex:1,justifyContent:'center'}}>
        <View style={{width:200,height:100,alignSelf:'center',justifyContent:'center'}}>
            {selectedimage ? <Button title='remove image' onPress={removeImage}/>:<Button title='select image' onPress={getImage}/>}
            
        </View>
            {selectedimage && <Image source={{uri:selectedimage}}  style={{width:200,height:200,alignSelf:'center'}} />}
    </View>

    )
}



export default ImagePickerComponent
