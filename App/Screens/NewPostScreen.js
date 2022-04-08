import React from 'react'
import { View, Text, StyleSheet, Image, TextInput, Button, TouchableOpacity } from 'react-native'
import { Divider } from 'react-native-elements'
import CreateHeader from '../repeated/NewPost/CreateHeader'
import * as Yup from 'yup'
import { Formik, useFormikContext } from 'formik';
import colorpallot from '../colors/colorpallot'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from '@react-navigation/native'
import validUri from 'valid-url'  // this helps to tackel problems regarding invalid image uri

// firebase
import { auth, db, storage } from '../../Firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'


// main 
const defaultImage = 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
const validationSchema = Yup.object().shape({
    caption:Yup.string().max(20,"you have exceded the limit"),
})



const NewPostScreen = () => {
    const [selctedImage,setselctedImage]=React.useState(null)
    
    // managing current user
    const [currentuser,setcurrentuser] = React.useState(null)
    const [currentuserData,setcurrentuserData] = React.useState({})
    

    const getCurrentUserData= async()=>{
        const user = await auth.currentUser
        const userEmail = user.email
        setcurrentuser(userEmail)
        console.log(userEmail)
        const collectionRef = collection(db,'users')
        const docRef = doc(collectionRef,userEmail)
        const userData = await getDoc(docRef)
        const data = {...userData.data()}
        console.log('logged users data',data)
        setcurrentuserData(data)
    }
    /////////////////////////////////////////////////


    const navigation = useNavigation()
    const getLibrarypermisiion = async()=>{
        const result = await ImagePicker.getCameraPermissionsAsync()
        if (result.granted) {
            console.log('permisiion granted ')
        }else{
            console.log('permisiion not granted')
        }
    }
    
    // getting image
    const getImage = async()=>{
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:false,
            aspect:[4,3],
            quality:0.5,

        })
        if (!result.cancelled) {
            console.log(result)
            
            const image = result.uri
            const storageRef = ref(storage,'image.jpg')

            const imageurl = await fetch(image)
            const bytes = await imageurl.blob()

            const uploadTask = await uploadBytesResumable(storageRef,bytes)
                .on(
                    'state_changed',
                    (snapshot)=>console.log('image uploaded'),
                    (err)=>console.log(err),
                    async()=>{
                        const downloadedUrl = await getDownloadURL(storageRef)
                        console.log(downloadedUrl)
                        setselctedImage(downloadedUrl)
                    }
                )

            
        }else{
            console.log('selection was cancelled')
        }
    }

    // removing image 
    const removeImage=()=>{
        if (setselctedImage) {
            setselctedImage(null)
        }
    }


    const handleImagePress = ()=>{
        if (selctedImage) return setselctedImage(null)
        getImage() 

    }

    const createNewPost= async(caption)=>{
        const subCollectionRef = collection(db,'users',currentuser,'posts')
        const newDocRef = doc(subCollectionRef)
        const createPost = await setDoc(newDocRef,{
            username:currentuserData.username,  // from state
            profile_pic:currentuserData.profile_pic, // from state
            email:currentuserData.email,
            imageurl:selctedImage, // from formik
            caption:caption, // from formik
            liked_by_users:[], // now created
            createdAt:serverTimestamp(), // firebase/firestore
            comments:[], // now created
            id:newDocRef.id
        })

    }
    //effects
    React.useEffect(()=>{
        getLibrarypermisiion()
        getCurrentUserData()
        
    },[])

    return (
        <View style={styles.container}>
            <CreateHeader/>
            {console.log(currentuser)}
            <Divider width={1} color='#5b5858'/>
            <Formik
                initialValues={{caption:'' }}
                onSubmit={values => {
                    if (currentuserData) {
                        createNewPost(values.caption)  
                    }else{
                        alert('there was an error')
                    }
                    console.log(values)
                    navigation.navigate('HomeScreen')
                }}
                validationSchema={validationSchema}
                validateOnMount={true}
            >
                {({ handleChange, handleBlur, handleSubmit, values, isValid, errors }) => (
                    <View>
                        <View style={styles.formhold}>
                            <TouchableOpacity onPress={handleImagePress}>
                                <Image source={{uri:validUri.isUri(selctedImage)? selctedImage:defaultImage}} style={{width:100,height:100,marginLeft:10}} resizeMode='cover'/>
                            </TouchableOpacity>
                            <TextInput
                                style={{color:'white',width:230,height:70,alignSelf:'center',marginRight:5,fontSize:20}}
                                placeholder='Caption'
                                placeholderTextColor={'white'}
                                onChangeText={handleChange('caption')}
                                onBlur={handleBlur('caption')}
                                value={values.caption}
                            />
                        </View>
                        {errors.caption && <Text style={{color:'red'}}>{errors.caption}</Text>}
                        <Divider width={1} color='#5b5858'/>


                        <View style={styles.Buttonhold}>
                            <Button onPress={handleSubmit} title="Submit" color={colorpallot.postButton} />    
                        </View>    
                        
                   </View>
                 )}
            </Formik>
            {/* {selctedImage ? <Button title='remove image' onPress={removeImage}/>:<Button title='select image' onPress={getImage}/>} */}
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'black'
    },
    formhold:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:10,
        marginTop:10
    },
    Buttonhold:{
        width:300,
        alignSelf:'center',
        marginTop:20,
        borderColor:'grey',
        borderWidth:1,
        borderRadius:2,
        position:'absolute',
        top:450
    },
})

export default NewPostScreen
