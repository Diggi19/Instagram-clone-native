import { signOut } from 'firebase/auth'
import React from 'react'
import { View, Text, StyleSheet, Button, ScrollView, Image, TouchableOpacity } from 'react-native'
import { auth, db } from '../../Firebase'
import BottomNav from '../components/BottomNav'
import SingleImage from '../repeated/Account/SingleImage'
import SocialSingle from '../repeated/Account/SocialSingle'
import {collection, doc, getDoc, onSnapshot }from 'firebase/firestore'


const data= [
    'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
    'https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg',
    'https://static.remove.bg/remove-bg-web/59c96072ccf69a79c0e6dd85a2eac05ceb4d0784/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwGPF8X5lgcLBtUZUXV9kPPpfw7IuIsTq3uQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCosNE8U8r4l6IY0NHJ7icaHynM8gFLQimNg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRY2YhMsJluE4eJFwPBIZu9k12vyBc7mRrnw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQth7v47XK4MOuhBXs_7EImedLuT7xrMQoj6A&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQemg7msChO4HoNNAwC3kpO3BsK5YPRWUu0mg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR09dxNQVHENTIJ8NTiuG2IPStxE7mMobsGUQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWWViHzSwILuBB0Ji7laKHaaIaA0uYF8KkAg&usqp=CAU',
]

const AccountScreen = () => {
    const currentUser = auth.currentUser.email
    const person = auth.currentUser.displayName
    const[userPosts,setuserPosts] = React.useState([])
    const[userData,setuserData] = React.useState([])

    const getData = async()=>{
        // getting signed user info
        const collectionRef = collection(db,"users")
        const docRef = doc(collectionRef,currentUser)
        const userData = await getDoc(docRef)
        setuserData(userData.data())
        const subcollectionRef = collection(db,'users',currentUser,'posts')
        const posts =  await onSnapshot(subcollectionRef,(snapshot)=>setuserPosts(snapshot.docs.map((post)=>post.data())))
    }

    React.useEffect(()=>{
        getData()
    },[])
    return (
        <View style={{flex:1,backgroundColor:'black'}}>
            <View style={{width:'100%',height:260,backgroundColor:'black'}}>
                {/* profile */}
                <View style={{width:'100%',height:30,backgroundColor:'black'}}></View>
                <View style={styles.imagehold}>
                    <Image source={{uri:userData.profile_pic}} style={{width:95,height:95,borderRadius:50,marginLeft:20,borderWidth:1.5,borderColor:'orange'}}/>
                    
                    <View style={{width:240,height:'100%',backgroundColor:'black',marginRight:-17,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white',fontSize:28}}>{userData.username}</Text>
                        <TouchableOpacity style={{width:140,height:30,marginTop:10,borderRadius:5,borderWidth:.7,borderColor:'white',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'white',fontWeight:'200'}}>Edit profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* name & bio */}
                <View style={{width:'100%',height:65,backgroundColor:'black',marginTop:5}}>
                    <Text style={{color:'white',marginLeft:20,fontWeight:'bold',fontSize:17}}>{userData.email}</Text>
                    <Text style={{color:'white',marginLeft:20,width:260,fontSize:15}}>im an odd combination on really sweet and dont mess with me .... 😀</Text>
                </View>

                {/* followers */}
                <View style={styles.socialtab}>
                    <SocialSingle num={userPosts.length} title="Posts"/>
                    <SocialSingle num={128} title="Followers"/>
                    <SocialSingle num={17} title="Following"/>

                </View>
            </View>
            <ScrollView style={{width:'100%',height:200,backgroundColor:'black'}}>
                <View style={{flex:2,flexDirection:'row',flexWrap:'wrap'}}>
                    {userPosts.map((post,index)=><SingleImage key={index} post={post}/>)}

                </View>
            </ScrollView>
            <View style={{width:'100%',height:50}}></View>
            <BottomNav/>
        </View>
    )
}


const styles = StyleSheet.create({
    conatiner:{
        flex:1,
        flexWrap:'wrap',
        flexDirection:'row'
        // justifyContent:'center',
    },
    imagehold:{
        width:'100%',
        height:100,
        backgroundColor:'black',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    socialtab:{
        width:'100%',
        height:60,
        borderColor:'grey',
        borderTopWidth:.5,
        borderBottomWidth:.5,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
})

export default AccountScreen
