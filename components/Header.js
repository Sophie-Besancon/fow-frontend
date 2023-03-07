import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import {disconnectUser} from "../reducers/users";

const Header = (props) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const user = useSelector((state) => state.users.value[0].firstname);


  const handleNewPlace = () => {
    setModalVisible(false);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  const handledisconnexion= () => {
    dispatch(disconnectUser())
  }




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
                onPress={() => handleNewPlace()}
                style={styles.button}
                activeOpacity={0.8}
              ></TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleClose()}
                style={styles.button}
                activeOpacity={0.8}
              >
                <View style={styles.closeButton}>
                  <FontAwesome name="times" size={20} color="#000000" />
                </View>
                <View style={styles.modalMenu}>
                  <Text>Menu</Text>
                </View>
                <TouchableOpacity style={styles.disconnectedButton} onPress={() => handledisconnexion()}>
                  <FontAwesome name="power-off" size={35} color="#000000"/>
                </TouchableOpacity>
              </TouchableOpacity>
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
    backgroundColor:'#fff',
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
    padding: 30,
    height: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "50%",
    height: 653,
  },
  closeButton: {
    flexDirection: "row-reverse",
  },
  modalMenu: {
    height: "85%",
    marginTop: 15,
  },
  disconnectedButton: {
    alignItems: "center",
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
});
