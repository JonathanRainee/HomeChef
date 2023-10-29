import React from 'react'
import { FIREBASE_AUTH } from '../../firebase'
import { Text, TouchableOpacity, View } from 'react-native'

export const Order = ({navigation}) => {
  return (
    <View>
      <TouchableOpacity onPress={()=>FIREBASE_AUTH.signOut()}>
        <Text>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  )
}
