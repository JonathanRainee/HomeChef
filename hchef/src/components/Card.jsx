import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../firebase';


const Card = ({ name, price, imageSource, onAddToCart  }) => {

  const navigation = useNavigation();
  const currUser = FIREBASE_AUTH.currentUser

  const addToCart = () => {
    console.log(currUser);
  }

  return (
    <View style={styles.card}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>Rp. {price} / 100g</Text>
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
  },
  addToCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Card;
