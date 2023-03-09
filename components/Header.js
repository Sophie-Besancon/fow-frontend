import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign, Feather, Ionicons, Entypo } from "@expo/vector-icons";
import { disconnectUser } from "../reducers/users";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContactVisible, setModalContactVisible] = useState(false);
  const user = useSelector((state) => state.users.value[0].firstname);
  const userToken = useSelector((state) => state.users.value[0].token);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [mail, setMail] = useState("");
  const navigation = useNavigation();

  const handleOpen = () => {
    setModalVisible(false);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  const handleDisconnexion = () => {
    dispatch(disconnectUser());
  };

  const handleContactForm = () => {
    setModalContactVisible(true);
  };

  const handleNavigation = () => {
    if (!userToken) {
      Alert.alert(
        "Erreur",
        "Veuillez vous connecter pour afficher vos commandes.",
        [{ text: "Ok" }]
      );
    } else {
      navigation.navigate("Compte");
    }
  };

  const handleSubmitForm = () => {
    setModalContactVisible(false);
    Alert.alert("", "Nous vous répondrons dans les meilleurs délais.", [
      { text: "Ok" },
    ]);
    setName("");
    setMessage("");
    setMail("");
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <FontAwesome />
        <Entypo
          name="menu"
          onPress={() => setModalVisible(!modalVisible)}
          size={40}
          color="#4B7285"
        />

        <View style={styles.logoContainer}>
          <Image
            style={styles.image}
            source={require("../assets/logo-fow.png")}
          />
          <View style={styles.title}>
            <Text style={styles.firstText}>
              Food Of<Text style={styles.secondText}> The World</Text>
            </Text>
          </View>
        </View>
        <View style={styles.userIconContainer}>
          <FontAwesome
            name="user"
            size={24}
            color={user ? "#16A085" : "#5D6D7E"}
          />
          <Text style={styles.userIconText}>
            {user ? `Bonjour ${user}` : "Déconnecté"}
          </Text>
        </View>
        <Modal visible={modalVisible} animationType="none" transparent>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={() => handleOpen()}
                style={styles.button}
                activeOpacity={0.8}
              ></TouchableOpacity>

              <Image
                source={require("../assets/logo-fow.png")}
                style={styles.modalLogo}
              />

              <View style={styles.modalMenu}>
                <TouchableOpacity
                  onPress={() => handleClose()}
                  style={styles.fieldContainer}
                  activeOpacity={0.8}
                >
                  <Ionicons name="reload" size={24} color="#FC9F30" />
                  <Text style={styles.modalTextBack}>
                    Reprendre la recherche
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.fieldContainer}
                  activeOpacity={0.8}
                  onPress={() => handleNavigation()}
                >
                  <Entypo name="list" size={24} color="#FC9F30" />
                  <Text style={styles.modalText}>Mes commandes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.fieldContainer}
                  activeOpacity={0.8}
                  onPress={() => handleContactForm()}
                >
                  <Feather name="mail" size={24} color="#FC9F30" />
                  <Text style={styles.modalText}>Contactez-nous</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.fieldContainer}
                  activeOpacity={0.8}
                  onPress={() => handleDisconnexion()}
                >
                  <AntDesign name="disconnect" size={28} color="#FC9F30" />
                  <Text style={styles.modalText}>Se déconnecter</Text>
                </TouchableOpacity>

                <View>
                  <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalContactVisible}
                    onRequestClose={() => setModalContactVisible(false)}
                  >
                    <View style={styles.modalContainer}>
                      <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                          Formulaire de Contact
                        </Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Votre Nom"
                          onChangeText={setName}
                          value={name}
                        />
                        <TextInput
                          style={styles.input}
                          placeholder="Votre eMail"
                          onChangeText={setMail}
                          value={mail}
                        />
                        <TextInput
                          style={[styles.input, styles.messageInput]}
                          placeholder="Votre Message"
                          multiline={true}
                          numberOfLines={4}
                          onChangeText={setMessage}
                          value={message}
                        />
                        <TouchableOpacity
                          style={styles.button}
                          onPress={handleSubmitForm}
                        >
                          <Text style={styles.buttonText}>Valider</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 25,
  },
  mainContainer: {
    width: "100%",
  },
  logoContainer: {
    flexDirection: "row",
    alignContent: "center",
    paddingLeft: 30,
  },
  image: {
    height: 85,
    width: 85,
  },
  modalLogo: {
    height: 200,
    width: 200,
    alignSelf: "center",
  },
  title: {
    justifyContent: "center",
    width: "40%",
  },
  firstText: {
    fontSize: 22,
    fontWeight: "bold",
    flexWrap: "wrap",
    color: "#4B7285",
  },
  secondText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FC9F30",
  },
  modalView: {
    backgroundColor: "white",
    width: "70%",
    height: "96.5%",
    justifyContent: "center",
    borderWidth: 1,
  },
  modalMenu: {
    height: "50%",
    margin: 10,
    justifyContent: "space-around",
  },
  modalText: {
    fontSize: 17,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FC9F30",
    color: "#4B7285",
  },
  modalTextBack: {
    fontWeight: "bold",
    fontSize: 17,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FC9F30",
    color: "#4B7285",
  },
  fieldContainer: {
    flexDirection: "row",
  },
  userIconContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  userIconText: {
    paddingTop: 5,
    fontSize: 12,
    color: "gray",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    borderBottomWidth: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#fc9f30",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: 200,
  },
  messageInput: {
    height: 120,
    width: 200,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
