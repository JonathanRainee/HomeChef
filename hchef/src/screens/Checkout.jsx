import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebase'
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, setDoc } from 'firebase/firestore';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { CheckoutComponent } from '../components/CheckoutComponent';
import DropDownPicker from 'react-native-dropdown-picker';

export const Checkout = () => {

  const [ allFalse, setAllFalse ] = useState(false)
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Cash', value: 'Cash'},
    {label: 'Credit', value: 'Credit'},
    {label: 'OVO', value: 'OVO'},
    {label: 'Go-Pay', value: 'Go-Pay'},
  ]);

  const [ cart ,setCart ] = useState([])
  const [ total, setTotal ] = useState(0)
  const currUser = FIREBASE_AUTH.currentUser
  const db = FIREBASE_DB

  const getCart = async () => {
    const q = query(collection(FIREBASE_DB, 'users', currUser.uid, 'cart'));
    let res = await getDocs(q)
    let arr = []
    res.forEach((e) => {
      arr.push(e)
    })
    setCart(arr)
  }

  useEffect(()=>{
    getCart()
  }, [])


  return (
    <View style={styles.container}>
      <ScrollView>
        {cart.map((c) => {
          return <CheckoutComponent key={c.id} data={c.data()} />;
        })}
      </ScrollView>
      <View style={styles.section}>
        <View style={styles.ddContainer}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={styles.dropdownPicker}
            dropDownContainerStyle={styles.dropdownContainer}
            ArrowDownIconComponent={({ setAllFalse }) => <></>}
            placeholder = "Payment method"
            containerStyle={styles.selectContainer}
            dropdownStyles={{
              backgroundColor: "#4ebf5d",
              position: "absolute",
              top: 40,
              width: "100%",
              zIndex: 999,
            }}
          />
        </View>
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
  },
  buttonStyle: {
    flex: 1, // Make the button fill the available horizontal space
    backgroundColor: '#4ebf5d',
    padding: 10,
    margin: 10,
    bottom: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonStyle2: {
    flex: 1, // Make the button fill the available horizontal space
    backgroundColor: '#4ebf5d',
    padding: 10,
    margin: 10,
    bottom: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  ddContainer: {
    flex: 1, // Make the container fill the screen horizontally
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    bottom: 5,
  },
  dropdownPicker: {
    width: '100%', // Make the dropdown picker fill the screen horizontally
  },
  dropdownContainer: {
    width: '100%', // Make the dropdown container (the list) fill the screen horizontally
  },
  selectContainer: {
    borderRadius: 10, // Custom border radius for the select
    borderWidth: 1, // Custom border width
    borderColor: '#4ebf5d', // Custom border color
    backgroundColor: 'white', // Custom background color
    padding: 10,
    // You can add more custom styles here
  },
  dropDownStyle: {
    borderRadius: 10, // Style for the select item container (dropdown list)
    borderWidth: 1,
    borderColor: '#4ebf5d',
    backgroundColor: 'white',
    // You can add more custom styles here
  },
});