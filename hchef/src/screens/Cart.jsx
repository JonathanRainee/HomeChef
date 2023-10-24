import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View, Text, Image, TextInput, Button, StyleSheet, Animated, Easing } from 'react-native'
import { FIREBASE_AUTH } from '../../firebase';
import { FIREBASE_DB } from '../../firebase';
import { addDoc, collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { CartComponent } from '../components/CartComponent';

export const Cart = () => {

  const [ cart ,setCart ] = useState([])
  const currUser = FIREBASE_AUTH.currentUser
  const db = FIREBASE_DB

  const getCart = async () => {
    const q = query(collection(FIREBASE_DB, 'users', currUser.uid, "cart"))
    let res = await getDocs(q)
    let arr = []
    res.forEach((e) => {
      arr.push(e)
      // console.log(e.data());
    })
    setCart(arr)
  }

  useEffect(()=>{
    getCart()
  }, [])

  return (
    <View>
      {
        cart.map((e)=>{
          console.log(e.data());
          return(
            <CartComponent key = {e.id} item = {e.data()} />
          )
        })
      }
    </View>
  )
}
