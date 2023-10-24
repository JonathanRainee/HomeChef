import React, { useState, useRef, useEffect } from 'react'
import { TouchableOpacity, View, Text, Image, TextInput, Button, StyleSheet, Animated, Easing } from 'react-native'
import { FIREBASE_AUTH } from '../../firebase';
import { FIREBASE_DB } from '../../firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';


export const Detail = ({ route, navigation }) => {

  const [ quantity, setQuantity ] = useState(100);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const currUser = FIREBASE_AUTH.currentUser
  const db = FIREBASE_DB
  const data = route.params

  const handleIncrement = () => {
    setQuantity(quantity + 100);
  };

  const handleDecrement = () => {
    if (quantity > 100) {
      setQuantity(quantity - 100);
    }else{
      setQuantity(100);
    }
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const addToCart = async () => {
    console.log(currUser.uid);
    await addDoc(collection(db, 'users', currUser.uid, 'cart'), {
      quantity: quantity,
      name: data.data.name,
      price: quantity*data.data.price,
      imageSource: data.data.imageSource,
      description: data.data.desc
    })
    navigation.navigate('home')
  }
  
  useEffect(()=>{
    fadeIn()
  }, [])


  return ( 
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image source={data.data.imageSource} style={styles.image} />
        <Text style={styles.title}>{data.data.name}</Text>
        <Text style={styles.description}>{data.data.desc}</Text>
        <Text style={styles.price}>Rp{data.data.price} / 100g</Text>

        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Quantity:</Text>
          <Button style={styles.btn} title="-" onPress={handleDecrement} />
          <TextInput
            style={styles.quantityInput}
            value={quantity.toString()}
            onChangeText={(text) => setQuantity(parseInt(text, 10) || 0)}
          />
          <Button style={styles.btn} title="+" onPress={handleIncrement} />
        </View>
        <Button
          title="Add to Cart"
          onPress={() => {addToCart()}}
          style={styles.addButton}
        />
      </Animated.View>
    </View>
  // <TouchableOpacity onPress={() => navigation.goBack()}>
  //   <Text>Go Back</Text>
  // </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center horizontally
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityLabel: {
    fontSize: 18,
    marginRight: 10,
  },
  quantityInput: {
    fontSize: 18,
    width: 40,
    textAlign: 'center',
  },
  btn:{
    width: 25,
    height: 10,
    paddingHorizontal: 5
  },
  addButton: {
    marginVertical: 20,
  },
});