import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addUser } from "../reducers/users";

export default function UserConnect() {
  const [mailAdressSignin, setMailAdressSignin] = useState(null);

  const [username, setUsername] = useState(null);
  const [mailAdressSignup, setMailAdressSignup] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  console.log("username", username);
  console.log("mailAdressSignup", mailAdressSignup);
  console.log("password", password);
  console.log("message", message);

  const handleSignUp = () => {
    if (password === passwordConfirm) {
      dispatch(
        addUser({
          username: username,
          mailAddress: mailAdressSignup,
          password: password,
        })
      );
      setMessage("✅ Félicitations ! Votre compte a été créé !");
    } else {
      setMessage("❌ Vérifiez votre mot de passe");
    }
  };

  const handleSignIn = () => {};

  return (
    <View style={styles.mainContainer}>
      <View style={styles.signinContent}>
        <View style={styles.title_signin}>
          <AntDesign name="user" size={30} color="black" style={styles.icon} />
          <Text style={styles.titleConnect}>Connectez-vous</Text>
        </View>
        <TextInput
          placeholder="Adresse mail"
          style={styles.input}
          keyboardType="email-address"
          onChangeText={(value) => setMailAdressSignin(value)}
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
        <View style={styles.title_signup}>
          <AntDesign
            name="adduser"
            size={30}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.titleConnect}>Inscrivez-vous !</Text>
        </View>
        <TextInput
          placeholder="Nom d'utilisateur"
          style={styles.input}
          onChangeText={(value) => setUsername(value)}
        />
        <TextInput
          placeholder="Adresse mail"
          style={styles.input}
          keyboardType="email-address"
          onChangeText={(value) => setMailAdressSignup(value)}
        />
        <TextInput
          placeholder="Mot de passe"
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
        />
        <TextInput
          placeholder="Répétez votre mot de passe"
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(value) => setPasswordConfirm(value)}
        />
        <TouchableOpacity style={styles.button} onPress={() => handleSignUp()}>
          <Text style={styles.text}>M'inscrire</Text>
        </TouchableOpacity>
        {message}
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
    borderBottomColor: "#bebebe",
    borderBottomWidth: 1,
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
    paddingTop: 40,
  },
  titleConnect: {
    alignSelf: "center",
    fontSize: 25,
    fontFamily: "Arial",
    fontWeight: "bold",
  },
  button: {
    alignSelf: "center",
    height: 40,
    margin: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#4B7285",
    width: 120,
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
  title_signup: {
    alignSelf: "center",
    flexDirection: "row",
  },
  title_signup: {
    alignSelf: "center",
    flexDirection: "row",
  },
  title_signin: {
    alignSelf: "center",
    flexDirection: "row",
  },
  icon: {
    paddingRight: 10,
  },
});
