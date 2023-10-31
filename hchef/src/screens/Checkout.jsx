import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebase'
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, setDoc } from 'firebase/firestore';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { CheckoutComponent } from '../components/CheckoutComponent';
import DropDownPicker from 'react-native-dropdown-picker';

export const Checkout = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Cash', value: 'Cash'},
    {label: 'Credit', value: 'Credit'},
    {label: 'OVO', value: 'OVO'},
  ]);
  const [ cart ,setCart ] = useState([])
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
      <View style={styles.ddContainer}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          setValue={setValue}
          setItems={setItems}
          defaultValue={selectedValue}
          ArrowDownIconComponent={({ setAllFalse }) => <></>}
          ArrowUpIconComponent={({ setAllFalse }) => <></>}
          icon={null}
          placeholder = "Payment method"
          style={styles.dropdownPicker}
          dropDownContainerStyle={styles.dropdownContainer}
          containerStyle={styles.selectContainer}
          placeholderStyle={styles.placeholderStyle}
          itemStyle={styles.itemStyle}
          dropDownStyle={styles.dropDown}
          onChangeItem={(item) => setSelectedValue(item.value)}
        />
      </View>
      <View style={styles.section}>
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
    flex: 1, 
    backgroundColor: '#4ebf5d',
    padding: 10,
    margin: 10,
    bottom: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonStyle2: {
    flex: 1,
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
    marginHorizontal: 20,
    bottom: 5,
  },
  dropdownPicker: {
    width: '100%',
  },
  dropdownContainer: {
    width: '100%', 
  },
  selectContainer: {
    borderRadius: 10,
    borderWidth: 1, 
    borderColor: '#4ebf5d', 
    backgroundColor: 'white', 
    paddingVertical: 10,
    
  },
  dropDownStyle: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4ebf5d',
    backgroundColor: 'white',
  },
  placeholderStyle: {
    paddingHorizontal: 10, // Add your desired padding here
  },
  itemStyle: {
    justifyContent: 'flex-start',
  },
  dropDown: {
    backgroundColor: 'white',
  },
  nativeIconStyle: {
    display: 'none',
  },
  webIconStyle: {
    display: 'none', // Override the icon style for web platforms
  },
  hiddenIcon: {
    display: 'none',
  },

});