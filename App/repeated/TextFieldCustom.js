import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'
const TextFieldCustom = ({placeholder,keyboard,lines,maxcount,onChangeText,handleBlur,value}) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={{color:'white',fontSize:placeholder === 'caption'?20:10}}
                placeholderTextColor="white"
                placeholder={placeholder}
                keyboardType={keyboard}
                numberOfLines={lines}
                maxLength={maxcount}
                multiline
                onChangeText={onChangeText}
                onBlur={handleBlur}
                value={value}
                

            />
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        marginTop:20,
        marginRight:40,
        width:'95%',
        maxWidth:230,
        alignSelf:'center',
        paddingTop:35,
        paddingBottom:35,
        

    },
})

export default TextFieldCustom
