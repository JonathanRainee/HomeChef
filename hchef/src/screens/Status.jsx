import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export const Status = ({ route }) => {

  const { productName, status } = route.params;
  const [stat, setstat] = useState("")
  
  useEffect(() => {
    if(status == "Processed"){
      setstat(`Your Order for ${productName} is being processed`)
    }else if(status == "On Delivery"){
      setstat(`Your Order for ${productName} is on delivery`)
    }
  }, [productName, status])
  

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/delivery.png')}
        style={styles.image}
      />
      <Text style={styles.text}>{stat}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },
});
