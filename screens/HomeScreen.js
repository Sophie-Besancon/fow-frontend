import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import Header from "../components/Header";
import Carousel from "react-native-reanimated-carousel";

export default function HomeScreen({ navigation }) {
  const [searchProduct, setSearchProduct] = useState("");

  const handleSearch = () => {
    navigation.navigate("Market", {
      screen: "Store",
      params: { name: searchProduct },
    });
    setSearchProduct("");
  };

  const handleContinent = () => {
    navigation.navigate("Continent");
  };

  const handleNavigation = (destination) => {
    navigation.navigate("Market", {
      screen: "Store",
      params: { destination: destination },
    });
  };
  const width = Dimensions.get("window").width;
  const images = [
    <TouchableOpacity onPress={() => handleNavigation("Europe")}>
      <Image
        style={styles.image}
        source={require("../assets/VoyageEurope.jpg")}
        resizeMode="cover"
      />
    </TouchableOpacity>,
    <TouchableOpacity onPress={() => handleNavigation("Océanie")}>
      <Image
        style={styles.image}
        source={require("../assets/VoyageOceanie.jpg")}
        resizeMode="cover"
      />
    </TouchableOpacity>,
    <TouchableOpacity onPress={() => handleNavigation("Amérique")}>
      <Image
        style={styles.image}
        source={require("../assets/VoyageAmerique.jpg")}
        resizeMode="cover"
      />
    </TouchableOpacity>,
    <TouchableOpacity onPress={() => handleNavigation("Asie")}>
      <Image
        style={styles.image}
        source={require("../assets/VoyageAsie.jpg")}
        resizeMode="cover"
      />
    </TouchableOpacity>,
    <TouchableOpacity onPress={() => handleNavigation("Afrique")}>
      <Image
        style={styles.image}
        source={require("../assets/VoyageAfrique.jpg")}
        resizeMode="cover"
      />
    </TouchableOpacity>,
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Header />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Rechercher un produit"
          onChangeText={(value) => setSearchProduct(value)}
          value={searchProduct}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => handleSearch()}
          style={styles.inputButton}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Rechercher</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => handleContinent()}
        style={styles.continentButton}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Découvrez nos nouveautés 🎉 </Text>
      </TouchableOpacity>
      <Carousel
        loop
        width={width}
        height={width * 2}
        autoPlay={true}
        pagingEnabled
        data={images}
        scrollAnimationDuration={2500}
        renderItem={({ index }) => images[index]}
        style={styles.carousel}
      />
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
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    backgroundColor: "#ffffff",
    paddingLeft: 10,
    marginTop: 15,
    borderRadius: 8,
    borderColor: "#4B7285",
    borderWidth: 1,
  },
  inputButton: {
    backgroundColor: "#4B7285",
    height: 40,
    margin: 5,
    padding: 10,
    borderRadius: 8,
  },
  textButton: {
    color: "#ffffff",
    fontSize: 16,
  },
  continentButton: {
    backgroundColor: "#FC9F30",
    justifyContent: "center",
    borderLeftWidth: 3,
    borderRightWidth: 1.5,
    borderTopWidth: 1.5,
    borderBottomWidth: 3,
    borderColor: "white",
    height: 60,
    margin: 25,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#FC9F30",
    shadowRadius: 3,
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 7,
      height: -7,
    },
  },
  image: {
    height: "62%",
    width: "90%",
    borderRadius: 40,
    margin: 15,
  },
  carousel: {
    shadowColor: "grey",
    shadowRadius: 5,
    shadowOpacity: 0.9,
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
});
