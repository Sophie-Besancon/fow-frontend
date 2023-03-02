import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import HomeScreen from './screens/HomeScreen';
import AccountScreen from './screens/AccountScreen';
import BasketScreen from './screens/BasketScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import MarketScreen from './screens/MarketScreen';
import ContinentScreen from './screens/ContinentScreen';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import articles from './reducers/articles';
import users from './reducers/users';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

let basketNumber= 0;
const store = configureStore({
  reducer: { articles, users },
 });




 const HomeNavigator = () => {

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';
        if (route.name === 'Accueil') {
          iconName = 'home';
        } else if (route.name === 'Continent') {
          iconName = 'globe';
        }

        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#FC9F30',
      tabBarInactiveTintColor: '#4B7285',
      headerShown: false,
      tabBarStyle: { display: 'none' },
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Continent" component={ContinentScreen} />
    </Tab.Navigator>
  );
};

const TabNavigator = () => {

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';
        if (route.name === 'Accueil') {
          iconName = 'home';
        } else if (route.name === 'Market') {
          iconName = 'shopping-cart';
        } else if (route.name === 'Panier') {
          iconName = 'shopping-basket';
        } else if (route.name === 'Favoris') {
          iconName = 'heart';
        } else if (route.name === 'Compte') {
          iconName = 'user';
        }

        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#FC9F30',
      tabBarInactiveTintColor: '#4B7285',
      headerShown: false,
    })}>
      <Tab.Screen name="Accueil" component={HomeNavigator} />
      <Tab.Screen name="Market" component={MarketScreen} />
      <Tab.Screen name="Panier" component={BasketScreen} options={{tabBarBadge: `${basketNumber}`}}/>
      <Tab.Screen name="Favoris" component={FavoriteScreen} />
      <Tab.Screen name="Compte" component={AccountScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
  </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
