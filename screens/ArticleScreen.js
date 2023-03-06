import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { StyleSheet, Text, View, Header, Button } from 'react-native';

const ArticleScreen = () => {
      const navigation = useNavigation();
  return (
    <View>
    <Text> ArticleScreen </Text>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ArticleScreen;

