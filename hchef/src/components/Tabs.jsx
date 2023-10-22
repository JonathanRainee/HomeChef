import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export const Tabs = () => {

  const [activeTab, setActiveTab] = useState('Home');
  
  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

  const renderTabContent = () => {
    if (activeTab === 'Home') {
      return <TabContent1 />;
    } else if (activeTab === 'Home') {
      return <TabContent2 />;
    }
  };

  return (
    <View style={styles.tabBarContainer}>
        <TouchableOpacity onPress={() => handleTabPress('Home')} style={[styles.tab, activeTab === 'Home' ? styles.activeTab : null]}>
          <Text style={activeTab === 'Home' ? styles.activeTabText : styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('Order')} style={[styles.tab, activeTab === 'Order' ? styles.activeTab : null]}>
          <Text style={activeTab === 'Order' ? styles.activeTabText : styles.tabText}>Order</Text>
        </TouchableOpacity>
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