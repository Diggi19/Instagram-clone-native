import { useNavigation, useRoute } from '@react-navigation/native'
import { signOut } from 'firebase/auth'
import React from 'react'
import { View, Text, StyleSheet, Button, ScrollView, Image, TouchableOpacity } from 'react-native'
import { auth, db } from '../../Firebase'
import BottomNav from '../components/BottomNav'
import SingleImage from '../repeated/Account/SingleImage'
import SocialSingle from '../repeated/Account/SocialSingle'
import { Ionicons } from '@expo/vector-icons'; 
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore'


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

const OtherUserScreen = () => {
    const currentUser = auth.currentUser.email
    const[isFollowing,setisFollowing]= React.useState(false)
    const [otherUserData,setotherUserData] = React.useState([])
    const [posts,setposts] = React.useState([])
    const routes = useRoute().params
    console.log(routes)
    const navigation = useNavigation()
    console.log(routes)

    const getUserData=async()=>{
        const collectionRef = collection(db,'users')
        const docRef = doc(collectionRef,routes.email)
        const userData = await onSnapshot(docRef,(snapshot)=>setotherUserData(snapshot.data()))
    }
    const getPostData = async()=>{
        // getting signed user info
        const subcollectionRef = collection(db,'users',routes.email,'posts')
        const posts =  await onSnapshot(subcollectionRef,(snapshot)=>setposts(snapshot.docs.map((post)=>post.data())))
    }

    const handleFollow =async()=>{
        const{followers} = otherUserData
        const isFollowing = followers.filter((follower)=>follower.includes(currentUser))
        console.log(isFollowing)
        if (!isFollowing.length > 0) {
            const collectionRef = collection(db,'users')
            const docRef = doc(collectionRef,routes.email)
            const updatedFollowers = [...followers,currentUser]

            const update = await updateDoc(docRef,{
                ...otherUserData,
                followers:updatedFollowers
            })
        }
        setisFollowing(true)


    }
    
    const handleUnfollow = async()=>{
        const{followers} = otherUserData
        const isFollowing = followers.filter((follower)=>follower.includes(currentUser))
        console.log(isFollowing)
        if (isFollowing.length > 0) {
            const collectionRef = collection(db,'users')
            const docRef = doc(collectionRef,routes.email)
            const updatedFollowers = followers.filter((user)=>user !== currentUser)

            const update = await updateDoc(docRef,{
                ...otherUserData,
                followers:updatedFollowers
            })
        }
        setisFollowing(false)

    }

    const checkFollow = ()=>{
        const{followers} = routes
        const isFollowing = followers.filter((follower)=>follower.includes(currentUser))
        if (isFollowing.length > 0) {
            setisFollowing(true)
        }
        else{
            setisFollowing(false)
        }

    }
    React.useEffect(()=>{
        getPostData()
        getUserData()
        checkFollow()
    },[])
    return (
        <View style={{flex:1,backgroundColor:'black'}}>
            <View style={{width:'100%',height:300,backgroundColor:'black'}}>
                {/* profile */}
                <View style={{width:'100%',height:55,backgroundColor:'black',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <TouchableOpacity style={{marginLeft:10}} onPress={()=>navigation.navigate('ExploreScreen')}>
                        <Ionicons name="arrow-back-outline" size={30} color="white" />
                    </TouchableOpacity>
                    <View style={{width:220,marginRight:70,alignItems:'center',backgroundColor:'black'}}>
                        <Text style={{color:'white',fontSize:20}}>{routes.username}</Text>
                    </View>

                </View>
                <View style={{width:'100%',height:1,backgroundColor:'grey',opacity:.6,marginBottom:10}}></View>
                <View style={styles.imagehold}>
                    <Image source={{uri:routes.imageurl}} style={{width:95,height:95,borderRadius:50,marginLeft:20,borderWidth:1.5,borderColor:'orange'}}/>
                    
                    <View style={{width:240,height:'100%',backgroundColor:'black',marginRight:-10,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white',fontSize:28}}>{routes.username}</Text>

                        {isFollowing?
                            <TouchableOpacity onPress={handleUnfollow} style={{width:170,height:30,marginTop:10,borderRadius:5,backgroundColor:'#434444',borderWidth:.7,borderColor:'white',justifyContent:'center',alignItems:'center'}}>
                                <Text style={{color:'white',fontWeight:'bold'}}>Following</Text>
                            </TouchableOpacity>
                        :
                            <TouchableOpacity onPress={handleFollow} style={{width:170,height:30,marginTop:10,borderRadius:5,backgroundColor:'#0866d6',borderWidth:.7,borderColor:'#0866d6',justifyContent:'center',alignItems:'center'}}>
                                <Text style={{color:'white',fontWeight:'bold'}}>Follow</Text>
                            </TouchableOpacity>

                        }
                    </View>
                </View>

                {/* name & bio */}
                <View style={{width:'100%',height:65,backgroundColor:'black',marginTop:5}}>
                    <Text style={{color:'white',marginLeft:20,fontWeight:'bold',fontSize:17}}>{routes.email}</Text>
                    <Text style={{color:'white',marginLeft:20,width:260,fontSize:15}}>im an odd combination on really sweet and dont mess with me .... 😀</Text>
                </View>

                {/* followers */}
                <View style={styles.socialtab}>
                    <SocialSingle num={posts.length} title="Posts"/>
                    <SocialSingle num={routes.followers.length} title="Followers"/>
                    <SocialSingle num={routes.following.length} title="Following"/>

                </View>
            </View>
            <ScrollView style={{width:'100%',height:200,backgroundColor:'black'}}>
                <View style={{flex:2,flexDirection:'row',flexWrap:'wrap'}}>
                    {posts.map((post,index)=><SingleImage key={index} post={post}/>)}

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

export default OtherUserScreen
