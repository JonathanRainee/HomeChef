import React, { useEffect, useState } from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
} from './src/screens'
import { onAuthStateChanged } from 'firebase/auth'
import { FIREBASE_AUTH } from './firebase'
import { Detail } from './src/screens/Detail'

const Stack = createStackNavigator()
const ProtectedStack = createStackNavigator()

function ProtectedLayout(){
  return(
    <ProtectedStack.Navigator screenOptions={{headerShown: false}}>
      <ProtectedStack.Screen name='home' component={Dashboard} />
    </ProtectedStack.Navigator>
  )
}

export default function App() {

  const [user, setuser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if(user){
        console.log(user);
        setuser(user)
      }else{
        setuser(null)
      }
    })
    // return () => unsubscribe();
  }, [])

  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={user ? 'Dashboard' : 'StartScreen'}
          screenOptions={{
            headerShown: false,
          }}
        >
          {
            user ? (
              <Stack.Screen name="Dashboard" component={ProtectedLayout}/>
              ) : (
                <Stack.Screen name="StartScreen" component={StartScreen}/>
                )
              }
          {/* <Stack.Screen name="Dashboard" component={ProtectedLayout}/> */}
          <Stack.Screen name='detail' component={Detail}/>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
