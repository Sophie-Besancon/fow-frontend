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
import { AntDesign, Feather, Ionicons, Entypo } from '@expo/vector-icons';
import {disconnectUser} from "../reducers/users";

const Header = (props) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const user = useSelector((state) => state.users.value[0].firstname);


  const handleOpen = () => {
    setModalVisible(false);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  const handleDisconnexion= () => {
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
                onPress={() => handleOpen()}
                style={styles.button}
                activeOpacity={0.8}
              ></TouchableOpacity>
              
              <Image source={require("../assets/logo-fow.png")} style={styles.modalLogo}/>

                  <View style={styles.modalMenu}>
                  

                <TouchableOpacity onPress={() => handleClose()} style={styles.fieldContainer} activeOpacity={0.8}>
                  <Ionicons name="reload"  size={24} color="#FC9F30" />
                  <Text style={styles.modalText}>Reprendre la recherche</Text>
                  </TouchableOpacity>
      

                  
                  <TouchableOpacity style={styles.fieldContainer} activeOpacity={0.8}>
                  <AntDesign name="inbox"  size={24} color="#FC9F30" />
                  <Text style={styles.modalText}>Mes commandes</Text>
                  </TouchableOpacity>
               

                  
                  <TouchableOpacity style={styles.fieldContainer} activeOpacity={0.8}>
                  <Feather name="mail"  size={24} color="#FC9F30" />
                  <Text style={styles.modalText}>Contactez Nous</Text>
                  </TouchableOpacity >
            

                 
                  <TouchableOpacity style={styles.fieldContainer} activeOpacity={0.8} onPress={() => handleDisconnexion()}>
                  <AntDesign name="disconnect"  size={28} color="#FC9F30" />
                  <Text style={styles.modalText}>Se déconnecter</Text>
                  </TouchableOpacity> 
              

{/*                   <TouchableOpacity  style={styles.fieldContainer} activeOpacity={0.8}>
                  <Entypo name="log-out" size={24} color="black" />
                  <Text style={styles.modalText}>Fermer</Text>
                  </TouchableOpacity> */}

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
  modalLogo: {
    height: 200,
    width: 200,
    alignSelf:'center',
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
    justifyContent:'center',
    borderWidth: 1,
  },
  modalMenu: {
    height: "50%",
    margin:20,
    justifyContent: 'space-around',
  },
  modalText:{
    fontSize: 17,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FC9F30',
    color:'#4B7285',
  },
  fieldContainer:{
    flexDirection: 'row',
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
