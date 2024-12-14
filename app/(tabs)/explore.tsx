import { StyleSheet, TextInput, Image, Platform, Button } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useState } from 'react';
import axios from 'axios';

export default function TabTwoScreen() {
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const [dbName, setDbName] = useState('');
  const [urll, setUrll] = useState('');
  const [state,setState]=useState("Normal");
  const [status,setStatus]=useState("idle");



  const handleSubmit = async () => {
    console.log('Submitted:', { UserName, Password, dbName, urll });
    // e.preventDefault(); // Prevent default form submission behavior
    setState("loading");
      ///////developmentt
      const url = urll; // Replace with your API endpoint
      const authPayload = { 
        CompanyDB: `"${dbName}"`, 
        UserName: `"${UserName}"`, 
        Password: `"${Password}"` 
      };
      const username=`{"CompanyDB": "${dbName}", "UserName": "${UserName}"}`;
      const password=Password;

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

    // const url = urll; // Replace with your API endpoint
    // const authPayload = { 
    //   CompanyDB: dbName, 
    //   UserName: UserName, 
    //   Password: Password 
    // };
    // const username=`{"CompanyDB": ${dbName}, "UserName": ${UserName}}`;
    // const password=Password;
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
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={[styles.container, { backgroundColor: 'white' }]}>
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          value={UserName}
          onChangeText={setUserName}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          value={Password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Database Name"
          value={dbName}
          onChangeText={setDbName}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter URL"
          value={urll}
          onChangeText={setUrll}
        />
        <Button title="Submit" onPress={handleSubmit} />
      </ThemedView>
      <ThemedText type="title" style={{fontSize:17}}>{state}</ThemedText>
    
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  titleText: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
});
