import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from '@react-navigation/native'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../Firebase'

const CameraScreen = () => {
  const navigation = useNavigation()
    const openCamera = async()=>{
        const cameraPermisiion = await ImagePicker.getCameraPermissionsAsync()
        if (!cameraPermisiion.granted) return await ImagePicker.requestCameraPermissionsAsync({
          mediaTypes:ImagePicker.MediaTypeOptions.Images,
          allowsEditing:false,
          aspect:[4,3],
          quality:0.5,
        })

        const result = await ImagePicker.launchCameraAsync()

        if(result.cancelled) return navigation.navigate('HomeScreen')

            const image = result.uri
            const storageRef = ref(storage,'image.jpg')

            const imageurl = await fetch(image)
            const bytes = await imageurl.blob()

            const uploadTask = await uploadBytesResumable(storageRef,bytes)
                .on(
                    'state_changed',
                    (snapshot)=>console.log('image uploaded'),
                    (err)=>console.log(err),
                    async()=>{
                        const downloadedUrl = await getDownloadURL(storageRef)
                        console.log(downloadedUrl)
                        navigation.navigate('CameraPost',{imageurl:downloadedUrl})

                      }
                )



    }
    React.useEffect(()=>{
      openCamera()
    },[])

  return (
    <View>
      <Text>CameraScreen</Text>
    </View>
  )
}

export default CameraScreen

const styles = StyleSheet.create({})