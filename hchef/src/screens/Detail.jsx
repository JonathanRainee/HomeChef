import React, { useState, useRef, useEffect } from 'react'
import { TouchableOpacity, View, Text, Image, TextInput, Button, StyleSheet, Animated, Easing } from 'react-native'
import { FIREBASE_AUTH } from '../../firebase';
import { FIREBASE_DB } from '../../firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { theme } from '../core/theme';


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
    await addDoc(collection(db, 'users', currUser.uid, 'cart'), {
      quantity: quantity,
      name: data.data.name,
      price: quantity*data.data.price,
      imageSource: data.data.imageSource,
      description: data.data.desc,
      ingridients: data.data.ingridients,
      instructions: data.data.instructions,
      status: 'inCart'
    })
    navigation.navigate('home')
  }
  
  useEffect(()=>{
    fadeIn()
  }, [])


  return ( 
    <View style={styles.container}>
      <Animated.View style={[{ opacity: fadeAnim}]}>
        <View style={styles.viewContainer}>
          <Image source={data.data.imageSource} style={styles.image} />
          <Text style={styles.title}>{data.data.name}</Text>
          <Text style={styles.description}>{data.data.desc}</Text>
          <Text style={styles.price}>Rp{data.data.price}/g</Text>
        </View>

        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Quantity:</Text>
          <TouchableOpacity style={styles.btn} onPress={handleDecrement} >
            <Text>-</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.quantityInput}
            value={quantity.toString()}
            onChangeText={(text) => setQuantity(parseInt(text, 10) || 0)}
          />
          <TouchableOpacity style={styles.btn} title="+" onPress={handleIncrement}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          title="Add to Cart"
          onPress={() => {addToCart()}}
          style={styles.addButton}
        >
          <Text>Add to cart</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  viewContainer:{
    flex: 1,
    width: '100%',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  image: {
    height: '250px',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    maxWidth: '80%',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    justifyContent: 'center',
    textAlign: 'center',
    maxWidth: '80%',
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
    justifyContent: 'center',
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
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    paddingHorizontal: 5,
    backgroundColor: '#4ebf5d',
    borderRadius: 5
  },
  addButton: {
    color: 'black',
    width: '100%',
    height: 30,
    marginVertical: 20,
    color: "#000000",
    backgroundColor: '#4ebf5d',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
  },
});