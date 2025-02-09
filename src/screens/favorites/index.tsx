import React from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

type RootStackParamList = {
  Favorites: undefined;
  ProductDetail: { id: number };
};

const Favorites = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { favorites } = useSelector((state: RootState) => state.favorites);

  const navigateToDetail = (productId: number) => {
    navigation.navigate('ProductDetail', { id: productId });
  };

  const renderFavoriteItem = ({ item }: { item: Product }) => {
    return (
      <TouchableOpacity onPress={() => navigateToDetail(item.id)} style={styles.favoriteItem}>
        <Image source={{ uri: item.images[0] }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  if(favorites.length === 0) {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center", marginHorizontal: 20}}>
        <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 20}}>You don't have any favorites yet. You can view your added favorites here.</Text>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  favoriteItem: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    padding: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  price: {
    fontSize: 16,
    fontWeight: '400',
    color: '#555',
  },
});

export default Favorites;
