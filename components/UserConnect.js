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
import { useSelector } from "react-redux";

export default function UserConnect() {
  const [mailSignin, setMailSignin] = useState(null);

  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [mailSignup, setMailSignup] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.value[0].firstname);
  console.log("user ", user);

  //envoi d'un fetch (asynchrone) lors de la validation de l'inscription
  const handleSignUp = async () => {
    if (
      firstname != null &&
      lastname != null &&
      mailSignup != null &&
      password != null &&
      password === passwordConfirm
    ) {
      await fetch("https://fow-backend.vercel.app/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          mail: mailSignup,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data :", data);
          setFirstname("");
          setLastname("");
          setMailSignup("");
          setPassword("");
          setPasswordConfirm("");
          dispatch(addUser(firstname));
        });
      setMessage("✅ Félicitations ! Votre compte a été créé !");
    } else {
      setMessage("❌ Vérifiez votre mot de passe");
    }
  };

  /*-------   FIN handleSignUp -------*/

  const handleSignIn = () => {
        if (mail!=null && password!=null){
            
        }

  };

  return (
    <View style={styles.mainContainer}>
      {/* ****************************** SIGN IN ****************************** */}
      <View style={styles.signinContent}>
        <View style={styles.title_signin}>
          <AntDesign name="user" size={30} color="black" style={styles.icon} />
          <Text style={styles.titleConnect}>Connectez-vous</Text>
        </View>
        <TextInput
          placeholder="Adresse mail"
          style={styles.input}
          keyboardType="email-address"
          onChangeText={(value) => setMailSignin(value)}
          autoCorrect={false}
        />
        <TextInput
          placeholder="Mot de passe"
          style={styles.input}
          secureTextEntry={true}
          autoCorrect={false}
        />
        <Text style={styles.forgetPassword}>Mot de passe oublié</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Me connecter</Text>
        </TouchableOpacity>
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
          <Text style={styles.titleConnect}>Inscrivez-vous !</Text>
        </View>
        <TextInput
          placeholder="Prénom"
          style={styles.input}
          onChangeText={(value) => setFirstname(value)}
          autoCorrect={false} // enleve l'autocorrection
        />
        <TextInput
          placeholder="Nom"
          style={styles.input}
          onChangeText={(value) => setLastname(value)}
          autoCorrect={false}
        />
        <TextInput
          placeholder="Adresse mail"
          style={styles.input}
          keyboardType="email-address"
          onChangeText={(value) => setMailSignup(value)}
          autoCorrect={false}
        />
        <TextInput
          placeholder="Mot de passe"
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
          autoCorrect={false}
        />
        <TextInput
          placeholder="Répétez votre mot de passe"
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(value) => setPasswordConfirm(value)}
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.button} onPress={() => handleSignUp()}>
          <Text style={styles.text}>M'inscrire</Text>
        </TouchableOpacity>
      </View>
      <Text>{user ? message : ""}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  signinContent: {
    paddingBottom: 30,
    borderBottomColor: "#bebebe",
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 5,
    borderWidth: 0.2,
    padding: 10,
    borderRadius: 8,
    width: 280,
    borderColor: "gray",
  },
  signupContent: {
    paddingTop: 30,
  },
  titleConnect: {
    alignSelf: "center",
    fontSize: 25,
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
