import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import AccountScreen from "./screens/AccountScreen";
import BasketScreen from "./screens/BasketScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import MarketScreen from "./screens/MarketScreen";
import ContinentScreen from "./screens/ContinentScreen";
import ArticleScreen from "./screens/ArticleScreen";
import PaymentScreen from "./screens/PaymentScreen";
import ConfirmationScreen from "./screens/ConfirmationScreen";
import OrderConnectionScreen from "./screens/OrderConnectionScreen";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import users from "./reducers/users";

import { LogBox } from "react-native";
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const store = configureStore({
  reducer: { users },
});

const HomeNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";
          if (route.name === "Accueil") {
            iconName = "home";
          } else if (route.name === "Continent") {
            iconName = "globe";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FC9F30",
        tabBarInactiveTintColor: "#4B7285",
        headerShown: false,
        tabBarStyle: { display: "none" },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Continent" component={ContinentScreen} />
    </Tab.Navigator>
  );
};

const MarketNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";
          if (route.name === "Market") {
            iconName = "shopping-cart";
          } else if (route.name === "Article") {
            iconName = "";
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FC9F30",
        tabBarInactiveTintColor: "#4B7285",
        headerShown: false,
        tabBarStyle: { display: "none" },
      })}
    >
      <Tab.Screen name="Store" component={MarketScreen} />
      <Tab.Screen name="Article" component={ArticleScreen} />
    </Tab.Navigator>
  );
};

const BasketNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";
          if (route.name === "Panier2") {
            iconName = "shopping-basket";
          } else if (route.name === "Connexion") {
            iconName = "user";
          } else if (route.name === "Payment") {
            iconName = "money";
          } else if (route.name === "Confirmation") {
            iconName = "check";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FC9F30",
        tabBarInactiveTintColor: "#4B7285",
        headerShown: false,
        tabBarStyle: { display: "none" },
      })}
    >
      <Tab.Screen name="Panier2" component={BasketScreen} />
      <Tab.Screen name="Connexion" component={OrderConnectionScreen} />
      <Tab.Screen name="Payment" component={PaymentScreen} />
      <Tab.Screen name="Confirmation" component={ConfirmationScreen} />
    </Tab.Navigator>
  );
};

const TabNavigator = () => {
  const users = useSelector((state) => state.users.value[0]);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";
          if (route.name === "Accueil") {
            iconName = "home";
          } else if (route.name === "Market") {
            iconName = "shopping-cart";
          } else if (route.name === "Panier") {
            iconName = "shopping-basket";
          } else if (route.name === "Favoris") {
            iconName = "heart";
          } else if (route.name === "Compte") {
            iconName = "user";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FC9F30",
        tabBarInactiveTintColor: "#4B7285",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Accueil" component={HomeNavigator} />
      <Tab.Screen name="Market" component={MarketNavigator} />
      <Tab.Screen
        name="Panier"
        component={BasketNavigator}
        options={{
          tabBarBadge: users.articleInBasket.length,
          // Lorsque l'utilisateur revient sur son panier ça reinitialise toujours à la première page du panier
          // Pour ne pas le laisser bloqué a l"ecran connection ou paiement
          // https://stackoverflow.com/questions/61488426/how-to-set-always-first-screen-of-stack-navigator-inside-tab-navigator-react-nav
          unmountOnBlur: true,
        }}
      />
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
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
