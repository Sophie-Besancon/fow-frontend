import {

  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from "react-native";
import Header from "../components/Header";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { EvilIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  removeArticleInBasket,
  addArticleInBasket,
  addTotalInBasket,
} from "../reducers/users";
import { AntDesign } from "@expo/vector-icons";

export default function BasketScreen({ navigation }) {
  const users = useSelector((state) => state.users.value[0]);
  const dispatch = useDispatch();
  const numberFormatFunction = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  });

  let deliveryCost =
    users.articleInBasket.length === 0 || users.articleInBasket.length > 9
      ? 0
      : 7.99;
  let totalOrder = 0;

  const regroupedArticles = users.articleInBasket.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.name === item.name);
    if (existingItem) {
      existingItem.quantity++;
      existingItem.total += item.price;
    } else {
      acc.push({
        name: item.name,
        quantity: 1,
        total: item.price,
        price: item.price,
      });
    }
    return acc;
  }, []);

  const basketArticles = regroupedArticles.map((data, i) => {
    totalOrder = totalOrder + data.total;
    return (
      <View style={styles.tableContainerRow} key={i}>
        <View style={styles.productProperty}>
          <View style={styles.tableProductTextContainer}>
            <Text style={styles.tableProductText}>{data.name}</Text>
          </View>
        </View>
        <View style={styles.productProperty}>
          <View style={styles.tableProductTextContainer}>
            <View style={styles.number}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => dispatch(removeArticleInBasket(data.name))}
              >
                <AntDesign name="minuscircleo" size={18} color="black" />
              </TouchableOpacity>
              <Text style={styles.tableProductText}>{data.quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() =>
                  dispatch(
                    addArticleInBasket({
                      price: data.price,
                      name: data.name,
                      image: data.image,
                      id: data.id,
                      note: data.note,
                      description: data.description,
                      stock: data.stock,
                      categoryName: data.categoryName,
                      countryName: data.countryName,
                      continentOfCountry: data.continentOfCountry,
                    })
                  )
                }
              >
                <AntDesign name="pluscircleo" size={18} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.productProperty}>
          <View style={styles.tableProductTextContainer}>
            <Text style={styles.tableProductText}>
              {numberFormatFunction.format(data.price)}
            </Text>
          </View>
        </View>
        <View style={styles.productProperty}>
          <View style={styles.tableProductTextContainer}>
            <Text style={styles.tableProductText}>
              {numberFormatFunction.format(data.total)}
            </Text>
          </View>
        </View>
      </View>
    );
  });

  const handleNextStep = () => {
    if (users.articleInBasket.length < 1) {
      Alert.alert(
        "Panier vide",
        "Veuillez d'abord rajouter des éléments au panier",
        [
          {
            text: "Retour",
            style: "cancel",
          },
          { text: "Ok" },
        ]
      );
      return;
    }
    dispatch(addTotalInBasket(totalOrder + deliveryCost));
    if (users.token && users.address.length > 0) {
      navigation.navigate("Payment");
    } else if (users.token && users.address.length <= 0) {
      navigation.navigate("Connexion");
    } else if (!users.token) {
      navigation.navigate("Connexion");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Header />
      <View style={styles.statusContainer}>
        <FontAwesome
          name="shopping-basket"
          size={20}
          color="#FC9F30"
          style={styles.deleteIcon}
        />
        <FontAwesome
          name="user"
          size={20}
          color="#4B7285"
          style={styles.deleteIcon}
        />
        <FontAwesome
          name="money"
          size={20}
          color="#4B7285"
          style={styles.deleteIcon}
        />
      </View>
      <Text style={styles.textContainer}>Résumé de votre commande</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.tableContainer}>
          <View style={styles.tableContainerRowTitle}>
            <View style={styles.tableTitleTextContainer}>
              <Text style={styles.tableTitleText}>Produit</Text>
            </View>
            <View style={styles.tableTitleTextContainer}>
              <Text style={styles.tableTitleText}>Quantité</Text>
            </View>
            <View style={styles.tableTitleTextContainer}>
              <Text style={styles.tableTitleText}>PU (€)</Text>
            </View>
            <View style={styles.tableTitleTextContainer}>
              <Text style={styles.tableTitleText}>Total (€)</Text>
            </View>
          </View>

          {basketArticles}
        </View>
        <View style={styles.deliveryCostContainer}>
          <View style={styles.deliveryCostContainerText}>
            <Text>Frais de port</Text>
          </View>
          <View style={styles.deliveryCost}>
            <Text style={styles.tableProductText}>
              {numberFormatFunction.format(deliveryCost)}
            </Text>
          </View>
        </View>
        <View style={styles.totalContainer}>
          <View>
            <Text style={styles.tableTitleText}>Total de la commande</Text>
          </View>
          <View>
            <Text style={styles.tableTitleText}>
              {numberFormatFunction.format(totalOrder + deliveryCost)}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => handleNextStep()}
        >
          <Text style={styles.buttonText}>Étape suivante</Text>
          <EvilIcons name="arrow-right" size={24} color="white" />
        </TouchableOpacity>
      </ScrollView>
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
  statusContainer: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "space-between",
    marginTop: 30,
  },
  textContainer: {
    marginTop: 30,
    fontSize: 16,
  },
  scrollView: {
    width: "90%",
  },
  tableContainer: {
    marginTop: 10,
    flexDirection: "column",
  },
  tableContainerRowTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    padding: 10,
    borderColor: "#4B7285",
    borderWidth: 1,
    backgroundColor: "#4B7285",
  },
  tableContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderColor: "#4B7285",
    borderWidth: 1,
    alignItems: "center",
  },
  tableTitleTextContainer: {
    flex: 1,
  },
  tableTitleText: {
    fontWeight: "800",
    fontSize: 14,
    color: "white",
    textAlign: "center",
  },
  tableProductTextContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  number: {
    flexDirection: "row",
  },
  tableProductText: {
    textAlign: "center",
  },
  deliveryCostContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    padding: 10,
    borderColor: "#4B7285",
    borderWidth: 1,
  },
  productProperty: {
    flexDirection: "row",
    width: "25%",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderColor: "#4B7285",
    borderWidth: 1,
    backgroundColor: "#4B7285",
  },
  quantityButton: {
    marginLeft: 7,
    marginRight: 7,
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: "row",
    alignSelf: "flex-end",
    height: 40,
    margin: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#4B7285",
    width: 130,
  },
  buttonText: {
    alignSelf: "center",
    color: "white",
  },
});
