import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home';
import ProductDetail from '../screens/productDetail';
import Favorites from '../screens/favorites';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

type RootStackParamList = {
  Home: undefined;
  ProductDetail: { id: number };
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Favorites" component={Favorites} />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={({ navigation }) => ({
            header: () => (
              <View style={styles.header}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
                  <FastImage source={require('../assets/left-arrow.png')}
                  style={{aspectRatio: 1, width: 20, marginHorizontal: 10}}
                  />
                </TouchableOpacity>
                <Text style={styles.headerText}>Product Detail</Text>
              </View>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    fontSize: 16,
    color: '#007BFF',
    marginRight: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default MainStack;
