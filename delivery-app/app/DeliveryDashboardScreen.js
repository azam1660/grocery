import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.70.177:5000/api";

const DeliveryDashboardScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    const fetchTokenAndOrders = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) throw new Error("No token found");
        setUserToken(token);
        fetchOrders(token);
      } catch (error) {
        Alert.alert("Error", error.message || "Failed to fetch token.");
        navigation.navigate("Login");
      }
    };

    fetchTokenAndOrders();
  }, [navigation]);

  const fetchOrders = async (token) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      Alert.alert("Error", "Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    Alert.alert("Logged out", "You have been logged out.");
    navigation.navigate("Login");
  };

  const assignOrderToSelf = async (orderId) => {
    try {
      await axios.put(
        `${API_URL}/orders/assign/${orderId}`,
        {},
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      Alert.alert("Success", "Order has been assigned to you.");
      fetchOrders(userToken);
    } catch (error) {
      console.error("Error assigning order:", error);
      Alert.alert("Error", "Failed to assign order.");
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `${API_URL}/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      Alert.alert("Success", `Order status updated to ${newStatus}`);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error(
        "Error updating status:",
        error.response?.data?.message || error.message
      );
      Alert.alert("Error", "Failed to update status.");
    }
  };

  const renderOrder = ({ item }) => {
    if (showCompleted && item.status !== "delivered") return null;

    return (
      <View style={styles.orderCard}>
        <Text style={styles.orderTitle}>Order: {item._id}</Text>
        <Text style={styles.orderText}>Customer: {item.name}</Text>
        <Text style={styles.orderText}>Address: {item.address}</Text>
        <Text style={styles.orderText}>Status: {item.status}</Text>
        {!item.deliveryPerson && (
          <TouchableOpacity
            style={styles.assignButton}
            onPress={() => assignOrderToSelf(item._id)}
          >
            <Text style={styles.buttonText}>Assign to Me</Text>
          </TouchableOpacity>
        )}
        <View style={styles.buttonContainer}>
          {["pending", "prepared", "in transit"].map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.statusButton,
                item.status === status && styles.activeStatusButton,
              ]}
              onPress={() => updateOrderStatus(item._id, status)}
              disabled={item.status === status}
            >
              <Text style={styles.buttonText}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Delivery Dashboard</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={24} color="#FFFAEF" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.filterToggle}
          onPress={() => setShowCompleted((prev) => !prev)}
        >
          <Text style={styles.filterToggleText}>
            {showCompleted ? "Show All Orders" : "Show Completed Orders"}
          </Text>
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator size="large" color="#3BFF90" />
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item._id.toString()}
            renderItem={renderOrder}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No orders available.</Text>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000000",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFAEF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
  logoutButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#000000",
  },
  filterToggle: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#3BFF90",
    borderRadius: 8,
    alignItems: "center",
  },
  filterToggleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  orderCard: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
    color: "#000000",
  },
  orderText: {
    fontSize: 16,
    marginBottom: 4,
    color: "#000000",
  },
  assignButton: {
    backgroundColor: "#3BFF90",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  statusButton: {
    backgroundColor: "#000000",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    alignItems: "center",
  },
  activeStatusButton: {
    backgroundColor: "#3BFF90",
  },
  buttonText: {
    color: "#FFFAEF",
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#000000",
  },
});

export default DeliveryDashboardScreen;
