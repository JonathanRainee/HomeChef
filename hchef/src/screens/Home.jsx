import React, { useState, useEffect } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { NavigationProp } from '@react-navigation/native'
import { FIREBASE_AUTH } from '../../firebase'
import Card  from '../components/Card'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { collection, getDocs, query } from "firebase/firestore";
import { FIREBASE_DB } from '../../firebase'

export default function Home({ navigation }) {

  const [food, setfood] = useState([])

  const getAllFood = async () => {
    const q = query(collection(FIREBASE_DB, 'Foods'))
    let res = await getDocs(q)
    let arr = []
    res.forEach((e) => {
      // console.log(e.);
      arr.push(e)
    })
    setfood(arr)
  }

  useEffect(() => {
    getAllFood()
  }, [])


  return (
    <View>
      {
        food.map((f)=>{
          return(
            <Card key={f.id} name={f.data().name} price={f.data().price} imageSource={f.data().image} />
          )
        })
      }
    </View>
    // <Background>
    //   <Button mode="outlined" onPress={()=>FIREBASE_AUTH.signOut()}>
    //     Logout
    //   </Button>
    // </Background>
  )
}
