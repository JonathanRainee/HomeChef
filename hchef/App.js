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
import { Checkout } from './src/screens/Checkout'
import { MyOrder } from './src/screens/MyOrder'
import { Guide } from './src/screens/Guide'
import { Status } from './src/screens/Status'
import { Search } from './src/screens/Search'
import { UserContext } from './src/context/UserContext'
import { EditProfile } from './src/screens/EditProfile'

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
        setuser(user)
      }else{
        setuser(null)
      }
    })
  }, [])

  return (
    <Provider theme={theme}>
      <NavigationContainer>
        {/* <UserContext.Provider value={{user}}> */}
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

              <Stack.Screen name='editProfile' component={EditProfile} options={{title: 'Back', headerShown: true}}/>
              <Stack.Screen name='search' component={Search} options={{title: 'Back', headerShown: true}}/>
              <Stack.Screen name='status' component={Status} options={{title: 'Back', headerShown: true}}/>
              <Stack.Screen name='guide' component={Guide} options={{title: 'Back', headerShown: true}}/>
              <Stack.Screen name='detail' component={Detail} options={{title: 'Add', headerShown: true}}/>
              <Stack.Screen name='Checkout' component={Checkout} options={{title: 'Checkout', headerShown: true}}/>
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
              <Stack.Screen name="MyOrder" component={MyOrder} />
              <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen}/>
          </Stack.Navigator>
        {/* </UserContext.Provider> */}
      </NavigationContainer>
    </Provider>
  )
}
