import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, Modal, Pressable, TextInput, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Card = (props) => {
  

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imgCardContainer}>
        <View style={styles.textImgCardContainer}>
            <View style={styles.splitContainerFlag}>
        <Text>Flag</Text>
        </View>
        <View style={styles.splitContainerPrice}>
        <Text>Price</Text>
        </View>
        </View>
      </View>
      <View style={styles.bottomCardContainer}>
      <View style={styles.nameProductContainer}>
        <Text>Nom Produit</Text>
      </View>
      <View style={styles.buttonProductContainer}>
      
      <FontAwesome name='info-circle' size={20} color='#000000' style={styles.deleteIcon} />
      <FontAwesome name='heart-o' size={20} color='#000000' style={styles.deleteIcon} />
      <FontAwesome name='cart-plus' size={20} color='#000000' style={styles.deleteIcon} />
      </View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: "green",
      width: "90%",
      height: "45%",
    },
    imgCardContainer: {
     alignSelf: 'center',
     backgroundColor: "yellow",
     width: '90%',
     height: '70%',
     marginTop: 10,
    },
    textImgCardContainer: {
        backgroundColor: "red",
        flexDirection: 'row',
        height: '15%',
    },
    splitContainerPrice: {
        width: '50%',
        paddingLeft: 105,
        justifyContent: 'center',
        backgroundColor:'blue',
    }, splitContainerFlag:{
        width: '50%',
        paddingLeft: 10,
        justifyContent: 'center',
    },
    bottomCardContainer: {
        backgroundColor: 'blue',
        width: '90%',
        height: '24%',
        alignSelf:'center',
    },
    nameProductContainer: {
        height:'30%',
        marginLeft:40,
        marginTop:10,
    },
    buttonProductContainer: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        height:'50%',
    }
})