import React, { useEffect, useState } from "react";
import { TextInput } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import Checkbox from "expo-checkbox";

export default function Personal_Informations() {
  const [firstname, setFirstname] = useState(""); //evite de renvoyer une erreur en définissant l'état à null
  const [lastname, setLastname] = useState("");
  const [mailAddress, setMailAddress] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [messageUpdate, setMessageUpdate] = useState(null);
  const [personalInformationsDisplay, setPersonalInformationsDisplay] =
    useState(false);
  const [changeAddressDisplay, setChangeAddressDisplay] = useState(false);
  const [addNewAdressDisplay, setAddNewAdressDisplay] = useState(false);
  const [isCheckedDelivery, setCheckedDelivery] = useState(false);
  const [isCheckedBilling, setCheckedBilling] = useState(false);

  // ADRESSE UTILISATEUR
  const [newAdress, setNewAddress] = useState("");
  const [newZipCode, setNewZipCode] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newCountry, setNewCountry] = useState("");

  const user = useSelector((state) => state.users.value[0]);

  /* <---> GETTER : Récupération de toutes les informations utilisateur provenant de la base de données <---> */

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


    /* <---> SETTER : Envoi la nouvelle adresse vers la base de données <---> */

    const setHandleNewAddress = ()=>{
        if (
            newAdress !== "" &&
            newZipCode !== "" &&
            newCity !== "" &&
            newCountry !== ""
          ) {
            var data = {
                street: newAdress,
                city: newCity,
                zipCode: newZipCode,
                country: newCountry,
                isBillingAddress: isCheckedBilling,
                isDeliveryAddress: isCheckedDelivery,
            };
          }
      
          fetch(`http://192.168.1.47:3000/users/update/${user.token}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => {
              setMessageUpdate(data.message);
            });
        
    }



  /* <-----------------> SETTER : METTRE A JOUR LES INFORMATIONS PERSONNELLES <-----------------> */
  const setHandleUpdateInformations = () => {
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

    fetch(`http://192.168.1.47:3000/users/update/${user.token}`, {
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

  /* <------------> AFFICHAGE CONDITIONNEL: INFORMATIONS PERSONNELLES <------------> */
  if (personalInformationsDisplay) {
    var displayInformations = (
      <>
        {/* <------------>  AFFICHAGE DES INFORMATIONS PERSONNELLES DE L'UTILISATEUR  <------------> */}

        <View>
          <View style={styles.inputsArea}>
            <TextInput
              autoCorrect="false"
              placeholder="Prénom"
              value={firstname}
              style={styles.input}
              onChangeText={(value) => {
                setFirstname(value);
              }}
            />
            <TextInput
              autoCorrect="false"
              placeholder="Nom"
              value={lastname}
              style={styles.input}
              onChangeText={(value) => {
                setLastname(value);
              }}
            />
            <TextInput
              autoCorrect="false"
              placeholder="Adresse e-mail"
              value={mailAddress}
              style={styles.input}
              onChangeText={(value) => {
                setMailAddress(value);
              }}
            />
            <TextInput
              autoCorrect="false"
              placeholder="Nouveau mot de passe"
              style={styles.input}
              value={newPassword}
              secureTextEntry={true}
              onChangeText={(value) => {
                setNewPassword(value);
              }}
            />
            <TextInput
              autoCorrect="false"
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

        {/* <------------>  BOUTON MAJ DES INFORMATIONS  <------------> */}

        <TouchableOpacity
          style={styles.valid_button_container}
          onPress={() => setHandleUpdateInformations()}
        >
          <AntDesign name="checkcircle" size={20} color="#4B7285" />
          <Text style={styles.valid_button_Text}>Valider</Text>
        </TouchableOpacity>
        <Text style={styles.message}>
          {messageUpdate != null ? messageUpdate : ""}
        </Text>
      </>
    );
  }

  /* <------------> AFFICHAGE CONDITIONNEL: CHANGEMENT ADRESSE PAR DEFAUT <------------> */

  /* <------------> AFFICHAGE CONDITIONNEL: AJOUT NOUVELLE ADRESSE <------------> */
  if (addNewAdressDisplay) {
    var getHandleNewAddress = (
      <>
        <View style={styles.inputsArea}>
          <TextInput
            autoCorrect="false"
            placeholder="Adresse complète"
            style={styles.input}
            value={newAdress}
            onChange={(value) => setNewAddress(value)}
          />
          <TextInput
            autoCorrect="false"
            placeholder="Code postal"
            style={styles.input}
            value={newZipCode}
            onChange={(value) => setNewZipCode(value)}
          />
          <TextInput
            autoCorrect="false"
            placeholder="Ville"
            style={styles.input}
            value={newCity}
            onChange={(value) => setNewCity(value)}
          />
          <TextInput
            autoCorrect="false"
            placeholder="Pays"
            style={styles.input}
            value={newCountry}
            onChange={(value) => setNewCountry(value)}
          />
        </View>
        <View style={styles.checkbox_container}>
          <Checkbox
            style={styles.checkbox}
            value={isCheckedDelivery}
            onValueChange={setCheckedDelivery}
            color={isCheckedDelivery ? "#4B7285" : undefined}
          />
          <Text style={styles.checkboxText}>
            Adresse par defaut pour la livraison
          </Text>
        </View>
        <View style={styles.checkbox_container}>
          <Checkbox
            style={styles.checkbox}
            value={isCheckedBilling}
            onValueChange={setCheckedBilling}
            color={isCheckedBilling ? "#4B7285" : undefined}
          />
          <Text style={styles.checkboxText}>
            Adresse par defaut pour la facturation
          </Text>
        </View>

        {/* <------------>  BOUTON MAJ DES INFORMATIONS  <------------> */}

        <View style={styles.valid_button_container}>
          <AntDesign name="checkcircle" size={20} color="#4B7285" />
          <Text style={styles.valid_button_Text}>Valider</Text>
        </View>
        <Text style={styles.message}>
          {messageUpdate != null ? messageUpdate : ""}
        </Text>
      </>
    );
  }

  /* <----------------------> RETURN <----------------------> */
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backToAccountContainer}>
        <AntDesign name="back" size={26} color="white" />
        <Text style={styles.backToAccountText}>Retour</Text>
      </TouchableOpacity>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* <------>  BOUTON AJOUTER NOUVELLE ADRESSE  <------> */}

        <TouchableOpacity
          style={
            addNewAdressDisplay
              ? styles.add_AdressButton_enable
              : styles.add_AdressButton_disable
          }
          onPress={() => {
            setAddNewAdressDisplay(true);
            setChangeAddressDisplay(false);
            setPersonalInformationsDisplay(false);
          }}
        >
          <AntDesign name="pluscircle" size={24} color="#A569BD" />
          <Text style={styles.addAddressText}>
            Ajouter une nouvelle adresse
          </Text>
        </TouchableOpacity>
        {getHandleNewAddress}

        {/* <------>  BOUTON CHANGER ADRESSE PAR DEFAUT  <------> */}

        <TouchableOpacity
          style={styles.UpdateAddressContainer}
          onPress={() => {
            setChangeAddressDisplay(true);
            setAddNewAdressDisplay(false);
            setPersonalInformationsDisplay(false);
          }}
        >
          <MaterialIcons name="update" size={24} color="#45B39D" />
          <Text style={styles.updateAddressText}>Adresse par défaut</Text>
        </TouchableOpacity>

        {/* <----------------------------------------------------> */}
        <TouchableOpacity
          style={
            personalInformationsDisplay
              ? styles.PIDisplay_enable
              : styles.PIDisplay_disable
          }
          onPress={() => {
            setPersonalInformationsDisplay(true);
            setAddNewAdressDisplay(false);
            setChangeAddressDisplay(false);
          }}
        >
          <Entypo name="info" size={24} color="#FC9F30" />
          <Text style={styles.personalInformations}>
            Vos informations personnelles
          </Text>
        </TouchableOpacity>
        {displayInformations}
        {/* <----------------------------------------------------> */}
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  /* <------ STYLE GENERAL ------> */

  container: {
    width: "92%",
    alignSelf: "center",
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
  checkbox: {
    margin: 8,
  },
  checkbox_container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  checkboxText: {
    color: "#4B7285",
    fontWeight: "bold",
    fontSize: "16",
  },
  /* <------ STYLE : BOUTON 'VALIDER' ------> */

  valid_button_container: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 7,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#EBEDEF",
    marginVertical: 25,
    borderColor: "#4B7285",
  },
  valid_button_Text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4B7285",
    paddingLeft: 15,
  },

  /* <------ STYLE : ADRESSE PAR DEFAUT ------> */

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

  /* <------ STYLE : BOUTON RETOUR ------> */

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

  /* <------ STYLE : INFORMATIONS PERSONNELLES ------> */

  PIDisplay_enable: {
    flexDirection: "row",
    backgroundColor: "#FAE5D3",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignContent: "center",
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#FC9F30",
  },
  PIDisplay_disable: {
    flexDirection: "row",
    backgroundColor: "#FAE5D3",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignContent: "center",
    marginTop: 10,
  },
  personalInformations: {
    color: "#FC9F30",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 15,
  },
  /* <------ STYLE : AJOUTER NOUVELLE ADRESSE ------> */
  add_AdressButton_enable: {
    flexDirection: "row",
    backgroundColor: "#EBDEF0",
    padding: 15,
    borderRadius: 10,
    alignContent: "center",
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#A569BD",
  },
  add_AdressButton_disable: {
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
});
