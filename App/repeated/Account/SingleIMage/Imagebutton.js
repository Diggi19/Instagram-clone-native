import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icons from '../../Icons'

import { auth, db, } from '../../../../Firebase'
import { arrayUnion, collection, collectionGroup, doc, FieldValue, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'



const Imagebutton = ({item}) => {
    console.log('😁',item)
    const[like,setlike]=React.useState(false)
    const[bookmark,setbookmark]=React.useState(false)

    const [currentuser,setcurrentuser] = React.useState(null)
    const [currentuserData,setcurrentuserData] = React.useState({})
    

    const handleLikes= async(clickedPost)=>{
        // getting user
        const user = await auth.currentUser
        const userEmail = user.email
        setcurrentuser(userEmail)
        // console.log(userEmail)
        
        // getting the specific post
        const collectionGroupRef = collectionGroup(db,'posts')
        // const docRef = doc(collectionRef,userEmail)
        const userData = await getDocs(collectionGroupRef)
        const data = userData.docs.find(doc=>doc.id === clickedPost)
        const singlePost = data.data()
        const {liked_by_users,email}=singlePost
        console.log(liked_by_users,email)
        
        // const checkUser = liked_by_users.filter(user=> user === userEmail)

        // if (checkUser) {
        //     const newLikes = liked_by_users.filter(likes=>likes !== userEmail)
        //     console.log(newLikes)
        //     const CreatorSubcolref = collection(db,'users',email,'posts')
        //     const creatorDoc = doc(CreatorSubcolref,clickedPost)
        //     const updatePost = await updateDoc(creatorDoc,{...singlePost,liked_by_users:[...newLikes]})
        //     setlike(false)
    
        // }
            // updating post(adding user's email who likes to likes field)
            const CreatorSubcolref = collection(db,'users',email,'posts')
            const creatorDoc = doc(CreatorSubcolref,clickedPost)
            const updatePost = await updateDoc(creatorDoc,{...singlePost,liked_by_users:[...liked_by_users,userEmail]})
            setlike(true)
                
    }

    const handleDisLikes = async(clickedPost)=>{
        // getting user
        const user = await auth.currentUser
        const userEmail = user.email
        setcurrentuser(userEmail)
        // console.log(userEmail)
        
        // getting the specific post
        const collectionGroupRef = collectionGroup(db,'posts')
        // const docRef = doc(collectionRef,userEmail)
        const userData = await getDocs(collectionGroupRef)
        const data = userData.docs.find(doc=>doc.id === clickedPost)
        const singlePost = data.data()
        const {liked_by_users,email}=singlePost
        console.log(liked_by_users,email)
        
        const checkUser = liked_by_users.filter(user=> user === userEmail)

        if (checkUser) {
            const newLikes = liked_by_users.filter(likes=>likes !== userEmail)
            console.log(newLikes)
            const CreatorSubcolref = collection(db,'users',email,'posts')
            const creatorDoc = doc(CreatorSubcolref,clickedPost)
            const updatePost = await updateDoc(creatorDoc,{...singlePost,liked_by_users:[...newLikes]})
            setlike(false)
    
        }
    }

    const checkIfLiked = async(currentPost)=>{
        // getting user
        const user = await auth.currentUser
        const userEmail = user.email
        setcurrentuser(userEmail)
        // console.log(userEmail)
        
        // getting the specific post
        const collectionGroupRef = collectionGroup(db,'posts')
        // const docRef = doc(collectionRef,userEmail)
        const userData = await getDocs(collectionGroupRef)
        const data = userData.docs.find(doc=>doc.id === currentPost)
        const singlePost = data.data()
        const {liked_by_users,email}=singlePost
        // console.log(liked_by_users,email)
        
        const checkUser = liked_by_users.filter(user=> user === userEmail)
        if (!checkUser) return setlike(false)
        setlike(true)
    }

    // const handleLikes = async()=>{
    //     const filteredData = currentuserData.filter(single=>single.id === 'JAhWEahBpbtPJXqoKFe1')
    //     console.log('singled data',filteredData)
    // }

    React.useEffect(()=>{
        
        checkIfLiked(item.id)        
        
    },[])

    return (
        <View style={styles.container}>
            <View style={styles.leftbtn}>
                {/* like and unlike heart */}
                {like?
                    <Icons name="ios-heart-sharp" size={35} color="red" onPressed={()=>{handleDisLikes(item.id)}}/>
                    :
                    <Icons name="ios-heart-outline" size={35} color="white" onPressed={()=>{handleLikes(item.id)}}/> 
                }
                <Icons name="chatbubble-outline" size={30} color="white"/>
                <Icons name="ios-arrow-redo-outline" size={30} color="white"/>
            </View>
            <View>
                {bookmark?
                    <Icons name="bookmark" size={30} color="white" onPressed={()=>setbookmark(!bookmark)}/>
                    :
                    <Icons name="bookmark-outline" size={30} color="white" onPressed={()=>setbookmark(!bookmark)}/> 
                }
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        width:'98%',
        height:35,
        alignSelf:'center',
        marginTop:5,
        flexDirection:'row',
        justifyContent:'space-between',

    },
    leftbtn:{
        flexDirection:'row'
    },

})

export default Imagebutton
