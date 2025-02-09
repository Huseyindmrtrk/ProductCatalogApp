import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home';
import ProductDetail from '../screens/productDetail';
type RootStackParamList = {
  Home: undefined;
  ProductDetail: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
// const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStack
