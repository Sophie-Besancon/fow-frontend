import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, Modal, Pressable, TextInput, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';

const Header = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleNewPlace = () => {
    setModalVisible(false);
  };
 
  const handleClose = () => {
    setModalVisible(false);
  };

  const user = useSelector((state) => state.users.value[0].firstname);

  


  return (
    <View style={styles.headerContainer}>
      <FontAwesome name='align-justify' onPress={() => setModalVisible(!modalVisible)} size={25} color='#4B7285' />
      <Image style={styles.image} source={require('../assets/logo-fow.png')} />
      <View style={styles.userIconContainer}>
        <FontAwesome name='user-o' size={20} color={user?'green':'red'} />
        <Text style={styles.userIconText}>{user?`Bonjour ${user}`:'Déconnecté'}</Text>
        </View>
      <Modal visible={modalVisible} animationType="none" transparent>
       <View style={styles.centeredView}>
         <View style={styles.modalView}>
           <TouchableOpacity onPress={() => handleNewPlace()} style={styles.button} activeOpacity={0.8}>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => handleClose()} style={styles.button} activeOpacity={0.8}>
            <View style={styles.closeButton}>
           <FontAwesome name='times' size={20} color='#000000' style={styles.deleteIcon} />
           </View>
           <View style={styles.modalMenu}>
            <Text>Menu</Text>
           </View>
           <View style={styles.disconnectedButton}>
           <FontAwesome name='power-off' size={50} color='#000000' style={styles.deleteIcon} />
           </View>
           </TouchableOpacity>
         </View>
       </View>
     </Modal>
    </View>
  );
};

export default Header;
  
  const styles = StyleSheet.create({
    headerContainer: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      width: '100%',
      height: '13%',
      paddingLeft: 25,
      paddingRight: 25,
      marginTop: 10,
    },
    image: {
      width:'25%',
      height: '70%',
      marginLeft: 25,
    },
    modalView: {
      backgroundColor: 'white',
      padding: 30,
      width: '50%',
      height: '96.4%',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    closeButton:{
      flexDirection: 'row-reverse'
    },
    modalMenu:{
      height: '85%',
      marginTop: 15,
    },
    disconnectedButton:{
      alignItems: 'center',
    },
    userIconContainer:{
      flexDirection: "column",
      alignItems:"center",
    },
    userIconText: {
      paddingTop:5,
      fontSize: 12,
    }
  })