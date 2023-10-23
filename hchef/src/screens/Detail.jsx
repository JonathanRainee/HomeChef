import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

export const Detail = ({ route }) => {

  const data = route.params
  console.log(data);

  return ( 
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <Text>Go Back</Text>
  </TouchableOpacity>
  )
}
