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
  Button,
  ScrollView,
} from "react-native";
import Header from "./Header";
import { AntDesign } from "@expo/vector-icons";

export default function Product() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
      <View style={styles.productContainer}>
        <Image
          source={{
            uri: "https://cdn.shopify.com/s/files/1/0481/0457/1045/products/KitKat_Japan_Strawberry_800x.jpg",
          }}
          style={{ width: 300, height: 300 }}
          resizeMode="cover"
          alignSelf="center"
        />
        <View style={styles.othersImages} alignSelf="center">
          <Image
            source={{
              uri: "https://cdn.shopify.com/s/files/1/0481/0457/1045/products/KitKat_Japan_Strawberry_800x.jpg",
            }}
            style={{ width: 100, height: 100 }}
          />
          <Image
            source={{
              uri: "https://cdn.shopify.com/s/files/1/0481/0457/1045/products/KitKat_Japan_Strawberry_800x.jpg",
            }}
            style={{ width: 100, height: 100 }}
          />
          <Image
            source={{
              uri: "https://cdn.shopify.com/s/files/1/0481/0457/1045/products/KitKat_Japan_Strawberry_800x.jpg",
            }}
            style={{ width: 100, height: 100 }}
          />
          <Image
            source={{
              uri: "https://cdn.shopify.com/s/files/1/0481/0457/1045/products/KitKat_Japan_Strawberry_800x.jpg",
            }}
            style={{ width: 100, height: 100 }}
          />
        </View>
        <View style={styles.isLikeContent}>
          <Text style={styles.category}>Catégorie : Sucré</Text>
          <TouchableOpacity>
          <AntDesign name="hearto" size={24} color="grey" />
          </TouchableOpacity>
        </View>
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.titleArticle}>Kit Kat fraise</Text>
            <Text style={styles.notation}>
              Note du produit :
              <AntDesign name="star" size={14} color="orange" />
              <AntDesign name="star" size={14} color="orange" />
              <AntDesign name="star" size={14} color="orange" />
              <AntDesign name="star" size={14} color="orange" />
              <AntDesign name="star" size={14} color="orange" />
            </Text>
          </View>
          <Text style={styles.price}>7,90€</Text>
        </View>
        <Text style={styles.descriptionTitle}>Description du produit</Text>
        <Text style={styles.description}>
          Savourez l'expérience unique des KitKats japonais au goût frais et
          sucré de la fraise avec ce paquet de friandises irrésistibles.
          Fabriqués avec des ingrédients de première qualité, ces KitKats sont
          l'ultime fusion entre une gaufrette croquante et du chocolat onctueux,
          mélangé avec une touche fruitée de fraises fraîches. Chaque bouchée
          vous transporte dans une explosion de saveurs et de textures qui
          éveillera vos papilles gustatives.
        </Text>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  productContainer: {},
  titleArticle: {
    alignSelf: "flex-start",
    fontSize: 35,
    fontFamily: "Arial",
    fontWeight: "bold",
    paddingTop: 15,
  },
  othersImages: {
    flexDirection: "row",
  },
  category: {},
  isLikeContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 25,
    paddingRight: 35,
  },

  descriptionTitle: {
    paddingLeft: 25,
    paddingTop: 25,
    fontWeight: "bold",
    fontStyle: "italic",
    fontWeight: "600",
    fontSize: 18,
    paddingBottom: 5,
  },
  description: {
    paddingLeft: 25,
    paddingRight: 25,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 25,
    paddingRight: 25,
  },
  price: {
    fontSize: 25,
    paddingTop: 25,
    fontWeight: "bold",
    fontFamily: "Arial",
  },
});
