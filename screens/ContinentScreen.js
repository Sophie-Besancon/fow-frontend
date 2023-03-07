import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import { Ionicons } from '@expo/vector-icons';


export default function ContinentScreen({ navigation }) {

// const cards = articlesData.map((data, i) => {
//     const isLikeinFavorite = users.articleInFavorite.some(article => article._id === data._id);
//     return <Card key={i} price={data.price} name={data.name} image={data.image[0]} id={data._id} note={data.note} description={data.description} stock={data.stock} categoryName={data.categoryName} countryName={data.countryName} continentOfCountry={data.continentOfCountry} isLikeinFavorite={isLikeinFavorite} />;
// });

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Header />
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton} activeOpacity={0.8}>
                <Ionicons name="md-arrow-back-circle-outline" size={20} color="white" /><Text style={styles.textButton}> Retour </Text>
            </TouchableOpacity>
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
    textButton: {
        color: '#ffffff',
    },
    backButton: {
        backgroundColor: '#4B7285',
        height: 40,
        margin: 10,
        marginLeft: 20,
        padding: 10,
        borderRadius: 8,
        flexDirection: "row",
        alignSelf: "flex-start",
    },
})