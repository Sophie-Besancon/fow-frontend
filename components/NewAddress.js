import React, { useState } from "react";
import { TextInput } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { useSelector, useDispatch } from "react-redux";
import { addAddress } from "../reducers/users";


export default function NewAddress(){

      // Déclaration des états pour 'AJOUTER UNE NOUVELLE ADRESSE'
  const [newAdress, setNewAddress] = useState("");
  const [newZipCode, setNewZipCode] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [messageAddAdress, setMessageAddAdress] = useState(null);
  const [addNewAdressDisplay, setAddNewAdressDisplay] = useState(false);
  // checkbox pour l'ajout d'une nouvelle adresse
  const [isCheckedDelivery, setCheckedDelivery] = useState(true);
  const [isCheckedBilling, setCheckedBilling] = useState(true);

  const user = useSelector((state) => state.users.value[0]);
  const dispatch = useDispatch()

  /* <---> SETTER : Envoi la nouvelle adresse vers la base de données <---> */

  const setHandleNewAddress = () => {
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

    fetch(`https://fow-backend.vercel.app/users/add_address/${user.token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessageAddAdress(data.message);
        dispatch(addAddress(data.data))
        setNewAddress('');
        setNewZipCode('');
        setNewCity('');
        setNewCountry('');
        setCheckedDelivery(false);
        setCheckedBilling(false);
        // setMessageUpdate n'est pas défini dans NewAddress donc ca provoque un message warning
        // Notamment lorsqu'on utilise NewAddress dans OrderConnectionScreen
        
      });
  };

    /* <------------> AFFICHAGE CONDITIONNEL: AJOUT NOUVELLE ADRESSE <------------> */
    if (addNewAdressDisplay) {
        var getHandleNewAddress = (
          <>
            <View style={styles.inputsArea}>
              <TextInput
                placeholder="Adresse complète"
                style={styles.input}
                value={newAdress}
                onChangeText={(value) => {
                  setNewAddress(value);
                  setMessageAddAdress(null);
                }}
              />
              <TextInput
                placeholder="Code postal"
                style={styles.input}
                value={newZipCode}
                onChangeText={(value) => setNewZipCode(value)}
              />
              <TextInput
                placeholder="Ville"
                style={styles.input}
                value={newCity}
                onChangeText={(value) => setNewCity(value)}
              />
              <TextInput
                placeholder="Pays"
                style={styles.input}
                value={newCountry}
                onChangeText={(value) => setNewCountry(value)}
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
                Adresse par défaut pour la livraison
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
                Adresse par défaut pour la facturation
              </Text>
            </View>
    
            {/* <------------>  BOUTON MAJ DES INFORMATIONS  <------------> */}
    
            <TouchableOpacity
              style={styles.valid_button_container}
              onPress={() => {
                setHandleNewAddress();
                setMessageAddAdress(null);
              }}
            >
              <AntDesign name="checkcircle" size={20} color="#4B7285" />
              <Text style={styles.valid_button_Text}>Valider</Text>
            </TouchableOpacity>
            <Text style={styles.message}>
              {messageAddAdress != null ? messageAddAdress : ""}
            </Text>
          </>
        );
      }

    return(
        <>
                {/* <------>  BOUTON AJOUTER NOUVELLE ADRESSE  <------> */}

                <TouchableOpacity
          style={
            addNewAdressDisplay
              ? styles.add_AdressButton_enable
              : styles.add_AdressButton_disable
          }
          onPress={() => {
            setAddNewAdressDisplay(!addNewAdressDisplay);
          }}
        >
          <AntDesign
            name="pluscircle"
            size={24}
            color={addNewAdressDisplay ? "white" : "#A569BD"}
          />
          <Text
            style={
              addNewAdressDisplay
                ? styles.addAddressText_enable
                : styles.addAddressText_disable
            }
          >
            Ajouter une nouvelle adresse
          </Text>
        </TouchableOpacity>
        {getHandleNewAddress}
        </>
    )
}


const styles = StyleSheet.create({
    /* <------ STYLE : AJOUTER NOUVELLE ADRESSE ------> */
  add_AdressButton_enable: {
    flexDirection: "row",
    backgroundColor: "#AF7AC5",
    padding: 15,
    borderRadius: 10,
    alignContent: "center",
    marginTop: 10,
    shadowColor: "#AF7AC5",
    shadowRadius: 5,
    shadowOpacity: 0.6,
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  add_AdressButton_disable: {
    flexDirection: "row",
    backgroundColor: "#EBDEF0",
    padding: 15,
    borderRadius: 10,
    alignContent: "center",
    marginTop: 10,
  },
  addAddressText_enable: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 10,
    textShadowColor: "rgba(0, 0, 0, 0.45)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  addAddressText_disable: {
    color: "#A569BD",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 10,
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
    fontSize: 16,
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#4B7285",
    paddingLeft: 15,
  },

})