import React, { useState, useEffect } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { NavigationProp } from '@react-navigation/native'
import { FIREBASE_AUTH } from '../../firebase'
import FoodComponent  from '../components/FoodComponent'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { collection, getDocs, query } from "firebase/firestore";
import { FIREBASE_DB } from '../../firebase'
import Home from './Home'
import { Tabs } from '../components/Tabs'
import { Order } from './Order'
import { Cart } from './Cart'
import { Profile } from './Profile'

export default function Dashboard({ navigation }) {

  const [activeTab, setActiveTab] = useState('Home');

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

  const TabBar = () => {
  
    return (
      <View style={styles.tabBarContainer}>
        <TouchableOpacity onPress={() => handleTabPress('Home')} style={[styles.tab, activeTab === 'Home' ? styles.activeTab : null]}>
          <Text style={activeTab === 'Home' ? styles.activeTabText : styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('Order')} style={[styles.tab, activeTab === 'Order' ? styles.activeTab : null]}>
          <Text style={activeTab === 'Order' ? styles.activeTabText : styles.tabText}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('Profile')} style={[styles.tab, activeTab === 'Profile' ? styles.activeTab : null]}>
          <Text style={activeTab === 'Profile' ? styles.activeTabText : styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderTabContent = () => {
    if (activeTab === 'Home') {
      return <Home />;
    } else if (activeTab === 'Order') {
      return <Cart />;
    } else if (activeTab === 'Profile') {
      return <Profile />;
    } 
  };

  return (
    <View style={styles.container}>
      <TabBar />
      {renderTabContent()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#333',
    alignItems: 'center',
  },
  tab: {
    padding: 10,
  },
  activeTab: {
    backgroundColor: '#555',
  },
  tabText: {
    color: 'white',
  },
  activeTabText: {
    color: 'orange',
  },
});
