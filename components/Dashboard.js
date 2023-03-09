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
import { disconnectUser } from "../reducers/users";
import { useDispatch } from "react-redux";
import NewAddress from "../components/NewAddress";
import { modifyFirstname } from "../reducers/users";

export default function Dashboard() {
  // Déclaration des états pour 'INFORMATIONS PERSONNELLES' de l'utilisateur
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mailAddress, setMailAddress] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [messageUpdate, setMessageUpdate] = useState(null);
  const [orders, setOrders] = useState([]);

  // Etats généraux concernant l'affichage déroulants des menus
  const [myOrdersDisplay, setMyOrdersDisplay] = useState(false);
  const [personalInformationsDisplay, setPersonalInformationsDisplay] = useState(false);
  const [ChangeOrDeleteMyAddress, setChangeOrDeleteMyAddress] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.value[0]);

  /* <------ INFORMATIONS CONCERNANT LES COMMANDES UTILISATEURS ------> */
  const basketData = [
    { name: "mikado", quantity: 2, price: 3.99 },
    { name: "mochi au chocolat", quantity: 3, price: 5.7 },
  ];
  const numberFormatFunction = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  });

  let deliveryCost = 7.99;
  let totalOrder = 0;

  const basketArticles = basketData.map((data, i) => {
    const totalPerArticle = basketData[i].quantity * basketData[i].price;
    totalOrder = totalOrder + totalPerArticle;
    return (
      <View style={styles.tableContainerRow} key={i}>
        <View style={styles.tableProductTextContainer}>
          <Text style={styles.tableProductText}>{data.name}</Text>
        </View>
        <View style={styles.tableProductTextContainer}>
          <Text style={styles.tableProductText}>{data.quantity}</Text>
        </View>
        <View style={styles.tableProductTextContainer}>
          <Text style={styles.tableProductText}>{data.price.toFixed(2)}</Text>
        </View>
        <View style={styles.tableProductTextContainer}>
          <Text style={styles.tableProductText}>{totalPerArticle}</Text>
        </View>
      </View>
    );
  });

  /* <---> GETTER : Récupération de toutes les informations utilisateur provenant de la base de données <---> */

  useEffect(() => {
    fetch(`https://fow-backend.vercel.app/users/infos/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setFirstname(data.data.firstname);
          setLastname(data.data.lastname);
          setMailAddress(data.data.mail);
        }
      });
  }, [user.token]);

  useEffect(() => {
    fetch(`https://fow-backend.vercel.app/orders/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setOrders(data.data);
        }
      });
  }, [user]);

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
        setNewAddress("");
        setNewZipCode("");
        setNewCity("");
        setNewCountry("");
        setCheckedDelivery(false);
        setCheckedBilling(false);
        setMessageUpdate("");
      });
  };

  /* <----------> SETTER : METTRE A JOUR LES INFORMATIONS PERSONNELLES <---------> */
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

    fetch(
      `https://fow-backend.vercel.app/users/updateUserInformations/${user.token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setMessageUpdate(data.message);
        dispatch(modifyFirstname(data.data.firstname));
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
              placeholder="Prénom"
              value={firstname}
              style={styles.input}
              onChangeText={(value) => {
                setFirstname(value);
                setMessageUpdate(null);
              }}
            />
            <TextInput
              placeholder="Nom"
              value={lastname}
              style={styles.input}
              onChangeText={(value) => {
                setLastname(value);
                setMessageUpdate(null);
              }}
            />
            <TextInput
              placeholder="Adresse e-mail"
              value={mailAddress}
              style={styles.input}
              onChangeText={(value) => {
                setMailAddress(value);
                setMessageUpdate(null);
              }}
            />
            <TextInput
              placeholder="Nouveau mot de passe"
              style={styles.input}
              value={newPassword}
              secureTextEntry={true}
              onChangeText={(value) => {
                setNewPassword(value);
                setMessageUpdate(null);
              }}
            />
            <TextInput
              placeholder="Répétez votre mot de passe"
              style={styles.input}
              value={newPasswordConfirm}
              secureTextEntry={true}
              onChangeText={(value) => {
                setNewPasswordConfirm(value);
                setMessageUpdate(null);
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

  /* <------------> AFFICHAGE CONDITIONNEL: MES COMMANDES <------------> */
  if (myOrdersDisplay) {
    const myOrders = orders.map((data, i) => {
      // https://stackoverflow.com/questions/61653453/convert-date-string-from-iso-8601-format-yyyy-mm-ddthhmmss-sssz-to-dd-mm-y
      [yyyy, mm, dd, hh, mi] = data.purchaseDate.split(/[/:\-T]/);
      const dateLocale = `${dd}-${mm}-${yyyy} ${hh}:${mi}`;
      return (
        <View style={styles.myOrderContainer} key={i}>
          <Text>Date de la commande : {dateLocale}</Text>
          <Text>Numéro de la commande : {data._id}</Text>
          <Text>
            Total de la commande : {numberFormatFunction.format(data.total)}
          </Text>
        </View>
      );
    });
    var getMyOrders = (
      <>
        <Text style={styles.myOrdersText}>Mes Commandes :</Text>
        {myOrders}
      </>
    );
  }

  /* <----------------------> RETURN <----------------------> */
  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* <------>  BOUTON VOS INFORMATIONS PERSONNELLES <------> */}
        <TouchableOpacity
          style={
            personalInformationsDisplay
              ? styles.PIDisplay_enable
              : styles.PIDisplay_disable
          }
          onPress={() => {
            setPersonalInformationsDisplay(!personalInformationsDisplay);
            setMyOrdersDisplay(false);
            setChangeOrDeleteMyAddress(false);
          }}
        >
          <Entypo
            name="info"
            size={24}
            color={personalInformationsDisplay ? "white" : "#FC9F30"}
          />
          <Text
            style={
              personalInformationsDisplay
                ? styles.personalInformations_enable
                : styles.personalInformations_disable
            }
          >
            Vos informations personnelles
          </Text>
        </TouchableOpacity>
        {displayInformations}

        {/* <------>  BOUTON MES COMMANDES <------> */}
        <TouchableOpacity
          style={
            myOrdersDisplay ? styles.myOrders_enable : styles.myOrders_disable
          }
          onPress={() => {
            setPersonalInformationsDisplay(false);
            setMyOrdersDisplay(!myOrdersDisplay);
            setChangeOrDeleteMyAddress(false);
          }}
        >
          <Entypo
            name="list"
            size={24}
            color={myOrdersDisplay ? "white" : "#5DADE2"}
          />

          <Text
            style={
              myOrdersDisplay
                ? styles.myOrdersText_enable
                : styles.myOrdersText_disable
            }
          >
            Mes commandes
          </Text>
        </TouchableOpacity>
        {getMyOrders}

        {/* AJOUTER UNE NOUVELLE ADRESSE (depuis le composant NewAddress) */}

        <NewAddress />

        {/* <------>  BOUTON METTRE A JOUR MES ADRESSES  <------> */}

        <TouchableOpacity
          style={
            ChangeOrDeleteMyAddress
              ? styles.updateAddress_enable
              : styles.updateAddress_disable
          }
          onPress={() => {
            setMyOrdersDisplay(false);
            setPersonalInformationsDisplay(false);
            setChangeOrDeleteMyAddress(!ChangeOrDeleteMyAddress);
          }}
        >
          <MaterialIcons
            name="update"
            size={24}
            color={ChangeOrDeleteMyAddress ? "white" : "#45B39D"}
          />
          <Text
            style={
              ChangeOrDeleteMyAddress
                ? styles.updateAddressText_enable
                : styles.updateAddressText_disable
            }
          >
            Mettre à jour mes adresses
          </Text>
        </TouchableOpacity>

        {/* <------>  BOUTONS : DECONNEXION ET SUPPRESSION DE COMPTE  <------> */}

        <TouchableOpacity
          style={styles.disconnectContainer}
          onPress={() => dispatch(disconnectUser())}
        >
          <AntDesign name="disconnect" size={24} color="#5D6D7E" />
          <Text style={styles.textDisconnect}>Me déconnecter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteContainer}>
          <AntDesign name="delete" size={24} color="#CD6155" />
          <Text style={styles.deleteAccountText}>Supprimer mon compte</Text>
        </TouchableOpacity>
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

  /* <------ STYLE : METTRE A JOUR MES ADRESSES ------> */

  SelectAdressContainer: {
    flexDirection: "row",
  },

  updateAddress_enable: {
    flexDirection: "row",
    backgroundColor: "#45B39D",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignContent: "center",
    marginTop: 10,
    shadowColor: "#45B39D",
    shadowRadius: 5,
    shadowOpacity: 0.6,
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  updateAddress_disable: {
    flexDirection: "row",
    backgroundColor: "#D0ECE7",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignContent: "center",
    marginTop: 10,
  },
  updateAddressText_enable: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 10,
    textShadowColor: "rgba(0, 0, 0, 0.45)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  updateAddressText_disable: {
    color: "#45B39D",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 10,
  },

  /* <------ STYLE : INFORMATIONS PERSONNELLES ------> */

  PIDisplay_enable: {
    flexDirection: "row",
    backgroundColor: "#F5B041",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignContent: "center",
    marginTop: 10,
    shadowColor: "#F5B041",
    shadowRadius: 5,
    shadowOpacity: 0.6,
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 0,
    },
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
  personalInformations_disable: {
    color: "#FC9F30",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  personalInformations_enable: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 10,
    textShadowColor: "rgba(0, 0, 0, 0.45)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },

  /* <------ STYLE : MES COMMANDES------> */

  myOrders_enable: {
    flexDirection: "row",
    backgroundColor: "#5DADE2",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignContent: "center",
    marginTop: 10,
    shadowColor: "#5DADE2",
    shadowRadius: 5,
    shadowOpacity: 0.6,
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  myOrders_disable: {
    flexDirection: "row",
    backgroundColor: "#D6EAF8",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignContent: "center",
    marginTop: 10,
  },
  myOrdersText_enable: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 10,
    textShadowColor: "rgba(0, 0, 0, 0.45)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  myOrdersText_disable: {
    color: "#5DADE2",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  /* <- tableau de mes commandes -> */
  myOrdersText: {
    fontSize: 24,
    fontWeight: "500",
    marginVertical: 15,
  },
  myOrderContainer: {
    borderRadius: 8,
    borderColor: "#4B7285",
    borderWidth: 1,
    padding: 15,
  },
  tableContainerRowTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    padding: 10,
    borderColor: "#4B7285",
    borderWidth: 1,
    backgroundColor: "#4B7285",
  },
  tableContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderColor: "#4B7285",
    borderWidth: 1,
    alignItems: "center",
  },
  tableTitleTextContainer: {
    flex: 1,
  },
  tableTitleText: {
    fontWeight: "800",
    fontSize: 14,
    color: "white",
    textAlign: "center",
  },
  tableProductTextContainer: {
    flex: 1,
  },
  tableProductText: {
    textAlign: "center",
  },
  deliveryCostContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    padding: 10,
    borderColor: "#4B7285",
    borderWidth: 1,
    width: "85%",
  },

  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderColor: "#4B7285",
    borderWidth: 1,
    backgroundColor: "#4B7285",
    width: "85%",
  },
  /* <------ STYLE : ME DECONNECTER ------> */

  textDisconnect: {
    fontSize: 18,
    color: "#5D6D7E",
    paddingLeft: 15,
    fontWeight: "bold",
  },
  disconnectContainer: {
    flexDirection: "row",
    marginVertical: 100,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#F2F3F4",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#5D6D7E",
    shadowRadius: 3,
    shadowOpacity: 0.4,
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  /* <------ STYLE : DELETE ACCOUNT ------> */

  deleteContainer: {
    flexDirection: "row",
    padding: 15,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FADBD8",
    borderRadius: 10,
  },
  deleteAccountText: {
    color: "#CD6155",
    fontSize: 18,
    paddingLeft: 10,
    fontWeight: "bold",
  },
});
