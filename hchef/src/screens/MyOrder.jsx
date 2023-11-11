import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebase';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CartComponent } from '../components/CartComponent';
import { BoughtFoodComponent } from '../components/BoughtFoodComponent';

export const MyOrder = () => {

  const [ cart ,setCart ] = useState([])
  const currUser = FIREBASE_AUTH.currentUser
  const db = FIREBASE_DB
  const navigation = useNavigation();

  useEffect(()=>{
    const ref = collection(db, 'users', currUser.uid, 'cart')
    const q = query(ref, where('status', '==', 'checked out'));
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const arr = []
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

  const handleItemDelete = async (itemId, itemPrice) => {
    await deleteDoc(doc(FIREBASE_DB, 'users', currUser.uid, 'cart', itemId));
  };

  const goToCheckout = () => {
    navigation.navigate('Checkout')
  }

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
            return <BoughtFoodComponent key={e.id} item={e}/>;
          })}
        </ScrollView>
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