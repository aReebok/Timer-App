import React from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import * as Google from "expo-google-app-auth";

// import styles 
import styles from './styles/Login.style';

const Login = ({ navigation }) => {
  
  // var pressed = null;
  const  url = 'http://10.42.58.114:3001';
  const formContentType = "application/x-www-form-urlencoded;charset=UTF-8";
  const handlePressOnLoadInfo = async (op, method = '', params = {}) => {
    if (method != '')
        params.method = method;
    const pressed = await fetch(url + '/'+op, params)
        .then((response) => response.text())
        .then((responseText) => {
          try {
            const json_resp = JSON.parse(responseText);
            console.log("Activity in progress!");
            return true;
          } catch (err) {
            console.log("No activities running.");
            return false;
          }}).catch((error) => { console.error(error);});
      return pressed;
  } // 

  const signInAsync = async () => {
    console.log("LoginScreen.js 6 | loggin in");
    try {
      const { type, user } = await Google.logInAsync({
        
      });

      if (type === "success") {
        // Then you can use the Google REST API
        console.log("LoginScreen.js 17 | success, navigating to profile");
        const pressed = await handlePressOnLoadInfo('activity', 'PUT', {
          headers: {
              "Content-type": formContentType
          }, 
          body: `mid=${user.id}`
        });

        navigation.navigate("Home", { user, pressed });
      }
    } catch (error) {
      console.log("LoginScreen.js 19 | error with login", error);
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>TIMER APP</Text>
        <Button title="Login with Google" onPress={signInAsync} />
    </View>
  );
};

export default Login;