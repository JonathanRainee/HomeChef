import { collection, deleteDoc, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebase';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BoughtFoodComponent } from '../components/BoughtFoodComponent';
import { MaterialIcons } from '@expo/vector-icons';

export const MyOrder = () => {
  const [cart, setCart] = useState([]);
  const currUser = FIREBASE_AUTH.currentUser;
  const db = FIREBASE_DB;
  const navigation = useNavigation();

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    address: '',
  });

  const userDocRef = doc(db, 'users', currUser.uid)
  const [currentUser, setCurrentUser] = useState()
  const getUserData = async () => {
    if (currUser) {
      const userDocSnapshot = await getDoc(userDocRef);
      const userData = userDocSnapshot.data();
      setCurrentUser(userData); 
    }
  };

  useEffect(() => {
    getUserData();
  }, [currUser]);

  useEffect(() => {
    const cartRef = collection(db, 'users', currUser.uid, 'cart');
    const q = query(cartRef, where('status', 'in', ['Delivered', 'On Delivery', 'Processed']));
    const unsubscribeCart = onSnapshot(q, (snapshot) => {
      const arr = [];
      snapshot.docs.forEach((doc) => {
        arr.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setCart(arr);
    });

    return () => {
      unsubscribeCart();
    };
  }, []);

  const handleItemDelete = async (itemId, itemPrice) => {
    await deleteDoc(doc(FIREBASE_DB, 'users', currUser.uid, 'cart', itemId));
  };

  const goToCheckout = () => {
    navigation.navigate('Checkout');
  };

  const goToEditProfile = () => {
    navigation.navigate('editProfile', {currentUser});
  };

  if (cart.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text>You didn't have any item in your cart</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.profileSection}>
          <View>
            <Text>Name: {currentUser.username}</Text>
            <Text>Email: {currentUser.email}</Text>
            <Text>Address: {currentUser.address != "" ? currentUser.address : "not set yet"}</Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={goToEditProfile} style={{marginBottom: 10}}>
              <MaterialIcons name="edit" size={24} color="black"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => FIREBASE_AUTH.signOut()}>
              <MaterialIcons name="logout" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView>
          {cart.map((e) => {
            return <BoughtFoodComponent key={e.id} item={e} />;
          })}
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    padding: 16,
    backgroundColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'collumn',
    marginBottom: 10,
  },
  section: {
    position: 'sticky',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  cartItems: {
    flex: 1,
    alignItems: 'flex-start',
  },
  buttonStyle: {
    backgroundColor: '#4ebf5d',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold',
  },
  
});
