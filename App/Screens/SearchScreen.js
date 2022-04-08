import { Modal, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import BottomNav from '../components/BottomNav'
import SingleImage from '../repeated/Account/SingleImage'
import ExpSingleImage from '../repeated/explore/ExpSingleImage'
import SingleSearchedUser from '../repeated/search/SingleSearchedUser'
import { collectionGroup, onSnapshot, orderBy, query, collection, where } from 'firebase/firestore'
import { db, auth } from '../../Firebase'

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

const users =[
    {
        name:'darren matt',
        username:"darren_the_sloth",
        imageurl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUUFatxqoDWeGvuchFm6VKIa4aJfxnVYoMqw&usqp=CAU"       
    },
    {
        name:'barry alan',
        username:"flash_99",
        imageurl:"https://i.pinimg.com/236x/35/70/ee/3570ee066f4a61489adf8103944af199--michael-b-jordan-girlfriend-michael-jordan.jpg"       
       
    },
    {
        name:'daniel peterson',
        username:"dan_45",
        imageurl:"https://i.pinimg.com/236x/63/8b/1e/638b1e3d2b02dd891fc8e12fb433b83e--jay-baruchel-beautiful-men.jpg"       
       
    },
    {
        name:'susan carry',
        username:"sus_carry",
        imageurl:"https://i.imgur.com/tI91jvt.jpg"       
       
    },
    {
        name:'megan frost',
        username:"miss_forsty",
        imageurl:"https://data.whicdn.com/images/358833015/original.jpg"       
       
    }




]


const SearchScreen = () => {
    const currentUser = auth.currentUser.email
    const[showSearches,setshowSearches] = React.useState(false)
    const[searchedUser,setsearchedUser] = React.useState("")
    const[allUsers,setallUsers] = React.useState([])
    const[userData,setuserData] = React.useState()
    const[allPosts,setallPosts] = React.useState([])

    const getPosts = async()=>{
        const collectionGroupRef = collectionGroup(db,'posts')
        const queryRef = query(collectionGroupRef,orderBy('createdAt','desc'))
        const postData = await onSnapshot(queryRef,(snapshot)=> setallPosts(snapshot.docs.map(doc => doc.data())))
    }
    const getUsers = async()=>{
        const collectionRef = collection(db,'users')
        const queryRef = query(collectionRef,where("email","!=",currentUser))
        const data = onSnapshot(queryRef,(snapshot)=>setallUsers(snapshot.docs.map((user)=>user.data())))
    }
    React.useEffect(()=>{
        getPosts()
        getUsers()
        if (searchedUser.length > 0) {
            setshowSearches(true)
            const filterData = allUsers.filter((user)=>user.email.toLowerCase().includes(searchedUser.toLocaleLowerCase()) || user.username.toLowerCase().includes(searchedUser.toLowerCase()))
            setuserData(filterData)
        }else{
            setshowSearches(false)
        }


    },[searchedUser])
  return (
    <View style={styles.container}>

        <ScrollView style={{width:'100%',height:200,backgroundColor:'black'}}>
        <View style={{width:'100%',height:70,backgroundColor:'black',justifyContent:'center'}}>
            <View style={{width:'90%',height:30,borderColor:'grey',borderWidth:2,alignSelf:'center',borderRadius:20}}>
                <TextInput 
                    value={searchedUser}
                    onChangeText={setsearchedUser}
                    style={{width:'90%',alignSelf:'center',color:'white'}}
                    placeholderTextColor={'white'}
                    placeholder='Search'
                    
                />
            </View>
        </View>
            {showSearches ?
                <View style={{width:'100%',height:490,backgroundColor:'black'}}>
                    <ScrollView>
                        {userData.map((user,index)=><SingleSearchedUser followers={user.followers} following={user.following} imageurl={user.profile_pic} email={user.email} username={user.username} key={index} />)}
                    </ScrollView>
                </View>
                :
                <View style={{flex:2,flexDirection:'row',flexWrap:'wrap'}}>
                    {allPosts.map((post,index)=><ExpSingleImage key={index} post={post}/>)}
                </View>
                
            }

        </ScrollView>
        <View style={{width:'100%',height:55}}></View>


      <BottomNav/>
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'black'
    },
})