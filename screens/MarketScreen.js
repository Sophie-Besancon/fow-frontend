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

        const cards = articlesData.map((data, i) => {
        console.log('data',data, i)
        return <Card key={i} price={data.price} name={data.name} flag={data.flag} background={data.image} />;
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
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      flexDirection: 'column',
    },
  })