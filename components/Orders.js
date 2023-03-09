import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function Orders() {
  return (
    <View>
      <View style={styles.ordersContainer}>
        <Entypo name="list" size={24} color="#4B7285" />
        <Text style={styles.infosAndOrdersText}>Mes commandes</Text>
      </View>
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
});
