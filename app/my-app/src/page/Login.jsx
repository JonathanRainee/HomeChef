import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { UserAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

  const { user, signIn } = UserAuth();
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [error, setError] = useState('')
  const [loading, setloading] = useState(false)
  const navigate = useNavigate()
  const auth = FIREBASE_AUTH

  const onLoginPressed = async () => {
    setloading(true)
    try {
      const resp = await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      alert('Login failed')
    } finally {
      setloading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signIn(email, password)
      navigate(`/Home`)
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
    console.log(error)
}

  return (
    <div className='bg-gray-800'>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
              <div className="w-full">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input onChange={(e)=>setEmail(e.target.value)} type="email" name="email" id="email" className="w-full bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required/>
              </div>
              <div className="w-full">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input onChange={(e)=>setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
              </div>
              <div className="flex items-center justify-between">
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
              </p>
            </form>
            {
                error == null ? (<button className="bg-red w-96 text-khaki font-bold py-2 px-4 mt-2 border-b-4 border-red rounded " disabled>Wrong credentials</button>) :
                null
            }
          </div>
        </div>
      </div>
    </div>
  )
}
