import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { FIREBASE_DB } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import FoodComponent from '../components/FoodComponent';

export const Search = () => {
  const [food, setFood] = useState([])
  const [search, setSearch] = useState("")
  const db = FIREBASE_DB
  
  const getAllFood = async () => {
    const ref = collection(db, 'Foods')
    const keywords = search.split(' ');
    const q = query(collection(db, 'Foods'));

    try {
      const res = await getDocs(q);
      const arr = [];
      res.forEach((e) => {
        arr.push(e);
      });

      const filteredFood = arr.filter((f) =>
        f.data().ingridients.some((ingredient) =>
          ingredient.toLowerCase().includes(search.toLowerCase())
        )
      );

      setFood(filteredFood);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getAllFood()
  }, [search])

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          onChangeText={(text) => setSearch(text)}
          style={styles.input}
          placeholder="Search..."
        />
      </View>

      <ScrollView style={styles.scrollView}>
        {
          (search === '' || food.length === 0) && (
            <View style={styles.centerText}>
              <Text>No results found.</Text>
            </View>
          )
        }
        {
          search !== '' &&
          food.length > 0 &&
          food.map((f) => (
            <FoodComponent
              key={f.id}
              id={f.id}
              name={f.data().name}
              price={f.data().price}
              imageSource={f.data().image}
              desc={f.data().description}
              ingridients={f.data().ingridients}
              instructions={f.data().instructions}
            />
          ))}
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
    zIndex: 1,
    backgroundColor: '#fff', 
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
    paddingTop: 10, 
  },
  content: {
    padding: 10,
  },
  centerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
