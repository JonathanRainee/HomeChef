import {createContext, useContext, useEffect, useState} from 'react'
import {createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, 
        signOut, 
        onAuthStateChanged} from "firebase/auth";  
import {FIREBASE_AUTH} from '../firebase'
import { collection, query, where } from "firebase/firestore";

const UseContext = createContext()
let userID = ''

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState({});

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
    }

    const signIn = (email, password) => {
      try {
        signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      } catch (error) {
        console.log(error);
      }
    }

    const logOut = () => {
        return signOut(FIREBASE_AUTH)
    }

    useEffect(() => {
        const unsubscrice = onAuthStateChanged(FIREBASE_AUTH, (currUser) => {
            setUser(currUser)
        })
        return () => {
            unsubscrice();
        }
    }, []);

    return (
        <UseContext.Provider value={{createUser, user, logOut, signIn, userID}}>
            {children}
        </UseContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UseContext)
}