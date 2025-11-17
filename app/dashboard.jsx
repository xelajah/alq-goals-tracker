import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../src/firebaseConfig";

// Replace these with your actual shirt brand icons
const shirtBrands = [
  { id: "1", name: "UNDRAFTED", icon: require("../assets/images/brands/undlogo.png") },
  { id: "2", name: "DBTK", icon: require("../assets/images/brands/dbtklogo.png") },
  { id: "3", name: "MFCKNKIDS", icon: require("../assets/images/brands/mfckn.png") },
  { id: "4", name: "MNLA", icon: require("../assets/images/brands/mn22.png") },
];

const allShirts = [
  {
    id: "1",
    brand: "UNDRAFTED",
    name: "EMBLEM TEE",
    image: require("../assets/images/shirts/undemblemtee.png"),
    size: "L",
    price: "₱1400",
  },
  {
    id: "2",
    brand: "DONT BLAME THE KIDS",
    name: "SLANT NEON SPEED TEE",
    image: require("../assets/images/shirts/dbtkslant.png"),
    size: "S",
    price: "₱1600",
  },
   {
    id: "3",
    brand: "MFCKNKIDS",
    name: "STRUCT TEE",
    image: require("../assets/images/shirts/mfcknkids.jpg"),
    size: "S",
    price: "₱1800",
  },
  {
    id: "4",
    brand: "MFCKNKIDS",
    name: "GRANDEUR TEE",
    image: require("../assets/images/shirts/grand.webp"),
    size: "S",
    price: "₱1800",
  },
  {
    id: "5",
    brand: "MFCKNKIDS",
    name: "THUGGER TEE",
    image: require("../assets/images/shirts/thuggy.webp"),
    size: "S",
    price: "₱1800",
  },
   {
    id: "6",
    brand: "MNLA",
    name: "ARCHANGEL TEE",
    image: require("../assets/images/shirts/mnla.jpg"),
    size: "S",
    price: "₱2000",
  },
  {
    id: "7",
    brand: "MNLA",
    name: "MMXV",
    image: require("../assets/images/shirts/mmxv.webp"),
    size: "S",
    price: "₱2000",
  },
  {
    id: "8",
    brand: "MNLA",
    name: "RIFT VAST",
    image: require("../assets/images/shirts/rvast.webp"),
    size: "S",
    price: "₱2000",
  },
  {
    id: "9",
    brand: "DONT BLAME THE KIDS",
    name: "RYOSUKE TEE",
    image: require("../assets/images/shirts/ryos.webp"),
    size: "S",
    price: "₱1800",
  },
  {
    id: "10",
    brand: "DONT BLAME THE KIDS",
    name: "CITY OF ANGELS",
    image: require("../assets/images/shirts/coa.webp"),
    size: "S",
    price: "₱1800",
  },
  {
    id: "11",
    brand: "UNDRAFTED",
    name: "BLING TEE",
    image: require("../assets/images/shirts/blingtee.webp"),
    size: "S",
    price: "₱1800",
  },
  {
    id: "12",
    brand: "UNDRAFTED",
    name: "E7EMENTS TEE",
    image: require("../assets/images/shirts/elements.png"),
    size: "S",
    price: "₱1800",
  },
];

export default function ShirtsDashboard() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedShirt, setSelectedShirt] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const filteredShirts = selectedBrand
    ? allShirts.filter((shirt) => shirt.brand === selectedBrand)
    : allShirts;

  const openBuyModal = (shirt) => {
    setSelectedShirt(shirt);
    setModalVisible(true);
  };

  const confirmBuy = async () => {
    if (!selectedShirt) return;

    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "You must be logged in to buy a shirt");
        return;
      }

      await addDoc(collection(db, "shirts"), {
        userId: user.uid,
        shirtName: selectedShirt.name,
        brand: selectedShirt.brand,
        size: selectedShirt.size,
        price: selectedShirt.price,
        purchasedAt: new Date().toISOString(),
      });

      Alert.alert("Success 👕", `You bought: ${selectedShirt.name}`);
      setModalVisible(false);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.location}>Welcome to FITS Shop</Text>
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <Image
            source={require("../assets/images/profile.jpg")}
            style={styles.profile}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Shirt Brands */}
        <View style={styles.brandsWrapper}>
          {shirtBrands.map((brand) => (
            <TouchableOpacity
              key={brand.id}
              style={[
                styles.brandItem,
                selectedBrand === brand.name && styles.brandSelected,
              ]}
              onPress={() =>
                setSelectedBrand(
                  selectedBrand === brand.name ? null : brand.name
                )
              }
            >
              <Image source={brand.icon} style={styles.brandIcon} />
              <Text style={styles.brandName}>{brand.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Shirts List */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {selectedBrand ? `${selectedBrand} Shirts` : "All Shirts"}
          </Text>
        </View>

        {filteredShirts.length > 0 ? (
          <FlatList
            data={filteredShirts}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.shirtCard}
                onPress={() => openBuyModal(item)}
              >
                <Image source={item.image} style={styles.shirtImage} />
                <Text style={styles.shirtName}>{item.name}</Text>
                <Text style={styles.shirtInfo}>Size: {item.size}</Text>
                <Text style={styles.shirtPrice}>{item.price}</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={styles.noShirtsText}>No shirts available</Text>
        )}
      </ScrollView>

      {/* Buy Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Buy this shirt?</Text>
            {selectedShirt && (
              <>
                <Text style={styles.modalShirt}>{selectedShirt.name}</Text>
                <Text style={styles.modalDetails}>
                  {selectedShirt.size} • {selectedShirt.price}
                </Text>
              </>
            )}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#444" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#14b8a6" }]}
                onPress={confirmBuy}
              >
                <Text style={styles.modalButtonText}>Buy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
  },
  location: {
    fontSize: 18,
    fontWeight: "700",
    color: "#eee",
  },
  profile: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },

  brandsWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 20,
    marginBottom: 24,
  },
  brandItem: {
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
  },
  brandSelected: {
    backgroundColor: "#14b8a6",
  },
  brandIcon: {
    width: 48,
    height: 48,
    marginBottom: 6,
    resizeMode: "contain",
  },
  brandName: {
    fontSize: 12,
    color: "#eee",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#eee",
  },
  shirtCard: {
    backgroundColor: "#1f1f1f",
    borderRadius: 16,
    marginHorizontal: 10,
    padding: 12,
    width: 180,
  },
  shirtImage: {
    width: "100%",
    height: 100,
    borderRadius: 12,
    marginBottom: 8,
    resizeMode: "contain",
  },
  shirtName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#eee",
  },
  shirtInfo: {
    fontSize: 13,
    color: "#bbb",
  },
  shirtPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#14b8a6",
  },
  noShirtsText: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
    fontSize: 16,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    backgroundColor: "#1f1f1f",
    borderRadius: 20,
    padding: 24,
    width: "85%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 12,
    color: "#eee",
  },
  modalShirt: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
    color: "#14b8a6",
  },
  modalDetails: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 20,
    textAlign: "center",
  },
  modalActions: {
    flexDirection: "row",
    gap: 16,
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  
});
