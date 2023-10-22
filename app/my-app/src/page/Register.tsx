import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../firebase'

export const Register = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setloading] = useState(false)
  const auth = FIREBASE_AUTH

  const onSignUpPressed = async () => {
    setloading(true)
    try {
      const resp = await createUserWithEmailAndPassword(auth, email, password)
      alert('Registered succesfully')
    } catch (error) {
      alert('Register failed: ')
    } finally {
      setloading(false)
    }
  }


  console.log("njk");
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl">Register</h1>
      <div className="mt-4 flex flex-col">
      </div>
    </div>
  )
}
