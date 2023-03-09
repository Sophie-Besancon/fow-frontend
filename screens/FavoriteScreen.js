import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Alert
  } from 'react-native';
import Product from '../components/Product';
import { useSelector } from "react-redux";
import { useEffect, useState} from "react";
import Header from '../components/Header'
import Card from '../components/Card'
import { useNavigation, useIsFocused } from '@react-navigation/native';
  

  
export default function FavoriteScreen() {
  const users = useSelector((state) => state.users.value[0]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      if(!users.token){
        Alert.alert("Erreur", "Veuillez vous connecter pour afficher vos favoris.", [
          { text: "Ok" },
          navigation.navigate('Compte')
        ]);  
      }
    }
  }, [isFocused]);


  console.log('USER ARTICLE :', users.articleInFavorite.length);
    
  
  const cards = users.articleInFavorite.map((data, i) => {
      return <Card key={i} price={data.price} name={data.name} image={data.image} id={data.id} note={data.note} description={data.description} stock={data.stock} categoryName={data.categoryName} countryName={data.countryName} continentOfCountry={data.continentOfCountry} flagOfCountry={data.flagOfCountry} isLikeinFavorite/>;
    });



    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <ScrollView style={styles.scrollView}>
        {cards}
        </ScrollView>
      </SafeAreaView>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      height:'100%'
    },
  })