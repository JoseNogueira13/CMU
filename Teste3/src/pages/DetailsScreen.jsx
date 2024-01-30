// DetailsScreen.js
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Share, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailsScreen = ({ route, navigation }) => {
  const { bag } = route.params;
  const [quantity, setQuantity] = useState(1);

  const addToCart = async () => {
    try {
      if (bag.has_stock) {
        // Get existing cart data from AsyncStorage
        const existingCartData = await AsyncStorage.getItem('cart');
        let cart = existingCartData ? JSON.parse(existingCartData) : [];

        // Check if the bag is already in the cart
        const existingBagIndex = cart.findIndex((item) => item.id === bag.title);

        if (existingBagIndex !== -1) {
          // Bag is already in the cart, update the quantity
          cart[existingBagIndex].quantity += quantity;
        } else {
          // Bag is not in the cart, add it with the selected quantity
          cart.push({ id: bag.title, ...bag, quantity });
        }

        // Save the updated cart data to AsyncStorage
        await AsyncStorage.setItem('cart', JSON.stringify(cart));

        console.log(`Added ${quantity} ${bag.title} to the cart`);
      } else {
        Alert.alert('Out of Stock', 'This bag is currently out of stock and cannot be added to the cart.');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const navigateToCart = () => {
    console.log('Navigating to CartScreen with bag:', bag, 'and quantity:', quantity);
    navigation.navigate('CartScreen', { bag, quantity });
  };

  const shareDetails = async () => {
    try {
      const platformSpecificContent =
        Platform.OS === 'android'
          ? {
              title: `${bag.brand} - ${bag.title}`,
              message: bag.description,
              url: bag.url,
            }
          : {
              message: bag.description,
              url: bag.url,
            };

      await Share.share(platformSpecificContent);
    } catch (error) {
      console.error('Error sharing bag details:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: bag.image }} style={styles.image} />
      <Text>{`Brand: ${bag.brand}`}</Text>
      <Text>{`Name: ${bag.title}`}</Text>
      <Text>{`Price: ${bag.price}`}</Text>
      <Text>{`Description: ${bag.description}`}</Text>
      <Text>{`Delivery Date: ${bag.delivery_date || 'Not available'}`}</Text>

      {/* Quantity input */}
      <View style={styles.quantityContainer}>
        <Text>Quantity:</Text>
        <TextInput
          style={styles.quantityInput}
          keyboardType="numeric"
          value={quantity.toString()}
          onChangeText={(text) => setQuantity(parseInt(text) || 1)}
        />
      </View>

      {/* Add to Cart button */}
      <TouchableOpacity onPress={addToCart} style={styles.addToCartButton}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>

      {/* Go to Cart button */}
      <TouchableOpacity onPress={navigateToCart} style={styles.goToCartButton}>
        <Text style={styles.goToCartButtonText}>Go to Cart</Text>
      </TouchableOpacity>

      {/* Share button */}
      <TouchableOpacity onPress={shareDetails} style={styles.shareButton}>
        <Text style={styles.shareButtonText}>Share</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityInput: {
    height: 30,
    width: 40,
    borderWidth: 1,
    marginHorizontal: 10,
    textAlign: 'center',
  },
  addToCartButton: {
    backgroundColor: '#A63A50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addToCartButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  goToCartButton: {
    backgroundColor: '#A63A50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  goToCartButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  shareButton: {
    backgroundColor: '#007AFF', // Blue color for iOS
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  shareButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default DetailsScreen;
