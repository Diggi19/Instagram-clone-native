import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
// import { Divider } from 'react-native-elements'
import PostFooter from './post/PostFooter'
import PostHeader from './post/PostHeader'
import PostImage from './post/PostImage'

const SinglePost = ({post}) => {

    return (
        <View style={styles.container}>
            {/* {console.log(post)} */}
            {/* <Divider width={1} orientation='vertical'/> */}
             <PostHeader {...post}/>
             <PostImage {...post}/>
             <PostFooter {...post}/>
            {/* user */}
            {/* image */}
            {/* buttons */}
            {/* caption */}
            {/* comments */}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:460,
        marginTop:45,
    },
})

export default SinglePost
