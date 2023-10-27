import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

export const CheckoutComponent = ({ data }) => {
  const price = data.price / data.quantity

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.foodName}>{data.name}</Text>
      <Text style={styles.quantityPrice}>
        {data.quantity} x Rp. {price} = Rp. {data.price}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    margin: 2,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityPrice: {
    fontSize: 14,
  },
});
