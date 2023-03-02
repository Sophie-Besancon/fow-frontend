import React, { useState } from "react";
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
import image from "../assets/image.jpg";

const Card = (props) => {
  return (
    <View style={styles.cardContainer}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View style={styles.imgCardContainer}>
          <View style={styles.textImgCardContainer}>
            <View style={styles.splitContainerFlag}>
              <Image source={require("../assets/la-france.png")} />
            </View>
            <View style={styles.splitContainerPrice}>
              <Text>{props.price}€</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.bottomCardContainer}>
        <View style={styles.nameProductContainer}>
          <Text>{props.name}</Text>
        </View>
        <View style={styles.buttonProductContainer}>
          <FontAwesome
            name="info-circle"
            size={20}
            color="#4B7285"
            style={styles.deleteIcon}
          />
          <FontAwesome
            name="heart-o"
            size={20}
            color="#4B7285"
            style={styles.deleteIcon}
          />
          <FontAwesome
            name="cart-plus"
            size={20}
            color="#4B7285"
            style={styles.deleteIcon}
          />
        </View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 70,
    width: 325,
    height: 250,
  },
  imgCardContainer: {
    alignSelf: "center",
    width: 290,
    height: 190,
    borderWidth: 2,
    borderBottomWidth: 1,
    borderColor: "#4B7285",
    backgroundColor: "rgba(75, 114, 133, 0.2)",
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
    paddingLeft: 10,
    justifyContent: "center",
  },
  bottomCardContainer: {
    width: 290,
    height: 65,
    alignSelf: "center",
    borderWidth: 2,
    borderTopWidth: 1,
    borderColor: "#4B7285",
  },
  nameProductContainer: {
    height: "30%",
    marginLeft: 40,
    marginTop: 10,
  },
  buttonProductContainer: {
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    height: "50%",
  },
});
