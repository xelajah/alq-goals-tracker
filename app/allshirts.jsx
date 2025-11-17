import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const allShirts = [
  {
    id: "1",
    brand: "Undrafted",
    name: "UND Emblem Tee",
    image: require("../assets/images/shirts/undemblemtee.png"),
    size: "Medium",
    price: "₱1400",
  },
  {
    id: "2",
    brand: "Dont Blame The Kids",
    name: "SLANT NEON SPEED TEE - BLACK",
    image: require("../assets/images/shirts/dbtkslant.png"),
    size: "Large",
    price: "₱1600",
  },
  {
    id: "3",
    brand: "Mfcknkids",
    name: "STRUCK TEE",
    image: require("../assets/images/shirts/mfcknkids.jpg"),
    size: "Large",
    price: "₱1800",
  },
  {
    id: "4",
    brand: "MNLA",
    name: "ARCHANGEL TEE",
    image: require("../assets/images/shirts/mnla.jpg"),
    size: "Medium",
    price: "₱2000",
  },
];

export default function AllShirtsScreen() {
  const router = useRouter();

  const handleBuy = (product) => {
    router.push({
      pathname: "/orderform",
      params: { product: JSON.stringify(product) },          
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Shirts by Brand</Text>

      <FlatList
        data={allShirts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={styles.shirtName}>{item.name}</Text>
              <Text style={styles.brand}>{item.brand}</Text>
              <Text>{item.size}</Text>
              <Text style={styles.price}>{item.price}</Text>

              <TouchableOpacity
                style={styles.buyButton}
                onPress={() => handleBuy(item)}
              >
                <Text style={styles.buyText}>Buy</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 20 },
  card: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  image: { width: 80, height: 100, marginRight: 12, resizeMode: "contain" },
  shirtName: { fontSize: 16, fontWeight: "600" },
  brand: { fontSize: 14, fontWeight: "500", color: "#888" },
  price: { fontWeight: "700", marginTop: 4 },
  buyButton: {
    backgroundColor: "#e76f51",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
    alignSelf: "flex-start",
  },
  buyText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
