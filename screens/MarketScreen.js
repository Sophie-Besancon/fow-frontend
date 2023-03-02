import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    SafeAreaView,
    ScrollView,
  } from 'react-native';
import Header from '../components/Header'
import Card from '../components/Card'
import { useEffect, useState } from "react";
  
  
  export default function MarketScreen() {
    const [articlesData, setarticlesData] = useState([]);
    //console.log('articledata', articlesData.length)
    
    
    useEffect(() => {
      fetch("http://192.168.1.14:3000/articles").then((response) =>
        response.json()).then((cardData) => {
          setarticlesData(cardData.allArticles)
          });
        }, []);

        //const flags = [{mexico:"{require('../assets/mexico.png')}", italy:"require('../assets/italy.png')"}]
        //console.log(flags[0].mexico)
        const cards = articlesData.map((data, i) => {
        //console.log('data',data, i)
        //console.log(data.countryName)
        //flag={flags[0].mexico} 
        return <Card key={i} price={data.price} name={data.name} image={data.image[0]} />;
        });

    return (

      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Header/>
          <View>
          <Text>Welcome on FOW / MarketScreen</Text>
          </View>
          <ScrollView style={styles.scrollView}>
          {cards}
          </ScrollView>
      </KeyboardAvoidingView>


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

