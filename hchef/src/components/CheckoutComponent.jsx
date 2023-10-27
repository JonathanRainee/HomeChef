import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

export const CheckoutComponent = () => {
  const total = quantity * price;

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.foodName}>{foodName}</Text>
      <Text style={styles.quantityPrice}>
        {quantity} x Rp. {price} = Rp. {total}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityPrice: {
    fontSize: 14,
  },
});
