import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchScreen = ({ navigation }) => {
  const [country, setCountry] = useState('');
  const [university, setUniversity] = useState('');
  const [results, setResults] = useState([]);

  const searchUniversities = async () => {
    let url = `http://universities.hipolabs.com/search?`;
    if (country) url += `country=${country}&`;
    if (university) url += `name=${university}`;
    const response = await axios.get(url);
    setResults(response.data);
  };

  const saveFavorite = async (name, webPage) => {
    const favorite = { name, webPage };
    let favorites = await AsyncStorage.getItem('favorites');
    favorites = favorites ? JSON.parse(favorites) : [];
    favorites.push(favorite);
    await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  };

  return (
    <View>
      <Text>Country Name</Text>
      <TextInput value={country} onChangeText={setCountry} />
      <Text>University Name</Text>
      <TextInput value={university} onChangeText={setUniversity} />
      <Button title="Pesquisar" onPress={searchUniversities} />
      <Button title="Favoritos" onPress={() => navigation.navigate('Favorites')} />
      <FlatList
        data={results}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => saveFavorite(item.name, item.web_pages[0])}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SearchScreen;
