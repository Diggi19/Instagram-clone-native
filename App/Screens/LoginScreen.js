import React, { useContext } from 'react'
import { Alert, Image } from 'react-native'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput } from 'react-native'
import Icons from '../repeated/Icons'
import { Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

//context

// auth support 
import Validator from 'email-validator'
import { Formik } from 'formik'
import * as Yup from 'yup'

// firebase
import {signInWithEmailAndPassword}from 'firebase/auth'
import { auth } from '../../Firebase'

const loginSchema = Yup.object().shape({
    email:Yup.string().email().required('email is required'),
    password:Yup.string().required('password is required').min(8,"your password has to have atleast 8 characters ")
}) 





const LoginScreen = () => {
        const navigation = useNavigation()
        const[showPassword,setshowPassword]=React.useState(true)
        const [Data,setdata]=React.useState([])


       


        const onLogin = async(email,password)=>{
            try {
                const result = await signInWithEmailAndPassword(auth,email,password)
                console.log('successfully logged in ',result)
                alert('sign in complete')
                
            } catch (err) {
                console.log({message:"login error",error:err})
                Alert.alert('dear user','no such user exists check your credentials',[
                    {
                        text:'ok',
                        onPress:()=>console.log('ok')
                    },
                    {
                        text:'Signup',
                        onPress:()=>navigation.navigate('SigninScreen')
                    }
                ])
            }
        }
        return(
            <View style={styles.container}>
                <View style={styles.Logohold}>
                    <Image source={require('../../assets/instaicon.png')} style={{width:100,height:100,alignSelf:'center'}}/>
                </View>
                
                    <Formik
                        initialValues={{email:'',password:''}}
                        onSubmit={values=>onLogin(values.email,values.password)}
                        validationSchema={loginSchema}
                        validateOnMount={true}
                        
                    >
                        {({handleChange,handleSubmit,handleBlur,errors,values,isValid})=>(
                            
                            <View style={styles.Formhold}>
                                {/* {console.log(values)} */}
                                <View style={styles.fields}>
                                    <Icons name="mail" size={30} color="grey"/>
                                    <TextInput
                                        style={{color:'black',marginLeft:10,width:220,height:30,alignSelf:'center',marginRight:5,fontSize:15,borderBottomWidth:1,borderBottomColor:values.email >=1 || Validator.validate(values.email)?"grey":'red'}}
                                        placeholder='Email'
                                        placeholderTextColor={'grey'}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        autoComplete={false}
                                        autoCorrect={false}
                                    />
                                </View>
                                    {values.email >=1||errors.email && <Text style={{color:'red',marginLeft:73,marginTop:-20,fontSize:12}}>{values.email.length >=1 ?errors.email:''}</Text>}
                                <View style={styles.fields}>
                                    <Icons name="key" size={30} color="grey" onPressed={()=>setshowPassword(!showPassword)}/>
                                    <TextInput
                                        secureTextEntry={showPassword}
                                        style={{color:'black',marginLeft:10,width:220,height:30,alignSelf:'center',marginRight:5,fontSize:15,borderBottomWidth:1,borderBottomColor:values.password >=1||errors.password ?"red":'grey'}}
                                        placeholder='Password'
                                        placeholderTextColor={'grey'}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        contextMenuHidden={true}
                                    />
                                    <View style={{position:'absolute',right:30}}>
                                        <Icons name={showPassword?"eye":"eye-off"} size={20} color="grey" onPressed={()=>setshowPassword(!showPassword)}/>
                                    </View>
                                </View>
                                    {errors.password && <Text style={{color:'red',marginLeft:73,marginTop:-20,fontSize:12}}>{values.password.length >=1 ?errors.password:''}</Text>}

                                <View style={{width:'90%',alignSelf:'center',marginBottom:25,marginTop:30}}>
                                    <Button
                                        title='Login'
                                        onPress={handleSubmit}
                                        disabled={!isValid}
                                    />
                                </View>
                                

                                <View style={{width:'80%',height:50,alignSelf:'center'}}>
                                    <Text style={{textAlign:'center',color:'grey'}}>
                                        if u don't have an account create one now.  
                                        <Text onPress={()=>navigation.navigate('SigninScreen')} style={{color:'#3d8ae2',fontSize:15,fontWeight:'500'}}>
                                            Register
                                        </Text>
                                    </Text>
                                </View>

                            </View>
                        )}
                    </Formik>
                
                

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
        marginTop:100
    },
    Formhold:{
        width:'90%',
        height:200,
        marginTop:40
    },
    Formhold2:{
        width:'90%',
        height:200,
    },
    fields:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop:10,
        marginBottom:25
    },
})

export default LoginScreen
