import { Image, StyleSheet, Platform, Button } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import axios from 'axios';
import { useState } from 'react';
export default function HomeScreen() {
  const[state,setState]=useState("Normal");
  const [status,setStatus]=useState("idle");
  const Login = async () => {
    // e.preventDefault(); // Prevent default form submission behavior
    setState("loading");

    ///////dev

    // const url = 'https://webapp.centrix.com.cy:50000/b1s/v1/Login'; // Replace with your API endpoint
    // const authPayload = { 
    //   CompanyDB: "ZDEMO_EDOCS_XK", 
    //   UserName: "test", 
    //   Password: "T3st!" 
    // };
    // const username=`{"CompanyDB": "ZDEMO_EDOCS_XK", "UserName": "test"}`;
    // const password="T3st!";

    /////////test

    const url = 'http://103.142.30.50:50001/b1s/v1/Login'; // Replace with your API endpoint
    const authPayload = { 
      CompanyDB: "SBODemoGB_New", 
      UserName: "manager", 
      Password: "1234" 
    };
    const username=`{"CompanyDB": "SBODemoGB_New", "UserName": "manager"}`;
    const password="1234";
    try {
      const response = await axios.post(url, authPayload, {
        headers: {
          'Content-Type': 'application/json', // Set the request content type
          Authorization: `Basic ${btoa(`${username}:${password}`)}`, // Replace with your actual username:password
        },
      });
  
      // if (response.status === 200) {
      //   setState("success"+"  "+`${response.data}`);
      //   console.log('Login successful:', response.data);
      // } else {
      //   setState(`${response.status}`);
      //   console.error('Unexpected response:', response.status, response.data);
      // }

      if (response.status === 200) {
        setStatus('success');
        setState(`Login successful: ${JSON.stringify(response.data, null, 2)}`);
      } else {
        setStatus('error');
        setState(`Unexpected response: ${response.status} - ${response.data}`);
      }
    } catch (error) {
      
      if (axios.isAxiosError(error)) {
        // Check if the error is an Axios error
        if (error.response) {
          setState(`${JSON.stringify(error.response.data, null, 2)}`);
          // Server responded with a status code outside the 2xx range
          console.error('Error response:', error.response.data);
        } else if (error.request) {
          setState(`${JSON.stringify(error.request, null, 2)}`);
          // Request was made but no response was received
          console.error('No response received:', error.request);
        } else {
          setState(`${JSON.stringify(error.message, null, 2)}`);
          // Something else happened in setting up the request
          console.error('Axios error:', error.message);
        }
      } else {
        setState(`${JSON.stringify(error, null, 2)}`);
        // Non-Axios error (e.g., syntax or runtime errors)
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
        <Button title='Api Call' onPress={Login}/>
        
        <ThemedText type="title" style={{fontSize:17}}>{state}</ThemedText>
    
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
