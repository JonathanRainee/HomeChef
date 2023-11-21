import React, { createContext, useContext, useEffect, useState } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

const MyContext = createContext();

const UserContext = ({ children }) => {
  const DB = FIREBASE_DB;
  const currUser = FIREBASE_AUTH.currentUser;

  const userDocRef = doc(DB, 'users', currUser?.uid); // Use currUser?.uid to handle the case where currUser might be undefined
  const [currentUser, setCurrentUser] = useState();

  const updateUser = (newUser) => {
    setCurrentUser(newUser);
  };

  const getUserData = async () => {
    if (currUser) {
      const userDocSnapshot = await getDoc(userDocRef);
      setCurrentUser(userDocSnapshot.data());
    }
  };

  useEffect(() => {
    getUserData();
  }, [currUser]);

  return (
    <MyContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </MyContext.Provider>
  );
};

const useCurrentUser = () => {
  return useContext(MyContext);
};

export { UserContext, useCurrentUser };
