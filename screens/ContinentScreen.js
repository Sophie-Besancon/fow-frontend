import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import Header from "../components/Header";
import Card from "../components/Card";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ContinentScreen({ navigation }) {
  const [articlesData, setArticlesData] = useState([]);

  const users = useSelector((state) => state.users.value[0]);

  useEffect(() => {
    fetch("https://fow-backend.vercel.app/articles/")
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("continent");
          setArticlesData(data.allArticles);
        }
      });
  }, []);

  const NewCards = articlesData.map((data, i) => {
    if (i === 2 || i === 7 || i === 14) {
      const isLikeinFavorite = users.articleInFavorite.some(
        (article) => article.id === data._id
      );
      return (
        <View style={styles.eachCard} key={i}>
          <View style={styles.backgroundImage}>
            <Text style={styles.newText}>Nouveauté</Text>
          </View>
          <Card
            style={styles.cardImage}
            key={i}
            price={data.price}
            name={data.name}
            image={data.image}
            id={data._id}
            note={data.note}
            description={data.description}
            stock={data.stock}
            categoryName={data.categoryName}
            countryName={data.countryName}
            continentOfCountry={data.continentOfCountry}
            flagOfCountry={data.flagOfCountry}
            isLikeinFavorite={isLikeinFavorite}
          />
        </View>
      );
    }
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Header />
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.backButton}
        activeOpacity={0.8}
      >
        <Ionicons name="md-arrow-back-circle-outline" size={20} color="white" />
        <Text style={styles.textButton}> Retour </Text>
      </TouchableOpacity>
      <ScrollView>{NewCards}</ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    flexDirection: "column",
  },
  textButton: {
    color: "#ffffff",
  },
  backButton: {
    backgroundColor: "#4B7285",
    height: 40,
    margin: 10,
    marginLeft: 20,
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  eachCard: {
    flex: 1,
    position: "relative",
  },
  newText: {
    fontSize: 14,
    color: "white",
    fontWeight: 800,
  },
  backgroundImage: {
    position: "absolute",
    top: 180,
    right: 40,
    zIndex: 9999,
    flex: 1,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 9,
    padding: 5,
    shadowColor: "white",
    shadowRadius: 3,
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 3,
      height: -3,
    },
  },
});
