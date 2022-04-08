import { Platform, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomNav from '../../components/BottomNav'
import ExpImageHeader from './ExpImageHeader'
import ExpImageBig from './ExpImageBig'
import ExpImageButton from './ExpImageButton'
import ExpImageFooter from './ExpImageFooter'
import ExpComponentHeader from './ExpComponentHeader'
import { useRoute } from '@react-navigation/native'

const ExpImageMain = () => {

  const routes = useRoute().params
  console.log(routes)
  return (
    <View style={styles.container}>
      <ExpComponentHeader/>
      <View style={{width:'100%',height:520,backgroundColor:'black'}}>
        <ScrollView>
          <ExpImageHeader item={routes.post}/>
          <ExpImageBig post={routes.post}/>
          <ExpImageButton item={routes.post}/>
          <ExpImageFooter item={routes.post}/>
        </ScrollView>
      </View>
          <BottomNav/>
    </View>
  )
}

export default ExpImageMain

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'black'
  },
})