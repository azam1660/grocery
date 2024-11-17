import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
}

interface OrderDetails {
  name: string;
  email: string;
  address: string;
  quantity: number;
}

const HomeScreen = ({ navigation, route }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    name: "",
    email: "",
    address: "",
    quantity: 1,
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userToken } = route.params;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://192.168.70.177:5000/api/products",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error.response?.data);
      Alert.alert("Error", "Failed to fetch products. Please try again.");
      setIsLoading(false);
    }
  };

  const handleBook = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleOrder = async () => {
    if (!orderDetails.name || !orderDetails.email || !orderDetails.address) {
      Alert.alert("Error", "Please fill in all the required details");
      return;
    }

    if (!selectedProduct) return;

    const orderData = {
      products: [
        {
          productId: selectedProduct._id,
          quantity: orderDetails.quantity,
        },
      ],
      totalAmount: selectedProduct.price * orderDetails.quantity,
      name: orderDetails.name,
      email: orderDetails.email,
      address: orderDetails.address,
    };

    try {
      const response = await axios.post(
        "http://192.168.70.177:5000/api/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      Alert.alert("Success", "Your order has been placed successfully!");
      setSelectedProduct(null);
      setOrderDetails({ name: "", email: "", address: "", quantity: 1 });
    } catch (error) {
      console.error(error.response?.data);
      Alert.alert(
        "Error",
        "There was an issue placing your order. Please try again."
      );
    }
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        <Text style={styles.productDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => handleBook(item)}
        accessibilityLabel={`Book ${item.name}`}
        accessibilityHint="Opens order form for this product"
      >
        <Ionicons name="cart-outline" size={24} color="#000000" />
        <Text style={styles.bookButtonText}>Book</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3bff90" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Available Products</Text>
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={renderProductItem}
          style={styles.productList}
        />

        {selectedProduct && (
          <View style={styles.orderForm}>
            <Text style={styles.formHeader}>Order Details</Text>
            <TextInput
              style={styles.input}
              value={orderDetails.name}
              onChangeText={(text) =>
                setOrderDetails({ ...orderDetails, name: text })
              }
              placeholder="Enter your name"
              accessibilityLabel="Name input"
            />
            <TextInput
              style={styles.input}
              value={orderDetails.email}
              onChangeText={(text) =>
                setOrderDetails({ ...orderDetails, email: text })
              }
              placeholder="Enter your email"
              keyboardType="email-address"
              accessibilityLabel="Email input"
            />
            <TextInput
              style={styles.input}
              value={orderDetails.address}
              onChangeText={(text) =>
                setOrderDetails({ ...orderDetails, address: text })
              }
              placeholder="Enter your address"
              accessibilityLabel="Address input"
            />
            <View style={styles.quantityContainer}>
              <Text style={styles.quantityLabel}>Quantity:</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() =>
                  setOrderDetails({
                    ...orderDetails,
                    quantity: Math.max(1, orderDetails.quantity - 1),
                  })
                }
                accessibilityLabel="Decrease quantity"
              >
                <Ionicons name="remove" size={24} color="#000000" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{orderDetails.quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() =>
                  setOrderDetails({
                    ...orderDetails,
                    quantity: orderDetails.quantity + 1,
                  })
                }
                accessibilityLabel="Increase quantity"
              >
                <Ionicons name="add" size={24} color="#000000" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.placeOrderButton}
              onPress={handleOrder}
              accessibilityLabel="Place Order"
              accessibilityHint="Submits your order"
            >
              <Text style={styles.placeOrderButtonText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaef",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fffaef",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000000",
  },
  productList: {
    flexGrow: 0,
  },
  productCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 9,
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000000",
  },
  productPrice: {
    fontSize: 16,
    color: "#3bff90",
    fontWeight: "bold",
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    color: "#666666",
  },
  bookButton: {
    backgroundColor: "#3bff90",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
  },
  bookButtonText: {
    color: "#000000",
    fontWeight: "bold",
    marginLeft: 5,
  },
  orderForm: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 9,
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  formHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#000000",
  },
  input: {
    height: 50,
    borderColor: "#cccccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 9,
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  quantityLabel: {
    fontSize: 16,
    marginRight: 10,
    color: "#000000",
  },
  quantityButton: {
    backgroundColor: "#f0f0f0",
    padding: 5,
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
    color: "#000000",
  },
  placeOrderButton: {
    backgroundColor: "#3bff90",
    paddingVertical: 15,
    borderRadius: 9,
    alignItems: "center",
  },
  placeOrderButtonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;
