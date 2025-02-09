import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { fetchData } from '../../utils';

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: object;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: object[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: object[];
  images: string[];
  thumbnail: string;
}

type ProductDetailRouteProp = RouteProp<{ ProductDetail: { id: number } }, 'ProductDetail'>;

const ProductDetail: React.FC = () => {
  const route = useRoute<ProductDetailRouteProp>();
  const { id } = route.params;

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
    setIsFavorited(!isFavorited);
  };

  useEffect(() => {
    fetchProductDetail(id);
  }, [id]);

  const renderSkeletonLoading = () => (
    <View style={styles.skeleton}>
      <View style={styles.skeletonImage} />
      <View style={styles.skeletonText} />
      <View style={styles.skeletonText} />
      <View style={styles.skeletonText} />
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
  skeletonImage: {
    width: 300,
    height: 200,
    backgroundColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
  skeletonText: {
    width: '80%',
    height: 20,
    backgroundColor: '#ccc',
    marginBottom: 8,
    borderRadius: 4,
  },
});

export default ProductDetail;
