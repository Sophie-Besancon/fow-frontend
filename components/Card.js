import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
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
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { AntDesign } from "@expo/vector-icons";
import { canBookMark, addArticle, removeArticle } from '../reducers/users';

const Card = (props) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.value[0]);
  const [isLike, setIsLike] = useState(false);
  //console.log( props.id)
  //console.log(users)

  let backgroundImg = { uri: `${props.image}` };
  //console.log(props.flag)
  //console.log(`../assets/${props.flag}.png`)
  // let city = require(`../assets/${props.flag}.png`)
  //console.log(city)

  useEffect(() => {
  //  if(users.token){
      fetch("http://192.168.1.14:3000/users/token", {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: users.token, articleId: props.id }),
      }).then((response) =>
        response.json()).then((data) => {
          dispatch(canBookMark())          
          console.log('ARTICLES',typeof data.data.articlesinFavorite[0])
          if (isLike){
  
        //    for (let element of data.data.articlesinFavorite){
          //    console.log("ELEMENT", element._id)
       //     }
         // dispatch(addArticle(data.data.articlesinFavorite))
       //  } else {
        //  dispatch(removeArticle(data.data.articlesinFavorite[0]))
          }
        });
  //    }
  }, [isLike])


  return (
    <View style={styles.cardContainer}>
      <ImageBackground
        source={backgroundImg}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <View style={styles.imgCardContainer}>
          <View style={styles.textImgCardContainer}>
            <View style={styles.splitContainerFlag}>
              <Image source={require("../assets/mexico.png")} />
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
          <TouchableOpacity>
            <FontAwesome name="info-circle" size={24} color="#4B7285" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsLike(!isLike)}>
            {isLike ? (
              <AntDesign name="heart" size={24} color="#E74C3C" />
            ) : (
              <AntDesign name="hearto" size={24} color="#E74C3C" />
            )}
          </TouchableOpacity>
          <TouchableOpacity>
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
