import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import StoryDesign from '../repeated/StoryDesign.js'
import data from '../Screens/Testdata/data.js'
const Stories = () => {
    return (
        <View style={styles.container}>
            <FlatList
                horizontal
                data={data}
                keyExtractor={user => user.id.toString()}
                renderItem={user =><StoryDesign isActive={user.item.isActive} name={user.item.name} imageurl={user.item.imagurl}/> }
            
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginLeft:10,
        paddingBottom:5
    },
})

export default Stories

