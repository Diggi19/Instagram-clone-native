import React from 'react'
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native'
import Header from '../components/Header'
import Posts from '../components/Posts'
// import Stories from '../components/Stories'
// import CreateHeader from '../repeated/NewPost/CreateHeader'
// import ImagePickerComponent from '../repeated/NewPost/ImagePickerComponent'
// import ImagePicker from '../repeated/NewPost/ImagePickerComponent'
// import PostButtons from '../repeated/post/PostButtons'
// import PostFooter from '../repeated/post/PostFooter'
// import PostHeader from '../repeated/post/PostHeader'
// import PostImage from '../repeated/post/PostImage'
// import SinglePost from '../repeated/SinglePost'
// import StoryDesign from '../repeated/StoryDesign'
// import TextFieldCustom from '../repeated/TextFieldCustom'
import { db } from '../../Firebase'
import { addDoc, collectionGroup, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { Button } from 'react-native'
import BottomNav from '../components/BottomNav'



const HomeScreen = () => {
    const[posts,setposts] = React.useState(null)
    const getPosts = async()=>{
        const collectionGroupRef = collectionGroup(db,'posts')
        const queryRef = query(collectionGroupRef,orderBy('createdAt','desc'))
        const postData = await onSnapshot(queryRef,(snapshot)=> setposts(snapshot.docs.map(doc => doc.data())))
        // const data = postData.docs.map(posts=>posts.data())
        //  console.log(data) 
        // return setposts(data)
    }

    const handlePost =async()=>{
        const collectionGroupRef = collectionGroup(db,'posts')
        const addPost = await addDoc(collectionGroupRef,{caption:'test data fire'})        
    }
    React.useEffect(()=>{
        getPosts()
    },[])


    return (
        <View style={styles.container}>
            {/* header */}
            <Header/>
                {/* <Button title='set data' onPress={handlePost}/> */}
            {/* scroll stories */}
             {/* <Stories/> */}
             <Posts posts={posts}/>
             {/* <ImagePickerComponent/> */}
            {/* post */}
            {/* <SinglePost/> */}
            {/* main body */}
            {/* tab navigators */}
            <BottomNav/>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'black',

    },
})

export default HomeScreen
