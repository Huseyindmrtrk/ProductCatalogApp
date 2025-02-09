import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FastImage from 'react-native-fast-image';
import ProductSkeleton from '../../components/ProductSkeleton.tsx';
import axios from 'axios';
import SearchBox from '../../components/SearchBox.tsx';
import ScrollToTopButton from '../../components/ScrollToTopButton';
import { Product } from "../../components/types.ts"

type RootStackParamList = {
  ProductDetail: { id: number };
  Favorites: undefined;
};

const Home: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>>();

  const fetchProducts = async (pageNumber: number) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://dummyjson.com/products?limit=30&skip=${(pageNumber - 1) * 30}`);
      if (pageNumber === 1) {
        setData(response.data.products);
      } else {
        setData((prevProducts) => [...prevProducts, ...response.data.products]);
      }
    } catch (err) {
      setError("Ürünleri yüklerken bir hata oluştu.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery === '') {
        setFilteredData(data);
      } else {
        setFilteredData(data.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase())));
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, data]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setPage(1);
    setData([]);
  };

  const loadMoreData = () => {
    if (!isLoading) {
      setPage(page + 1);
    }
  };

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ProductDetail', { id: item.id })}>
      <FastImage source={{ uri: item.thumbnail }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text>{`Price: $${item.price}`}</Text>
      <Text>{`Stock: ${item.stock}`}</Text>
    </TouchableOpacity>
  );

  const handleScroll = (event: any) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    setShowScrollToTop(contentOffsetY > 200);
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  };

  let flatListRef = React.createRef<FlatList>();

  return (
    <View style={styles.container}>
      <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 10}}>
        <Text style={{fontWeight: "600", fontSize: 20}}>Home</Text>
        <TouchableOpacity
          style={{ alignSelf: "flex-end", height: 40, backgroundColor: "#bbefe5", width: 60, justifyContent: "center", alignItems: "center" }}
          onPress={() => navigation.navigate('Favorites')}
        >
          <Text>Favorites</Text>
        </TouchableOpacity>
      </View>
      <SearchBox value={searchQuery} onChangeText={setSearchQuery} />
      {error && <Text style={styles.errorText}>{error}</Text>}
      {isLoading && page === 1 && (
        <View style={styles.skeletonContainer}>
          {[...Array(6)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </View>
      )}
      <FlatList
        ref={flatListRef}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.8}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
        onScroll={handleScroll}
      />
      {showScrollToTop && <ScrollToTopButton onPress={scrollToTop} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
  skeletonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default Home;
