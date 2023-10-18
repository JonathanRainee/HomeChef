import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import tw from 'twrnc'
export default function App() {
  return (
    <View style={tw`flex-1 justify-center items-center bg-black`}>
      <Text style={tw`text-white text-3xl font-bold bg-teal-500 p-3 rounded-lg`}>hello world</Text>
      <StatusBar style="light" />
    </View>
  );
}

