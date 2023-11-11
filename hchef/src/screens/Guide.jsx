import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

export const Guide = ({ route }) => {
  const { item } = route.params; // Assuming 'item' is passed as a parameter

  return (
    <ScrollView style={styles.container}>
      <Image source={item.imageSource} style={styles.image} />
      
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Ingredients:</Text>
          {item.ingridients.map((ingredient, index) => (
            <Text key={index} style={styles.content}>
              - {ingredient}
            </Text>
          ))}
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Instructions:</Text>
          {item.instructions.map((instruction, index) => (
            <Text key={index} style={styles.content}>
              {index + 1}. {instruction}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
  },
});