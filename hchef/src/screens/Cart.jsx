import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View, Text, Image, TextInput, Button, StyleSheet, Animated, Easing } from 'react-native'
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
  
  console.log(cart);
  return (
    <View>
      {
        cart.map((e)=>{
          return(
            <CartComponent key = {e.id} item = {e} />
          )
        })
      }
    </View>
  )
}
