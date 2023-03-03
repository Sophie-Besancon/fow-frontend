import React, { useState } from "react";
import { TextInput } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import Header from "./Header";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.infosContainer}>
        <Entypo name="info" size={24} color="#4B7285" />
        <Text style={styles.infosAndOrdersText}>Informations personnelles</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.ordersContainer}>
        <Entypo name="list" size={24} color="#4B7285" />
        <Text style={styles.infosAndOrdersText}>Mes commandes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.disconnectContainer}>
        <AntDesign name="disconnect" size={24} color="black" />
        <Text style={styles.textDisconnect}>Me déconnecter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteContainer}>
        <AntDesign name="delete" size={24} color="red" />
        <Text style={styles.deleteAccountText}>Supprimer mon compte</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
  },
  infosAndOrdersText: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
    color: "#4B7285",
    paddingLeft: 15,
  },
  deleteAccountText: {
    fontSize: 18,
    color: "red",
    paddingLeft: 15,
  },
  textDisconnect: {
    fontSize: 18,
    color: "#5D6D7E",
    paddingLeft: 15,
  },
  disconnectContainer: {
    flexDirection: "row",
    marginVertical: 100,
    justifyContent: "center",
    backgroundColor: "#F2F3F4",
    borderRadius: "15",
    padding: 10,
  },
  deleteContainer: {
    flexDirection: "row",
    padding: 10,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FADBD8",
    borderRadius: "15",
  },
  infosContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#D4E6F1",
    borderRadius: "15",
    padding: 10,
    paddingTop: 10,
  },
  ordersContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#D4E6F1",
    borderRadius: "15",
    padding: 10,
    marginTop: 20,
  },
});
