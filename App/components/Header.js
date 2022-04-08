import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text, StyleSheet, Platform, StatusBar, Image, TouchableOpacity } from 'react-native'
import colorpallot from '../colors/colorpallot';
import Icons from '../repeated/Icons';
const Header = () => {
    const[isMessages,setisMessages]=React.useState(false)
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>console.log('logo pressed')} style={styles.imageHold} >
                <Image style={{width:120,height:40,marginTop:2,marginLeft:10}}  source={require('../../assets/instaLogo.png')} resizeMode='contain'/>
            </TouchableOpacity>
            <View style={styles.btnHolder}>
                <Icons name="ios-add-circle-outline" size={30} color="white" onPressed={()=>navigation.navigate('NewPost')}/>
                <Icons name="heart-outline" size={30} color="white" onPressed={()=>console.log('pressed')}/>
                <Icons name="chatbubble-ellipses-outline" size={30} color="white" onPressed={()=>console.log('pressed')}/>
                <Text style={isMessages?styles.newMessages:styles.noMessages}>20</Text>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'6%',
        backgroundColor:'black',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:10,
        
        
    },
    imageHold:{
        width:'40%',
        height:'100%',
    },
    btnHolder:{
        width:'30%',
        height:'100%',
        marginRight:5,
        flexDirection:'row',
        alignItems:'center'
    },
    btns:{
        marginLeft:3,
        marginRight:3   
    },
    newMessages:{
        color:'white',
        position:'absolute',
        top:-5,
        left:90,
        backgroundColor:colorpallot.newMessages,
        borderRadius:60,
        padding:3,
        fontSize:15,
        fontWeight:'bold',
        zIndex:1000,
    },
    noMessages:{
        display:'none'
    }

})


export default Header
