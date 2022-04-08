import { collectionGroup, getDocs } from 'firebase/firestore'
import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { db } from '../../Firebase'
import SinglePost from '../repeated/SinglePost'
import data from '../Screens/Testdata/data'
import Stories from './Stories'

const Posts = ({posts}) => {
    return (
        <View style={styles.container}>
            <Stories/>
            {/* {console.log('posts in postholder',posts)} */}
            <FlatList
                style={{marginTop:-50}}
                data={posts}
                keyExtractor={post => post.id.toString()}
                renderItem={post=><SinglePost post={post}/>}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:520,
    },
})

export default Posts
