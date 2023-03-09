import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { clearArticleInfo } from "../reducers/users";
import Product from "../components/Product";

const ArticleScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const articleInfos = useSelector((state) => state.users.value[0].articleInfo);

  const handleBack = () => {
    navigation.navigate("Store");
    dispatch(clearArticleInfo());
  };
  return (
    <View style={styles.container}>
      <Header />
      <TouchableOpacity
        onPress={() => handleBack()}
        style={styles.backButton}
        activeOpacity={0.8}
      >
        <Ionicons name="md-arrow-back-circle-outline" size={20} color="white" />
        <Text style={styles.textButton}> Retour </Text>
      </TouchableOpacity>
      {articleInfos.length > 0 && <Product />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  textButton: {
    color: "#ffffff",
  },
  backButton: {
    backgroundColor: "#4B7285",
    height: 40,
    margin: 10,
    marginLeft: 20,
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignSelf: "flex-start",
  },
});

export default ArticleScreen;
