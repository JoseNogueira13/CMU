// CartScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({ route, navigation }) => {
  const { bag, quantity } = route.params;
  console.log('Received bag:', bag, 'and quantity:', quantity);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Load cart data from AsyncStorage when the component mounts
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const saveCart = async (updatedCart) => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  const removeItem = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
    saveCart(updatedCart);
  };

  const updateQuantity = (itemId, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    saveCart(updatedCart);
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text>{`Brand: ${item.brand}`}</Text>
      <Text>{`Name: ${item.title}`}</Text>
      <Text>{`Price: ${item.price}`}</Text>
      <Text>{`Quantity: ${item.quantity}`}</Text>

      {/* Quantity controls */}
      <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)}>
        <Text style={styles.quantityControl}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)}>
        <Text style={styles.quantityControl}>-</Text>
      </TouchableOpacity>

      {/* Remove from cart button */}
      <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeItemButton}>
        <Text style={styles.removeItemButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  // Check if the cart is empty
  const isCartEmpty = cart.length === 0;

  return (
    <View>
      {isCartEmpty ? (
        <View style={styles.emptyCartContainer}>
          <Text>Your cart is empty</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.goBackButtonText}>Go back to Home</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={renderCartItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cartItemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: '100%',
    height: 200,
  },
  quantityControl: {
    fontSize: 20,
    marginHorizontal: 5,
    color: '#A63A50',
  },
  removeItemButton: {
    backgroundColor: '#A63A50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  removeItemButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  emptyCartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  goBackButtonText: {
    color: '#A63A50',
    marginTop: 10,
  },
});

export default CartScreen;
