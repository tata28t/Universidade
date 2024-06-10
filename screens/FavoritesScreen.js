import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      let favorites = await AsyncStorage.getItem('favorites');
      favorites = favorites ? JSON.parse(favorites) : [];
      setFavorites(favorites);
    };
    fetchFavorites();
  }, []);

  const removeFavorite = async (webPage) => {
    let favorites = await AsyncStorage.getItem('favorites');
    favorites = favorites ? JSON.parse(favorites) : [];
    favorites = favorites.filter(fav => fav.webPage !== webPage);
    await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    setFavorites(favorites);
  };

  return (
    <View>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.webPage}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => removeFavorite(item.webPage)}>
            <Text>{item.webPage}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default FavoritesScreen;
