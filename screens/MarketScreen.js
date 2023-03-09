import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  ScrollView,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Header from "../components/Header";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function MarketScreen({ route, navigation }) {
  const users = useSelector((state) => state.users.value[0]);
  const [articlesData, setArticlesData] = useState([]);
  const [continent, setContinent] = useState(null);
  const [category, setCategory] = useState(null);
  const [searchName, setSearchName] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [orderPrice, setOrderPrice] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const seeAll = "voir tout";
  const selectContinent = [
    seeAll,
    "Afrique",
    "Amérique",
    "Asie",
    "Europe",
    "Océanie",
  ];
  const selectCategory = [seeAll, "sucré", "salé", "boisson"];

  // Se charge d'enlever les valeurs entrées par l'utilisateur lorsque ce dernier sort de l'ecran
  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) {
      navigation.setParams({ destination: undefined, name: undefined });
      setContinent(null);
      setCategory(null);
      setSearchName(null);
    }
  }, [isFocused]);
  //useEffet qui détecte un params venu depuis HomeScreen (click sur une image de continent ou recherche)
  useEffect(() => {
    setContinent(route.params?.destination);
    setSearchName(route.params?.name);
  }, [route.params?.destination, route.params?.name]);

  //useEffect qui appelle une route pour récuperer les articles en fonction des paramètres continent et catégorie
  //par defaut, si pas de catégorie sélectionner, tous les articles du site seront renvoyés
  useEffect(() => {
    setIsLoading(true);
    fetch("https://fow-backend.vercel.app/articles/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        continent: continent,
        category: category,
        name: searchName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setArticlesData(data.filteredArticles);
          setIsLoading(false);
        }
      });
  }, [continent, category, searchName]);

  const cards = articlesData.map((data, i) => {
    const isLikeinFavorite = users.articleInFavorite.some(
      (article) => article.id === data._id
    );
    return (
      <Card
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
    );
  });

  //Permet de trier les articles par prix
  const sortByPrice = () => {
    setOrderPrice(!orderPrice);
    const articlesListCopy = [...articlesData];
    if (orderPrice === false) {
      articlesListCopy.sort((a, b) => a.price - b.price);
    } else {
      articlesListCopy.sort((a, b) => b.price - a.price);
    }
    setArticlesData(articlesListCopy);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Header />
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        accessible={false}
      >
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Rechercher un produit"
            onChangeText={(value) => setSearchName(value)}
            value={searchName}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
            }}
            style={styles.inputButton}
            activeOpacity={0.8}
          >
            <Text style={styles.textButton}>Rechercher</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.filteredPart}>
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={styles.filterButton}
          activeOpacity={0.8}
        >
          <AntDesign name="filter" size={20} color="white" />
          <Text style={styles.textButton}> Filtrer </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => sortByPrice()}
          style={styles.filterButton}
          activeOpacity={0.8}
        >
          <FontAwesome name={"sort"} size={20} color={"white"} />
          <Text style={styles.textButton}> Trier par prix </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : cards.length > 0 ? (
          cards
        ) : (
          <Text>Aucun article disponible</Text>
        )}
      </ScrollView>
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => setModalVisible(!modalVisible)}
          >
            <View style={styles.outsideCloseBackground} />
          </TouchableWithoutFeedback>

          <View style={styles.modalView}>
            <Text style={styles.modalText}>Par continent</Text>
            <SelectDropdown
              buttonStyle={styles.buttonStyle}
              dropdownStyle={styles.dropdownStyle}
              rowTextStyle={styles.rowTextStyle}
              data={selectContinent}
              onSelect={(selectedItem, index) => {
                selectedItem !== seeAll
                  ? setContinent(selectedItem)
                  : setContinent(null);
              }}
              defaultButtonText={"Sélectionne un continent"}
              defaultValue={continent}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
            <Text style={styles.modalText}>Par catégorie</Text>
            <SelectDropdown
              buttonStyle={styles.buttonStyle}
              dropdownStyle={styles.dropdownStyle}
              rowTextStyle={styles.rowTextStyle}
              data={selectCategory}
              onSelect={(selectedItem, index) => {
                selectedItem !== seeAll
                  ? setCategory(selectedItem)
                  : setCategory(null);
              }}
              defaultButtonText={"Sélectionne une catégorie"}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Voir les produits</Text>
            </Pressable>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
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
  input: {
    flex: 1,
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
    alignSelf: "center",
    textAlign: "center",
    fontSize: 16,
  },
  filteredPart: {
    flexDirection: "row",
  },
  filterButton: {
    backgroundColor: "#4B7285",
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignSelf: "flex-start",
  },

  outsideCloseBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    marginTop: 230,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#4B7285",
    alignSelf: "flex-end",
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 10,
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold",
    color: "#4B7285",
  },
  rowStyle: {
    fontSize: 8,
  },
  rowTextStyle: {
    borderRadius: 40,
    fontSize: 16,
  },
  dropdownStyle: {
    borderRadius: 8,
    borderColor: "#4B7285",
    borderWidth: 2,
  },
  buttonStyle: {
    backgroundColor: "white",
    borderRadius: 8,
    borderColor: "#4B7285",
    borderWidth: 1,
    width: "100%",
    height: 40,
  },
});
