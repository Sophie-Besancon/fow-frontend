import React from 'react';
import { StyleSheet, Text, View, Button, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import Header from '../components/Header'
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from "react-redux";
import { clearArticleInfo } from "../reducers/users";


const ArticleScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.value[0]);

  const handleBack = () => {
    console.log("RETOUR")
    navigation.navigate('Store')
    dispatch(clearArticleInfo())
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <Header />
    <TouchableOpacity onPress={() => handleBack()} style={styles.backButton} activeOpacity={0.8}>
        <Ionicons name="md-arrow-back-circle-outline" size={20} color="white" /><Text style={styles.textButton}> Retour </Text>
    </TouchableOpacity>
</KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  textButton: {
    color: '#ffffff',
},
backButton: {
    backgroundColor: '#4B7285',
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

