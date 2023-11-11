import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../firebase';
import { FIREBASE_DB } from '../../firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

const FoodComponent = ({ name, price, imageSource, onAddToCart, id, desc, ingridients, instructions }) => {

  const data = {
    name,
    price, 
    imageSource,
    id,
    desc,
    ingridients,
    instructions
  }

  const navigation = useNavigation()
  const currUser = FIREBASE_AUTH.currentUser
  const db = FIREBASE_DB

  const goToDetail = () => {
    navigation.navigate('detail', { data })
  }

  const addToCart = async () => {
    await addDoc(collection(db, 'users', currUser.uid, 'cart'), {
      quantity: 100,
      name: name,
      price: 100*price,
      imageSource: imageSource,
      status: 'inCart',
      description: desc,
      ingridients : ingridients,
      instructions : instructions
    })
  }

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={goToDetail}>
        <Image source={imageSource} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>Rp. {price}/g</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={addToCart} style={styles.addToCartButton}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: 'green',
    marginTop: 5,
  },
  addToCartButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#4ebf5d'
  },
  addToCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FoodComponent;
