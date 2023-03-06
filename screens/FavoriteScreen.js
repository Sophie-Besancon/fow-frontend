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
  } from 'react-native';
import Product from '../components/Product';
import { useSelector } from "react-redux";
import { useEffect, useState} from "react";
import Header from '../components/Header'
import Card from '../components/Card'
  

  
  export default function FavoriteScreen() {
    const users = useSelector((state) => state.users.value[0]);
    const [articlesData, setArticlesData] = useState([]);
  //console.log(articlesData)
  //console.log(users.isLike)

    useEffect(() => {
      fetch("http://192.168.1.14:3000/users/favoriteArticle", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: users.token }),
      }).then((response) =>
        response.json()).then((data) => {
          setArticlesData(data.articlesinFavorite)
        });
    }, []);

    const cards = articlesData.map((data, i) => {
      return <Card key={i} price={data.price} name={data.name} image={data.image[0]} id={data._id} note={data.note} description={data.description} stock={data.stock} categoryName={data.categoryName} countryName={data.countryName} continentOfCountry={data.continentOfCountry} isLikeinFavorite/>;
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
    },
  })