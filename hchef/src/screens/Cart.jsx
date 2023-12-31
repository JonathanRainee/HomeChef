import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View, ScrollView, Text, Image, TextInput, Button, StyleSheet, Animated, Easing } from 'react-native'
import { FIREBASE_AUTH } from '../../firebase';
import { FIREBASE_DB } from '../../firebase';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { CartComponent } from '../components/CartComponent';

export const Cart = () => {

  const [ cart ,setCart ] = useState([])
  const [ total, setTotal ] = useState(0)
  const currUser = FIREBASE_AUTH.currentUser
  const db = FIREBASE_DB
  const navigation = useNavigation();

  const handleItemDelete = async (itemId, itemPrice) => {
    await deleteDoc(doc(FIREBASE_DB, 'users', currUser.uid, 'cart', itemId));
    setTotal(total - itemPrice);
  };

  const goToCheckout = () => {
    navigation.navigate('Checkout')
  }

  useEffect(()=>{
    const ref = collection(FIREBASE_DB, 'users', currUser.uid, 'cart')
    const q = query(ref, where('status', '==', 'inCart'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const arr = [];
      let ttl = 0
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
  
  if(cart.length == 0){
    return(
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text>You didn't have any item in your cart</Text>
        </View>
      </View>
    )
  }else{
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
          <TouchableOpacity style={styles.buttonStyle} onPress={goToCheckout
          }>
            <Text>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  section: {
    position: 'sticky',
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
    margin: 5,
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