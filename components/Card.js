import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import {
  addArticleInfo,
  addArticleInBasket,
  manageArticleInFavorite,
} from "../reducers/users";
import CountryFlag from "react-native-country-flag";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { AntDesign } from "@expo/vector-icons";

const Card = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const users = useSelector((state) => state.users.value[0]);

  let isLike = props.isLikeinFavorite;

  let backgroundImg = { uri: `${props.image[0]}` };
  let flagImg = props.flagOfCountry;

  const handleLike = () => {
    if (!users.token) {
      Alert.alert(
        "Non connecté",
        "Veuillez d'abord vous connecter afin d'ajouter des articles à vos favoris.",
        [
          {
            text: "Retour",
            style: "cancel",
          },
          { text: "Ok" },
        ]
      );
      return;
    } else {
      fetch("https://fow-backend.vercel.app/users/updateFavoriteArticle", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: users.token, articleId: props.id }),
      })
        .then((response) => response.json())
        .then(() => {
          dispatch(manageArticleInFavorite(props));
        });
    }
  };

  const handleCart = () => {
    dispatch(addArticleInBasket(props));
  };

  const handleInfo = () => {
    dispatch(addArticleInfo(props));
    navigation.navigate("Article");
  };

  return (
    <View style={styles.cardContainer}>
      <ImageBackground
        source={backgroundImg}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View style={styles.imgCardContainer}>
          <View style={styles.textImgCardContainer}>
            <View style={styles.splitContainerFlag}>
              <CountryFlag
                isoCode={flagImg}
                size={20}
                style={styles.countryFlag}
              />
            </View>
            <View style={styles.splitContainerPrice}>
              <Text style={styles.price}>{props.price}€</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.bottomCardContainer}>
        <View style={styles.nameProductContainer}>
          <Text>{props.name}</Text>
        </View>
        <View style={styles.buttonProductContainer}>
          <TouchableOpacity
            onPress={() => {
              handleInfo();
            }}
          >
            <FontAwesome name="info-circle" size={24} color="#4B7285" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handleLike();
            }}
          >
            {isLike ? (
              <AntDesign name="heart" size={24} color="#E74C3C" />
            ) : (
              <AntDesign name="hearto" size={24} color="#E74C3C" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleCart();
            }}
          >
            <FontAwesome name="cart-plus" size={24} color="#4B7285" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
    width: "95%",
    padding: 8,
    borderRadius: 7,
    shadowColor: "#5D6D7E",
    shadowRadius: 5,
    shadowOpacity: 0.9,
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },

  imgCardContainer: {
    alignSelf: "center",
    width: "90%",
    height: 190,
  },

  textImgCardContainer: {
    flexDirection: "row",
    height: "15%",
  },

  splitContainerPrice: {
    width: "50%",
    paddingLeft: 110,
    marginTop: 10,
    justifyContent: "center",
  },

  splitContainerFlag: {
    width: "50%",
    marginTop: 10,
    justifyContent: "center",
  },

  bottomCardContainer: {
    width: "100%",
    height: 65,
    alignSelf: "center",
    padding: 8,
  },

  nameProductContainer: {
    marginBottom: 10,
  },
  buttonProductContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    height: "50%",
  },
  price: {
    fontSize: 16,
    fontWeight: "400",
  },
});
