import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View, ScrollView, Text, Image, TextInput, Button, StyleSheet, Animated, Easing } from 'react-native'
import { FIREBASE_AUTH } from '../../firebase';
import { FIREBASE_DB } from '../../firebase';
import { addDoc, collection, doc, getDocs, onSnapshot, query, setDoc } from 'firebase/firestore';
import { CartComponent } from '../components/CartComponent';

export const Cart = () => {

  const [ cart ,setCart ] = useState([])
  const currUser = FIREBASE_AUTH.currentUser
  const db = FIREBASE_DB

  useEffect(()=>{
    const q = query(collection(FIREBASE_DB, 'users', currUser.uid, 'cart'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const arr = [];
      snapshot.docs.forEach((doc) => {
        arr.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setCart(arr);
    });

    return () => {
      unsubscribe();
    };
  }, [])
  
  return (
    <View style={styles.container}>
    <ScrollView>
      {cart.map((e) => {
        return <CartComponent key={e.id} item={e} />;
      })}
    </ScrollView>
    <View style={styles.section}>
      <View style={styles.cartItems}>
        <Text>Your cart items: {cart.length}</Text>
      </View>
      <TouchableOpacity style={styles.buttonStyle}>
        <Text>Checkout</Text>
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
    position: 'sticky',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  cartItems: {
    flex: 1,
    alignItems: 'flex-start',
  },
  buttonStyle: {
    backgroundColor: '#4ebf5d',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
})