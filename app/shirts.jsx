import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../src/firebaseConfig";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Shirts() {
  const [shirts, setShirts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchShirts = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          Alert.alert("Not logged in", "Please log in to see your shirts.");
          setLoading(false);
          return;
        }

        const q = query(collection(db, "shirts"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const shirtData = [];
        querySnapshot.forEach((doc) => {
          shirtData.push({ id: doc.id, ...doc.data() });
        });

        setShirts(shirtData);
      } catch (error) {
        Alert.alert("Error fetching shirts", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShirts();
  }, []);

  const renderShirt = ({ item }) => (
    <View style={styles.shirtCard}>
      <Text style={styles.shirtName}>{item.shirtName}</Text>
      <Text style={styles.details}>Brand: {item.brand}</Text>
      <Text style={styles.details}>Size: {item.size}</Text>
      <Text style={styles.details}>Price: {item.price}</Text>
      <Text style={styles.details}>
        Purchased At: {new Date(item.purchasedAt).toLocaleString()}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#14b8a6" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push("/profile")}>
        <Ionicons name="arrow-back" size={24} color="#14b8a6" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {shirts.length === 0 ? (
        <Text style={styles.noShirtsText}>You have no shirts in your collection.</Text>
      ) : (
        <FlatList
          data={shirts}
          keyExtractor={(item) => item.id}
          renderItem={renderShirt}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 20,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButtonText: {
    color: "#14b8a6",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 6,
  },
  shirtCard: {
    backgroundColor: "#1f1f1f",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#14b8a6",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  shirtName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#eee",
    marginBottom: 6,
  },
  details: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 4,
  },
  noShirtsText: {
    fontSize: 16,
    color: "#aaa",
    textAlign: "center",
    marginTop: 50,
  },
});
