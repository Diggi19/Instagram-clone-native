import React from 'react'
import { Image } from 'react-native'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput } from 'react-native'
import Icons from '../repeated/Icons'
import { Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// auth assist
import Validator from 'email-validator'
import { Formik } from 'formik'
import * as Yup from 'yup'

//firebase 
import { auth, db } from '../../Firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { addDoc, collection, collectionGroup, doc, getDocs, setDoc } from 'firebase/firestore'



const signinSchema = Yup.object().shape({
    email:Yup.string().email().required('email is required'),
    password:Yup.string().required('password is required').min(8,"your password has to have atleast 8 characters "),
    username:Yup.string().required('username required').min(2,'your username should have atleast 2 characters')
}) 



const SigninScreen = () => {
    const navigation = useNavigation()
    const[showPassword,setshowPassword]=React.useState(true)

    const getRandomProfilePic = async()=>{
        const response = await fetch('https://randomuser.me/api')
        const data = await response.json()
        return data.results[0].picture.large
    }
    const onSignin = async(email,password,username)=>{
        try {
            const authUser = await createUserWithEmailAndPassword(auth,email,password)
            console.log('successfully logged in ',authUser)
            
            // creating new document with user's email as doc id
            const collectionRef = collection(db,'users')
            const newDocRef = doc(collectionRef,authUser.user.email)

            const addData = setDoc(newDocRef,{
                owner_uid:authUser.user.uid,
                username:username,
                email:authUser.user.email,
                profile_pic: await getRandomProfilePic()

            })
            
    
            

        } catch (err) {
            console.log({message:"signin error",error:err})
        }
    }


    return (
        <View style={styles.container}>
                <View style={styles.Logohold}>
                    <Image source={require('../../assets/instaicon.png')} style={{width:100,height:100,alignSelf:'center'}}/>
                </View>
                <View style={styles.Formhold}>
                <Formik
                        initialValues={{email:'',password:'',username:''}}
                        onSubmit={values=>onSignin(values.email,values.password,values.username)}
                        validationSchema={signinSchema}
                        validateOnMount={true}
                    >
                        {({handleChange,handleSubmit,handleBlur,errors,values,isValid})=>(
                            
                            <View style={styles.Formhold}>
                                {/* {console.log(values)} */}
                                <View style={styles.fields}>
                                    <Icons name="mail" size={30} color="grey"/>
                                    <TextInput
                                        style={{color:'black',marginLeft:10,width:220,height:30,alignSelf:'center',marginRight:5,fontSize:15,borderBottomWidth:1,borderBottomColor:Validator.validate(values.email)?"grey":'red'}}
                                        placeholder='Email'
                                        placeholderTextColor={'grey'}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                    />
                                </View>

                                {/* error message */}
                                {errors.email && <Text style={{color:'red',alignSelf:'flex-start',marginLeft:55,marginTop:-20,fontSize:12}}>{values.email.length >=1 ?errors.email:''}</Text>}
                                
                                
                                <View style={styles.fields}>
                                    <Icons name="person" size={30} color="grey"/>
                                    <TextInput
                                        style={{color:'black',marginLeft:10,width:220,height:30,alignSelf:'center',marginRight:5,fontSize:15,borderBottomWidth:1,borderBottomColor:errors.username?"red":'grey'}}
                                        placeholder='username'
                                        placeholderTextColor={'grey'}
                                        onChangeText={handleChange('username')}
                                        onBlur={handleBlur('username')}
                                        value={values.username}
                                        maxLength={12}
                                    />

                                </View>

                                {/* error message */}
                                {errors.username && <Text style={{color:'red',alignSelf:'flex-start',marginLeft:55,marginTop:-20,fontSize:12}}>{values.username.length >=1 ? errors.username:''}</Text>}
                                
                                
                                <View style={styles.fields}>
                                    <Icons name="key" size={30} color="grey"/>
                                    <TextInput
                                        secureTextEntry={showPassword}
                                        style={{color:'black',marginLeft:10,width:220,height:30,alignSelf:'center',marginRight:5,fontSize:15,borderBottomWidth:1,borderBottomColor:errors.password?"red":'grey'}}
                                        placeholder='Password'
                                        placeholderTextColor={'grey'}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        contextMenuHidden={true}
                                    />
                                    <View style={{position:'absolute',right:5}}>
                                        <Icons name={showPassword?"eye":"eye-off"} size={20} color="grey" onPressed={()=>setshowPassword(!showPassword)}/>
                                    </View>
                                </View>

                                {/* error message */}
                                {errors.password && <Text style={{color:'red',alignSelf:'flex-start',marginLeft:55,marginTop:-20,fontSize:12}}>{values.password.length >=1 ?errors.password:''}</Text>}
                                
                                
                                <View style={{width:'90%',alignSelf:'center',marginBottom:25,marginTop:30}}>
                                    <Button
                                        title='Sign up'
                                        onPress={handleSubmit}
                                        disabled={!isValid}
                                    />
                                </View>

                                <View style={{width:'80%',height:50,alignSelf:'center'}}>
                                    <Text style={{textAlign:'center',color:'grey'}}>
                                        already have an account?  
                                        <Text onPress={()=>navigation.navigate('LoginScreen')} style={{color:'#3d8ae2',fontSize:15,fontWeight:'500'}}>
                                            Login
                                        </Text>
                                    </Text>
                                </View>

                            </View>
                        )}
                    </Formik>
                </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
                
    },
    Logohold:{
        width:'100%',
        height:100,
        justifyContent:'center',
        marginTop:50
    },
    Formhold:{
        width:'90%',
        height:200,
        marginTop:20,
        alignItems:'center'
    },
    fields:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop:6,
        marginBottom:25
    },
})

export default SigninScreen
