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
  } from 'react-native';
import Header from '../components/Header'
  
  
  export default function MarketScreen() {
  
    return (

      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Header/>
          <View>
          <Text>Welcome on FOW / MarketScreen</Text>
          </View>
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