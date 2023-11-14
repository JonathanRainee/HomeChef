import { deleteDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FIREBASE_DB } from '../../firebase';
import { FIREBASE_AUTH } from '../../firebase';
import { useNavigation } from '@react-navigation/native';

export const BoughtFoodComponent = ({ item }) => {
  
  const [bgColor, setbgColor] = useState("white")
  const { name, price, quantity, imageSource, id, description } = item
  const currUser = FIREBASE_AUTH.currentUser
  const db = FIREBASE_DB
  
  const navigation = useNavigation()

  const goToGuide = () => {
    if(item.status == "Delivered"){
      navigation.navigate('guide', { item })
    }else{
      console.log(item.status);
      navigation.navigate('status', { productName:name, status:item.status })
    }
  }

  const handleDelete = () => {
    onDelete(id, price);
  };

  useEffect(()=>{
    if(item.status == "Delivered"){
      setbgColor("#4ebf5d");
    }else if(item.status == "Processed"){
      setbgColor("white")
    }else if(item.status == "On Delivery"){
      setbgColor("#f7ce5e")
    }
  }, [])

  return (
    <View style={[styles.cardContainer, {backgroundColor: bgColor}]}>
      <TouchableOpacity style={styles.itemContiner} onPress={goToGuide}>
        <Image source={imageSource} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>{description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  itemContiner:{
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 12,
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