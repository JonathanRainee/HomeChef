import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native';

export const CartComponent = ({ item }) => {
  
  const { name, price, quantity, imageSource } = item

  console.log(imageSource);

  return (
    <View style={styles.cardContainer}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>Rp. {price}</Text>
        <Text style={styles.quantity}>Quantity: {quantity}</Text>
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
});