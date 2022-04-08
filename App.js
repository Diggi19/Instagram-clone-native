import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import BottomTabs from './App/components/BottomTabs';
import AppNavigations from './App/Navigations/AppNavigations';
import AuthNavigation from './App/Navigations/AuthNavigation';
import LoginScreen from './App/Screens/LoginScreen';
import SigninScreen from './App/Screens/SigninScreen';
// import AppNavigations from './App/Navigations/AppNavigations';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase';




const App = ()=> {
  const[isUser,setisUser]=React.useState(false)
  const handleChange = (user)=>{
    if (!user) return setisUser(null)
    setisUser(user)
  }

  React.useEffect(
    ()=> onAuthStateChanged(auth,user=>handleChange(user))
  ,[])


  return (
    <View style={styles.container}>
      {/* {isUser?<BottomTabs/>:<AuthNavigation />} */}
      {/* {console.log(isUser.email)} */}
      <AppNavigations/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:Platform.OS === 'android'? StatusBar.currentHeight:0,
    flex:1,
    backgroundColor:StatusBar.setBackgroundColor('black'),
    color : StatusBar.setBarStyle('light-content')
    
    
  },
});


export default App