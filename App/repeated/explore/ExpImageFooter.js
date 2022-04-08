import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const ExpImageFooter = ({item}) => {

    return (
        <View style={styles.container}>
            {/* <Imagebutton item={item}/> */}
            <View style={styles.texthold}>
                <Text style={styles.likes}>{item.liked_by_users.length}</Text>
                <Text style={styles.caption}><Text style={{fontWeight:'bold'}}>{item.username} :</Text>{item.caption}</Text>
                
                {/* {!!postMessage.comment.length && render👇} //this will turn the 0 or 1 return to true or false */}
                <Text style={styles.message}>View {/*{post.length > 1 ? 'all' : ''}*/}all  {/*{post.length}*/} 5 {/*{post.length >1?'comments':'comment'}*/}comments</Text>
                
                <View style={styles.commenthold}>
                    <Text style={[styles.comment]}><Text style={{fontWeight:'bold'}}>bakugo :</Text> deku u sleepy idiot hhfss sjshh sjsjhshd fhfjkdkw sjhsjhd jshsjdjdjd jwjjsksj😠😠</Text>
                </View>
                {/* likes */}
                {/* caption */}
                {/* comments */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:160,
    },
    texthold:{
        marginTop:2,
        width:'98%'
    },
    likes:{
        color:'white',
        fontWeight:'bold',
        marginLeft:12,
    },
    caption:{
        maxWidth:330,
        maxHeight:50,
        color:'white',
        marginLeft:12,
    },
    message:{
        marginTop:3,
        color:'grey',
        marginLeft:12,
        
    },
    commenthold:{
        marginTop:3,
        color:'white',
        marginLeft:12,
        maxWidth:330,
    },
    comment:{
        marginTop:3,
        color:'white',
        maxWidth:330,
        
    },
})

export default ExpImageFooter
