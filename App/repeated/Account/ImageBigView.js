import { Platform, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomNav from '../../components/BottomNav'
import ImageHeader from './SingleIMage/ImageHeader'
import ComponentHeader from './SingleIMage/ComponentHeader'
import Imagebig from './SingleIMage/Imagebig'
import Imagebutton from './SingleIMage/Imagebutton'
import Imagefooter from './SingleIMage/Imagefooter'
import { useRoute } from '@react-navigation/native'

const ImageBigView = () => {

  const routes = useRoute().params
  console.log(routes)
  return (
    <View style={styles.container}>
      <ComponentHeader post={routes.post}/>
      <View style={{width:'100%',height:520,backgroundColor:'black'}}>
        <ScrollView>
          <ImageHeader item={routes.post}/>
          <Imagebig image={routes.post.imageurl}/>
          <Imagebutton item={routes.post}/>
          <Imagefooter item={routes.post}/>
        </ScrollView>
      </View>
          <BottomNav/>
    </View>
  )
}

export default ImageBigView

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'black'
  },
})