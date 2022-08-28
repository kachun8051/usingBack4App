import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
// In a React Native application
import Parse from "parse/react-native.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [person, setPerson] = useState(new Parse.Object('Person'));

  useEffect(() => {
    fetchPerson()
  }, []);

  // Initializing the SDK. 
  Parse.setAsyncStorage(AsyncStorage);
  // You need to copy BOTH the the Application ID and the Javascript Key from: Dashboard->App Settings->Security & Keys 
  Parse.initialize('5vUD5SzypdFDZfa7Sxjya1yLliHMAJ52ML3sqBf6','pQCa8PbENykHJkGvzHBpZLlgVaI7phqgnh2vf0eB');
  Parse.serverURL = 'https://parseapi.back4app.com/';

  //This funciton will save a simple Person object
  async function addPerson() {
    try {
      //create a new Parse Object instance
      const newPerson = new Parse.Object('Person');
      //define the attributes you want for your Object
      newPerson.set('name', 'John');
      newPerson.set('email', 'john@back4app.com');
      //save it on Back4App Data Store
      await newPerson.save();
    } catch (error) {
      console.log('Error saving new person: ', error);
    }
  }

  //This function will retrieve a Person which the name is John
  async function fetchPerson() {
    //create your Parse Query using the Person Class you've created
    let query = new Parse.Query('Person');
    //run the query to retrieve all objects on Person class, optionally you can add your filters
    let queryResult = await query.findAll();
    //pick the first result 
    const currentPerson = queryResult[0];
    //access the Parse Object attributes
    console.log('person id: ', currentPerson.get('id'));
    console.log('person name: ', currentPerson.get('name'));
    console.log('person email: ', currentPerson.get('email'));
    setPerson(currentPerson);
  }

  return (
    
      <View style={styles.container}>
        <Text>Name: {person.get('name')}</Text>
        <Text>email: {person.get('email')}</Text>
        <Button title='Add person' onPress={addPerson} />
        <Button title='Fetch person' onPress={fetchPerson} />
      </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  textbox: {    
    paddingTop: 20
  }
});
