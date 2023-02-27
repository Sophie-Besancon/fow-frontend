import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, Modal, Pressable, TextInput, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Header = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleNewPlace = () => {
    setModalVisible(false);
  };
 
  const handleClose = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.headerContainer}>
      <FontAwesome name='align-justify' onPress={() => setModalVisible(!modalVisible)} size={30} color='#4B7285' />
      <Image style={styles.image} source={require('../assets/logo-fow.png')} />
      <FontAwesome name='search' size={30} color='#4B7285' />
      <Modal visible={modalVisible} animationType="none" transparent>
       <View style={styles.centeredView}>
         <View style={styles.modalView}>
           <TouchableOpacity onPress={() => handleNewPlace()} style={styles.button} activeOpacity={0.8}>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => handleClose()} style={styles.button} activeOpacity={0.8}>
           <FontAwesome name='times' size={20} color='#000000' style={styles.deleteIcon} />
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
      height: '15%',
      paddingLeft: 15,
      paddingRight: 15,
      marginTop: 30,
    },
    image: {
      width:'24%',
      height: '70%',
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
  })