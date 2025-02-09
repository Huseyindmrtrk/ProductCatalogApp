import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../store/favoriteSlice.ts';
import { fetchData } from '../../utils';
import { Product } from '../../components/types.ts';

type ProductDetailRouteProp = RouteProp<{ ProductDetail: { id: number } }, 'ProductDetail'>;

const ProductDetail: React.FC = () => {
  const route = useRoute<ProductDetailRouteProp>();
  const { id } = route.params;

  const dispatch = useDispatch();
  const { favorites } = useSelector((state: any) => state.favorites);

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  const fetchProductDetail = async (id: number) => {
    try {
      const result: Product | null = await fetchData(`products/${id}`);
      if (result) {
        setProduct(result);
      } else {
        setError('Product not found');
      }
    } catch (err) {
      setError('Error fetching product details');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = () => {
    if (isFavorited) {
      dispatch(removeFavorite(id));
    } else {
      if (product) {
        dispatch(addFavorite(product));
      }
    }
    setIsFavorited(!isFavorited);
  };
  useEffect(() => {
    fetchProductDetail(id);
  }, [id]);

  useEffect(() => {
    setIsFavorited(favorites.some((fav: Product) => fav.id === id));
  }, [favorites, id]);

  const renderSkeletonLoading = () => (
    <View style={styles.skeleton}>
      <View style={styles.skeletonCarousel} />
      <View style={styles.skeletonTitleContainer}>
        <View style={styles.skeletonTitleLine} />
        <View style={[styles.skeletonTitleLine, { marginTop: 4 }]} />
      </View>
      <View style={styles.skeletonPrice} />
      <View style={styles.skeletonDescriptionContainer}>
        <View style={styles.skeletonDescriptionLine} />
        <View style={[styles.skeletonDescriptionLine, { marginTop: 4 }]} />
        <View style={[styles.skeletonDescriptionLine, { marginTop: 4 }]} />
        <View style={[styles.skeletonDescriptionLine, { marginTop: 4 }]} />
      </View>
      <View style={styles.skeletonStock} />
    </View>
  );

  if (isLoading) {
    return renderSkeletonLoading();
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  const renderPhotos = ({ item }: { item: string }) => {
    return (
      <View>
        <Image source={{ uri: item }} style={styles.image} resizeMode="contain" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {product && (
        <View>
          <FlatList
            pagingEnabled
            horizontal
            data={product.images}
            renderItem={renderPhotos}
            keyExtractor={(item, index) => index.toString()}
          />
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.stock}>Stock: {product.stock}</Text>
          <Text>{product.description}</Text>
          <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
            <Text style={styles.favoriteText}>
              {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 4,
  },
  stock: {
    fontSize: 16,
    marginVertical: 4,
  },
  favoriteButton: {
    marginTop: 16,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  favoriteText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  skeleton: {
    flex: 1,
    padding: 16,
  },
  skeletonCarousel: {
    width: '100%',
    height: 200,
    backgroundColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
  skeletonTitleContainer: {
    marginBottom: 8,
  },
  skeletonTitleLine: {
    width: '80%',
    height: 20,
    backgroundColor: '#ccc',
    borderRadius: 4,
  },
  skeletonPrice: {
    width: '40%',
    height: 20,
    backgroundColor: '#ccc',
    borderRadius: 4,
    marginVertical: 8,
  },
  skeletonDescriptionContainer: {
    marginVertical: 8,
  },
  skeletonDescriptionLine: {
    width: '100%',
    height: 14,
    backgroundColor: '#ccc',
    borderRadius: 4,
  },
  skeletonStock: {
    width: '30%',
    height: 20,
    backgroundColor: '#ccc',
    borderRadius: 4,
    marginTop: 8,
  },
});

export default ProductDetail;
