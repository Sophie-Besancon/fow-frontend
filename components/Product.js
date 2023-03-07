import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign,FontAwesome } from "@expo/vector-icons";
import { ImageGallery } from "@georstat/react-native-image-gallery";
import { useSelector, useDispatch } from "react-redux";
import Popover, { PopoverPlacement } from "react-native-popover-view";
import { addArticleInBasket } from "../reducers/users";

const images = [
  {
    id: 1,
    url: "https://cdn.shopify.com/s/files/1/0481/0457/1045/products/KitKat_Japan_Strawberry_800x.jpg",
  },
  {
    id: 2,
    url: "https://www.uswayoflife.fr/3170-large_default/kit-kat-strawberry.jpg",
  },
  {
    id: 3,
    url: "https://www.tokyo-smart.com/4864-large_default/kit-kat-fraise-amao.jpg",
  },
];

export default function Product() {
  const [isLike, setIsLike] = useState(false);
  /*****  INCREMENTATION ET DECREMENTATION DE COUNT POUR L'AJOUT AU PANIER *****/
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Galerie images
  const openGallery = () => setIsOpen(true);
  const closeGallery = () => setIsOpen(false);

  const informations = useSelector(
    (state) => state.users.value[0].articleInfo[0]
  );
  const userToken = useSelector((state) => state.users.value[0].token);

  // Fonction HANDLELIKE qui permet d'afficher le coeur vide ou plein selon le like.
  // l'utilisateur DOIT être connecté
  let handleLike = () => {
    if (isLike) {
      return <AntDesign name="heart" size={24} color="#E74C3C" />;
    } else {
      return <AntDesign name="hearto" size={24} color="#E74C3C" />;
    }
  };

  const dispatch = useDispatch();
  /*    const images = [
    {
      url: informations.image,
    },
  ]; */

  const handleAddBasket = () => {
    for (let i = 0; i < count; i++) {
      dispatch(addArticleInBasket(informations));
    }
    setCount(0);
  };

  const handleCountLess = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleCountMore = () => {
    if (count < informations.stock) {
      setCount(count + 1);
    }
  };

  const imagesDisplay = images.map((element, i) => {
    return (
      <TouchableOpacity onPress={openGallery} key={i}>
        <Image
          source={{
            uri: element.url,
          }}
          resizeMode="cover"
          style={styles.imagesDisplay}
        />
      </TouchableOpacity>
    );
  });


   for (let i=0; i<informations.note;i++){
     var notation = <FontAwesome name="star" size={20} color="orange" />
   }  

  /* *********************** FIN INCREM / DECREM ******************************** */

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.productContainer}>
          <TouchableOpacity onPress={openGallery}>
            <Image
              source={{
                uri: informations.image,
              }}
              style={styles.cover}
              alignSelf="center"
            />
          </TouchableOpacity>

          <View style={styles.imagesContainer}>{imagesDisplay}</View>
          <ImageGallery
            close={closeGallery}
            isOpen={isOpen}
            images={images}
            thumbSize={80}
            thumbColor="#F39C12"
          />
          <View style={styles.isLikeContent}>
            <Text style={styles.title}>
              Catégorie :{" "}
              <Text style={styles.informations}>
                {" "}
                {informations.categoryName}
              </Text>
            </Text>
            <Text style={styles.title}>
              Origine :
              <Text style={styles.informations}>
                {" "}
                {informations.continentOfCountry}
              </Text>
            </Text>
            <Text style={styles.title}>
              Pays :
              <Text style={styles.informations}>
                {" "}
                {informations.countryName}
              </Text>
            </Text>

            <TouchableOpacity
              onPress={() => {
                setIsLike(!isLike);
              }}
            >
              {!userToken ? (
                <Popover
                  placement={PopoverPlacement.LEFT}
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
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.priceContainer}>
            <View>
              <Text style={styles.titleArticle}>{informations.name}</Text>
              <Text style={styles.notation}>
                Note du produit : {notation}
              </Text>
            </View>

            <Text style={styles.price}>{informations.price}€</Text>
          </View>
          <Text style={styles.descriptionTitle}>Description du produit</Text>
          <Text style={styles.description}>{informations.description}</Text>
          <View style={styles.addBasketContainer}>
            <View style={styles.countContainer}>
              <TouchableOpacity onPress={() => handleCountLess()}>
                <AntDesign name="minuscircleo" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.counter}>{count}</Text>
              <TouchableOpacity onPress={() => handleCountMore()}>
                <AntDesign name="pluscircleo" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.addToBasketContent}>
              <TouchableOpacity
                style={styles.addToBasket}
                onPress={() => {
                  handleAddBasket();
                }}
              >
                <Text style={styles.addToBasketText}>Ajouter au panier</Text>
              </TouchableOpacity>
              <Text style={styles.stock}>STOCK : {informations.stock}</Text>
            </View>
          </View>
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
  titleArticle: {
    alignSelf: "flex-start",
    fontSize: 30,
    fontFamily: "Arial",
    fontWeight: "bold",
    paddingTop: 15,
  },
  isLikeContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 15,
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
  countContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    padding: 10,
    width: 150,
    borderRadius: 10,
  },
  counter: {
    fontSize: 18,
  },
  addBasketContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  addToBasket: {
    backgroundColor: "#4B7285",
    padding: 15,
    borderRadius: 10,
  },
  addToBasketContent: {
    justifyContent: "center",
  },
  addToBasketText: {
    color: "white",
  },
  imagesDisplay: {
    width: 80,
    height: 80,
  },
  imagesContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
  },
  title: {
    fontWeight: "700",
    color: "#34495E",
  },
  informations: {
    fontWeight: "normal",
    color: "black",
  },
  cover: {
    height: 250,
    minWidth: 500,
  },
  stock: {
    marginVertical: 10,
    alignSelf: "center",
  },
  textPopover: {
    padding: 10,
  },
});
