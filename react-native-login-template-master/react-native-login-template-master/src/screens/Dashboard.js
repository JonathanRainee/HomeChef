import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { NavigationProp } from '@react-navigation/native'
import { FIREBASE_AUTH } from '../../firebase'

export default function Dashboard({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Home Chef</Header>
      <Paragraph>
        Home Chef's home page
      </Paragraph>
      <Button mode="outlined" onPress={()=>FIREBASE_AUTH.signOut()}>
        Logout
      </Button>
    </Background>
  )
}
