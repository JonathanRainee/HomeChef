import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebase'
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, setDoc } from 'firebase/firestore';
import { Text, View } from 'react-native';
import { CheckoutComponent } from '../components/CheckoutComponent';

export const Checkout = () => {

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
    <View>
      {
        cart.map((c) => {
          console.log(c.data());
          return(
            <CheckoutComponent data={c.data()}/>
            // <Text>asdf</Text>
          )
        })
      }
    </View>
  )
}
