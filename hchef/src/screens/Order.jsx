import React from 'react'
import { FIREBASE_AUTH } from '../../firebase'

export const Order = ({navigation}) => {
  return (
    <div>
      <button onClick={()=>FIREBASE_AUTH.signOut()}>Logout</button>
    </div>
  )
}
