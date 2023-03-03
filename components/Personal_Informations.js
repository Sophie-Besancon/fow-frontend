import React, { useEffect, useState } from "react";
import { TextInput } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

export default function Personal_Informations() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mailAddress, setMailAddress] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [messageUpdate, setMessageUpdate] = useState(null);
  const [personalInformationsDisplay, setPersonalInformationsDisplay] =
    useState(true);
  const [changeAddressDisplay, setChangeAddressDisplay] = useState(false);
  const [addNewAdressDisplay, setAddNewAdressDisplay] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value[0]);

  /* Récupération de toutes les informations utilisateur provenant de la base de données */

  useEffect(() => {
    fetch(`http://192.168.1.47:3000/users/infos/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
           setFirstname(data.data.firstname);
          setLastname(data.data.lastname);
          setMailAddress(data.data.mail); 
        }
      });
  }, []);
  /* ************************************************************************************** */

  /* ---------------------------    CLICK : METTRE A JOUR LES INFORMATIONS ---------------- */
  const handleUpdateInformations = () => {

    if (
      newPassword !== "" &&
      newPasswordConfirm !== "" &&
      newPassword === newPasswordConfirm
    ) {
      var data = {
        firstname: firstname,
        lastname: lastname,
        mail: mailAddress,
        password: newPassword,
      };
    } else {
      var data = {
        firstname: firstname,
        lastname: lastname,
        mail: mailAddress,
      };
    }

    fetch(`http://192.168.1.47:3000/users/update/${token}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessageUpdate(data.message);
      });
  };

  /* --------------------------------------------------------------------------------------- */



/* ************************** AFFICHAGE CONDITIONNEL: INFORMATIONS PERSONNELLES **************************************** */
if (personalInformationsDisplay){

    var displayInformations =
    <>
            {/* ********  AFFICHAGE DES INFORMATIONS DE L'UTILISATEUR  ******** */}

            <View>
          <View style={styles.infosContainer}>
            <Entypo name="info" size={24} color="#4B7285" />
            <Text style={styles.infosText}>Informations personnelles</Text>
          </View>
          <View style={styles.inputsArea}>
            <TextInput
              placeholder="Prénom"
              value={firstname}
              style={styles.input}
              onChangeText={(value) => {
                setFirstname(value);
              }}
            />
            <TextInput
              placeholder="Nom"
              value={lastname}
              style={styles.input}
              onChangeText={(value) => {
                setLastname(value);
              }}
            />
            <TextInput
              placeholder="Adresse e-mail"
              value={mailAddress}
              style={styles.input}
              onChangeText={(value) => {
                setMailAddress(value);
              }}
            />
            <TextInput
              placeholder="Nouveau mot de passe"
              style={styles.input}
              value={newPassword}
              secureTextEntry={true}
              onChangeText={(value) => {
                setNewPassword(value);
              }}
            />
            <TextInput
              placeholder="Répétez votre mot de passe"
              style={styles.input}
              value={newPasswordConfirm}
              secureTextEntry={true}
              onChangeText={(value) => {
                setNewPasswordConfirm(value);
              }}
            />
          </View>
        </View>

        {/* ********  BOUTON MAJ DES INFORMATIONS  ******** */}

        <TouchableOpacity
          style={styles.updateInformationsContainer}
          onPress={() => handleUpdateInformations()}
        >
          <AntDesign name="checkcircle" size={24} color="#FC9F30" />
          <Text style={styles.updateInformations}>
            Mettre à jour les informations
          </Text>
        </TouchableOpacity>
        <Text style={styles.message}>
          {messageUpdate != null ? messageUpdate : ""}
        </Text>
        </>
}
/* ************************************************************************************** */




/* ************************** AFFICHAGE CONDITIONNEL: CHANGEMENT ADRESSE PAR DEFAUT **************************************** */

/* ************************************************************************************** */




/* ************************** AFFICHAGE CONDITIONNEL: AJOUT NOUVELLE ADRESSE **************************************** */
if (addNewAdressDisplay){
    console.log(addNewAdressDisplay);
    var handleNewAddress = ()=>{

        <>
                <View style={styles.inputsArea}>
            <TextInput
                  autoComplete="on"
                  placeholder="Adresse complète"
                  style={styles.input}
                />
                <TextInput
                  autoComplete="on"
                  placeholder="Code postal"
                  style={styles.input}
                />
                <TextInput
                  autoComplete="on"
                  placeholder="Ville"
                  style={styles.input}
                />
                <TextInput
                  autoComplete="on"
                  placeholder="Pays"
                  style={styles.input}
                />
    
    
    
            </View>
            </>
    }
}
/* ************************************************************************************** */

  return (
    <ScrollView>
      <TouchableOpacity style={styles.backToAccountContainer}>
        <AntDesign name="back" size={26} color="white" />
        <Text style={styles.backToAccountText}>Retour</Text>
      </TouchableOpacity>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* ********  BOUTON AJOUTER NOUVELLE ADRESSE  ******** */}

        <TouchableOpacity style={styles.AddAdressButton}>
          <AntDesign name="pluscircle" size={24} color="#A569BD" />
          <Text style={styles.addAddressText}>
            Ajouter une nouvelle adresse
          </Text>
        </TouchableOpacity>
        {handleNewAddress}

        {/* ********  BOUTON CHANGER ADRESSE PAR DEFAUT  ******** */}

        <TouchableOpacity style={styles.UpdateAddressContainer}>
          <MaterialIcons name="update" size={24} color="#45B39D" />
          <Text style={styles.updateAddressText}>
            Changer mon adresse par défaut
          </Text>
        </TouchableOpacity>

        {displayInformations}


      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  infosText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4B7285",
    paddingLeft: 15,
  },

  infosContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 20,
  },
  input: {
    height: 50,
    margin: 10,
    borderWidth: 0.2,
    padding: 10,
    borderRadius: 8,
    borderColor: "gray",
    fontSize: 20,
  },
  updateInformationsContainer: {
    flexDirection: "row",
    backgroundColor: "#FAE5D3",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignContent: "center",
    marginTop: 10,
    marginBottom: 50,
  },
  updateInformations: {
    color: "#FC9F30",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 15,
  },
  AddAdressButton: {
    flexDirection: "row",
    backgroundColor: "#EBDEF0",
    padding: 15,
    borderRadius: 10,
    alignContent: "center",
    marginTop: 10,
  },
  addAddressText: {
    color: "#A569BD",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 15,
  },
  SelectAdressContainer: {
    flexDirection: "row",
  },
  UpdateAddressContainer: {
    flexDirection: "row",
    backgroundColor: "#D0ECE7",
    padding: 15,
    borderRadius: 10,

    alignContent: "center",
    marginTop: 10,
  },
  updateAddressText: {
    color: "#45B39D",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 15,
  },
  backToAccountContainer: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    marginVertical: 25,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#AEB6BF",
    width: 120,
  },
  backToAccountText: {
    paddingLeft: 15,
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
  },
});
