import React, { useState, useEffect } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { NavigationProp } from '@react-navigation/native'
import { FIREBASE_AUTH } from '../../firebase'
import FoodComponent  from '../components/FoodComponent'
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import { collection, getDocs, query } from "firebase/firestore";
import { FIREBASE_DB } from '../../firebase'

export default function Home({ navigation }) {

  const [food, setfood] = useState([])

  const getAllFood = async () => {
    const q = query(collection(FIREBASE_DB, 'Foods'))
    let res = await getDocs(q)
    let arr = []
    res.forEach((e) => {
      arr.push(e)
    })
    setfood(arr)
  }

  useEffect(() => {
    getAllFood()
  }, [])



  return (
    <View style={styles.container}>
      <ScrollView>
        {
          food.map((f)=>{
            return(
              <FoodComponent key={f.id} id={f.id} name={f.data().name} price={f.data().price} imageSource={f.data().image} desc={f.data().description} ingridients={f.data().ingridients} instructions={f.data().instructions} />
            )
          })
        }
      </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonContainer}>
            <Image style={styles.imageStyle} source={require('../assets/delete.png')}/>
          </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  section:{
    position: 'absolute',
    right: 60,
    bottom: 60
  },  
  buttonContainer: {
      position: 'fixed',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 30,
      bottom: 30,
  },
  imageStyle: {
    width: 30, 
    height: 30, 
  },
});