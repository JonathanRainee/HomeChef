import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';

export const EditProfile = ({ route, navigation }) => {
  const { currentUser } = route.params;
  const db = FIREBASE_DB
  const currUser = FIREBASE_AUTH.currentUser

  const [newName, setNewName] = useState(currentUser.username);
  const [newAddress, setNewAddress] = useState(currentUser.address);
  console.log(currUser.uid);
  const handleUpdateProfile = async() => {
    const userDocRef = doc(db, 'users', currUser.uid);

    try {
      await updateDoc(userDocRef, {
        username: newName,
        address: newAddress,
        alreadySetProfile: true
      });

      navigation.goBack();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text>Edit Profile</Text>
        <TextInput
          style={styles.input}
          placeholder="New Name"
          value={newName}
          onChangeText={(text) => setNewName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="New Address"
          value={newAddress}
          onChangeText={(text) => setNewAddress(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#4ebf5d',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});