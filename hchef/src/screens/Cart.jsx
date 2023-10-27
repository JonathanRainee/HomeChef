import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View, ScrollView, Text, Image, TextInput, Button, StyleSheet, Animated, Easing } from 'react-native'
import { FIREBASE_AUTH } from '../../firebase';
import { FIREBASE_DB } from '../../firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, setDoc } from 'firebase/firestore';
import { CartComponent } from '../components/CartComponent';

export const Cart = () => {

  const [ cart ,setCart ] = useState([])
  const [ total, setTotal ] = useState(0)
  const currUser = FIREBASE_AUTH.currentUser
  const db = FIREBASE_DB

  const handleItemDelete = async (itemId, itemPrice) => {
    await deleteDoc(doc(FIREBASE_DB, 'users', currUser.uid, 'cart', itemId));
    setTotal(total - itemPrice);
  };

  useEffect(()=>{
    const q = query(collection(FIREBASE_DB, 'users', currUser.uid, 'cart'));
    let ttl = 0
    setTotal(0)
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const arr = [];
      snapshot.docs.forEach((doc) => {
        arr.push({
          ...doc.data(),
          id: doc.id,
        });
        ttl +=  doc.data().price
      });
      setCart(arr);
      setTotal(ttl)
    });

    return () => {
      unsubscribe();
    };
  }, [])
  
  return (
    <View style={styles.container}>
      <ScrollView>
        {cart.map((e) => {
          return <CartComponent key={e.id} item={e} onDelete={handleItemDelete}/>;
        })}
      </ScrollView>
      <View style={styles.section}>
        <View style={styles.cartItems}>
          <Text style={styles.totalText}>Your cart items: {cart.length}</Text>
          <Text style={styles.totalText}>Your total: <Text style={styles.boldText}>Rp.{total}</Text></Text>
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
  totalText: {
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold',
  },
})