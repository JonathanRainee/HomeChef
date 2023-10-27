import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FIREBASE_DB } from '../../firebase';
import { FIREBASE_AUTH } from '../../firebase';

export const CartComponent = ({ item, onDelete  }) => {
  
  const { name, price, quantity, imageSource, id } = item
  const currUser = FIREBASE_AUTH.currentUser
  const db = FIREBASE_DB

  const deleteCart = async () => {
    const ref = doc(FIREBASE_DB, 'users', currUser.uid, 'cart', id)
    await deleteDoc(doc(FIREBASE_DB, 'users', currUser.uid, 'cart', id))
  }

  const handleDelete = () => {
    onDelete(id, price);
  };

  return (
    <View style={styles.cardContainer}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>Rp. {price}</Text>
        <Text style={styles.quantity}>Quantity: {quantity}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleDelete}>
          <Image style={styles.imageStyle} source={require('../assets/delete.png')}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
  },
  quantity: {
    fontSize: 14,
    color: '#777',
  },
  buttonContainer: {
    flex: 1, 
    alignItems: 'flex-end',
  },
  imageStyle: {
    width: 30, 
    height: 30, 
  },
});