import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ProductSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.container}>
        {Array.from({ length: 6 }).map((_, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.image} />
            <View style={styles.textContainer}>
              <View style={styles.title} />
              <View style={styles.title} />
              <View style={styles.price} />
              <View style={styles.stock} />
            </View>
          </View>
        ))}
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  card: {
    width: '48%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 5,
  },
  textContainer: {
    marginTop: 10,
  },
  title: {
    width: '80%',
    height: 12,
    borderRadius: 5,
    marginBottom: 5,
  },
  price: {
    width: '50%',
    height: 12,
    borderRadius: 5,
    marginBottom: 5,
  },
  stock: {
    width: '30%',
    height: 12,
    borderRadius: 5,
  },
});

export default ProductSkeleton;
