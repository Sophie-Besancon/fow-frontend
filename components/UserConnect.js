import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addUser } from "../reducers/users";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native";

export default function UserConnect() {
  const [mailSignin, setMailSignin] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [mailSignup, setMailSignup] = useState(null);
  const [passwordSignIn, setPasswordSignIn] = useState(null);
  const [passwordSignUp, setPasswordSignUp] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);
  const [messageSignIn, setMessageSignIn] = useState(null);
  const [messageSignUp, setMessageSignUp] = useState(null);
  const [messageErrorSignIn, setMessageErrorSignIn] = useState(null);
  const [messageErrorSignUp, setMessageErrorSignUp] = useState(null);
  const [choiceSignIn, setChoiceSignIn] = useState(true);
  const [choiceSignUp, setChoiceSignUp] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.value[0].firstname);

  //envoi d'un fetch (asynchrone) lors de la validation de l'inscription
  const handleSignUp = async () => {
    await fetch("https://fow-backend.vercel.app/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        mail: mailSignup,
        password: passwordSignUp,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result && passwordSignUp === passwordConfirm) {
          dispatch(addUser(data.data));
          setFirstname("");
          setLastname("");
          setMailSignup("");
          setPasswordSignUp("");
          setPasswordConfirm("");
          setMessageSignUp("✅ Félicitations ! Votre compte a été créé !");
        } else {
          setMessageErrorSignUp(`❌ ${data.error}`);
          setMessageErrorSignIn(null);
        }
      });
  };

  /*-------   FIN handleSignUp -------*/

  //envoi d'un fetch (asynchrone) lors de la connexion de l'utilisateur
  const handleSignIn = async () => {
    await fetch("https://fow-backend.vercel.app/users/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mail: mailSignin,
        password: passwordSignIn,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(addUser(data.data));
          setMailSignin("");
          setPasswordSignIn("");
          setMessageSignIn("✅ Vous vous êtes connecté avec succès");
        } else {
          setMessageErrorSignIn(`❌ ${data.error}`);
          setMessageErrorSignUp(null);
        }
      });
  };

  // variabilisation des champs de connexion pour optimiser la navigation
  const signIn = (
    <>
      <TextInput
        placeholder="Adresse mail"
        style={styles.input}
        keyboardType="email-address"
        onChangeText={(value) => setMailSignin(value)}
        autoCorrect={false}
        value={mailSignin}
        selectTextOnFocus={true}
      />
      <TextInput
        placeholder="Mot de passe"
        style={styles.input}
        secureTextEntry={true}
        autoCorrect={false}
        value={passwordSignIn}
        onChangeText={(value) => setPasswordSignIn(value)}
      />
      <Text style={styles.forgetPassword}>Mot de passe oublié</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleSignIn()}>
        <Text style={styles.text}>Me connecter</Text>
      </TouchableOpacity>
      <Text>{user ? messageSignIn : messageErrorSignIn}</Text>
    </>
  );
  // variabilisation des champs de l'inscription pour optimiser la navigation
  const signUp = (
    <>
      <TextInput
        placeholder="Prénom"
        style={styles.input}
        onChangeText={(value) => setFirstname(value)}
        autoCorrect={false}
        value={firstname}
        selectTextOnFocus={true}
      />
      <TextInput
        placeholder="Nom"
        style={styles.input}
        onChangeText={(value) => setLastname(value)}
        autoCorrect={false}
        value={lastname}
      />
      <TextInput
        placeholder="Adresse mail"
        style={styles.input}
        keyboardType="email-address"
        onChangeText={(value) => setMailSignup(value)}
        autoCorrect={false}
        value={mailSignup}
      />
      <TextInput
        placeholder="Mot de passe"
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(value) => setPasswordSignUp(value)}
        autoCorrect={false}
        value={passwordSignUp}
      />
      <TextInput
        placeholder="Répétez votre mot de passe"
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(value) => setPasswordConfirm(value)}
        autoCorrect={false}
        value={passwordConfirm}
      />
      <TouchableOpacity style={styles.button} onPress={() => handleSignUp()}>
        <Text style={styles.text}>M'inscrire</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <View style={styles.mainContainer}>
          {/* ****************************** SIGN IN ****************************** */}
          <View style={styles.signinContent}>
            <View style={styles.title_signin}>
              <AntDesign
                name="user"
                size={30}
                color="black"
                style={styles.icon}
              />
              <TouchableOpacity
                onPress={() => {
                  setChoiceSignIn(!choiceSignIn);
                  setChoiceSignUp(false);
                }}
              >
                <Text style={styles.titleConnect}>Connectez-vous</Text>
              </TouchableOpacity>
            </View>

            {choiceSignIn ? signIn : ""}
          </View>
          {/* ****************************** SIGN UP ****************************** */}

          <View style={styles.signupContent}>
            <View style={styles.title_signup}>
              <AntDesign
                name="adduser"
                size={30}
                color="black"
                style={styles.icon}
              />
              <TouchableOpacity
                onPress={() => {
                  setChoiceSignUp(!choiceSignUp);
                  setChoiceSignIn(false);
                }}
              >
                <Text style={styles.titleConnect}>Inscrivez-vous !</Text>
              </TouchableOpacity>
            </View>
            {choiceSignUp ? signUp : ""}
          </View>
          <Text>{user ? messageSignUp : messageErrorSignUp}</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignContent: "center",
    alignSelf: "center",
  },
  signinContent: {
    paddingVertical: 10,
    borderBottomColor: "#bebebe",
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  signupContent: {
    paddingVertical: 10,
    borderBottomColor: "#bebebe",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 50,
    margin: 5,
    borderWidth: 0.2,
    padding: 10,
    borderRadius: 8,
    width: 300,
    borderColor: "gray",
  },

  titleConnect: {
    alignSelf: "center",
    fontSize: 28,
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
    paddingRight: 5,
    fontSize: 12,
  },

  title_signup: {
    alignSelf: "center",
    flexDirection: "row",
    paddingBottom: 25,
  },
  title_signin: {
    alignSelf: "center",
    flexDirection: "row",
    paddingBottom: 25,
  },
  icon: {
    paddingRight: 10,
  },
});
