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
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function UserConnect() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.signinContent}>
        <Text style={styles.titleConnect}>Connectez-vous</Text>
        <TextInput
          placeholder="Adresse mail"
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Mot de passe"
          style={styles.input}
          secureTextEntry={true}
        />
        <Text style={styles.forgetPassword}>Mot de passe oublié</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Me connecter</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signupContent}>
        <Text style={styles.titleConnect}>Inscrivez-vous !</Text>
        <TextInput placeholder="Nom d'utilisateur" style={styles.input} />
        <TextInput
          placeholder="Adresse mail"
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Mot de passe"
          style={styles.input}
          secureTextEntry={true}
        />
        <TextInput
          placeholder="Répétez votre mot de passe"
          style={styles.input}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>M'inscrire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  signinContent: {
    paddingBottom: 40,
    borderBottomColor:"#bebebe",
    borderBottomWidth:1
  },
  signupContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 0.2,
    padding: 10,
    borderRadius: 8,
    width: 280,
    borderColor: "gray",
  },
  signupContent: {
    paddingTop:40,
  },
  titleConnect: {
    alignSelf: "center",
    fontSize: 25,
    fontFamily:'arial',
    fontWeight:'bold'
  },
  button: {
    alignSelf: "center",
    height: 40,
    margin: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#4B7285",
    width:120
  },
  text: {
    alignSelf: "center",
    color: "white",
  },
  forgetPassword: {
    alignSelf: "flex-end",
    paddingRight: 10,
    fontSize: 10,
  },
});
