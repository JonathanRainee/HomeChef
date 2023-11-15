import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';

export const Search = () => {
  return (
    <View style={styles.container}>
      {/* Sticky Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          // Add any other TextInput props as needed
        />
      </View>

      {/* ScrollView */}
      <ScrollView style={styles.scrollView}>
        {/* Add your scrollable content here */}
        <Text style={styles.content}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...
        </Text>
        {/* Add more content as needed */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  searchBar: {
    position: 'sticky',
    top: 0,
    zIndex: 1, // To ensure the search bar stays above the ScrollView
    backgroundColor: '#fff', // Add your preferred background color
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // Add your preferred border color
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  scrollView: {
    flex: 1,
    paddingTop: 10, // Adjust as needed to avoid content overlapping with the sticky search bar
  },
  content: {
    padding: 10,
  },
});
