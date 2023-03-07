import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  Pressable,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { AntDesign } from "@expo/vector-icons";
import { addArticleInfo, addArticleInBasket, manageArticleInFavorite} from "../reducers/users";
import CountryFlag from "react-native-country-flag";
import Popover, { PopoverPlacement } from "react-native-popover-view";


const Card = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const users = useSelector((state) => state.users.value[0]);
  const [isLike, setIsLike] = useState(false);

  const userToken = useSelector((state) => state.users.value[0].token);

  let backgroundImg = { uri: `${props.image[0]}` };
  let flagImg= props.flagOfCountry


  useEffect(() => {
    setIsLike(props.isLikeinFavorite);
  }, [props.isLikeinFavorite]);

  const handleLike = () => {
    if (users.token) {
      setIsLike(!isLike);
      fetch(`http://192.168.1.47:3000/users/updateFavoriteArticle`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: users.token, articleId: props.id }),
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch(
            manageArticleInFavorite(
              data.data.articlesinFavorite.map((article) => ({
                ...article,
                isLikeinFavorite: article._id === props.id ? !isLike : article.isLikeinFavorite
              }))
            )
          );
         if (props.onLikeChange) {
            props.onLikeChange(props.id, !isLike);
          } 
        });
    }
  };

  const handleCart = () => {
    dispatch(addArticleInBasket({price: props.price, name:props.name, image:props.image, id:props.id, note:props.note, description:props.description, stock:props.stock, categoryName:props.categoryName, countryName:props.countryName, continentOfCountry:props.continentOfCountry}))
  };

  const handleInfo = () => {
    navigation.navigate('Article')
    dispatch(addArticleInfo({price: props.price, name:props.name, image:props.image, id:props.id, note:props.note, description:props.description, stock:props.stock, categoryName:props.categoryName, countryName:props.countryName, continentOfCountry:props.continentOfCountry}))
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
            <CountryFlag isoCode={flagImg} size={20} style={styles.countryFlag} />           
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
          <TouchableOpacity onPress={() => {
              handleInfo();
            }}>
            <FontAwesome name="info-circle" size={24} color="#4B7285" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleLike();
            }}
          >
{/*             {!userToken ? (
                <Popover
                  placement={PopoverPlacement.BOTTOM}
                  from={
                    <TouchableOpacity>
                      <AntDesign name="hearto" size={24} color="#E74C3C" />
                    </TouchableOpacity>
                  }
                >
                  <Text style={styles.textPopover}>
                    Connectez-vous pour ajouter aux favoris 😉
                  </Text>
                </Popover>
              ) : (
                handleLike()
              )} */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
              handleCart();
            }}>
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
    backgroundColor: 'white',
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
    width: "95%",
    padding: 8,
    borderWidth: 1,
    borderRadius: 7,
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
    paddingLeft: 105,
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
});
