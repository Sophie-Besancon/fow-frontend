import { StyleSheet, SafeAreaView, ScrollView, Alert } from "react-native";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import { useNavigation, useIsFocused } from "@react-navigation/native";

export default function FavoriteScreen() {
  const users = useSelector((state) => state.users.value[0]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      if (!users.token) {
        Alert.alert(
          "Inscrivez-vous",
          "Veuillez vous connecter pour afficher vos favoris.",
          [
            {
              text: "Retour",
              style: "cancel",
            },
            {
              text: "S'inscrire",
              onPress: () => navigation.navigate("Compte"),
            },
          ]
        );
      }
    }
  }, [isFocused]);

  const cards = users.articleInFavorite.map((data, i) => {
    return (
      <Card
        key={i}
        price={data.price}
        name={data.name}
        image={data.image}
        id={data.id}
        note={data.note}
        description={data.description}
        stock={data.stock}
        categoryName={data.categoryName}
        countryName={data.countryName}
        continentOfCountry={data.continentOfCountry}
        flagOfCountry={data.flagOfCountry}
        isLikeinFavorite
      />
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView}>{cards}</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "100%",
  },
});
