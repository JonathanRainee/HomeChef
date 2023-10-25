import React from 'react'
import { FIREBASE_AUTH } from '../../firebase'

export const Profile = ({navigation}) => {
  return (
    <div>
      <button onClick={()=>FIREBASE_AUTH.signOut()}>Logout</button>
    </div>
  )
}
