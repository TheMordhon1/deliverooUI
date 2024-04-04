import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { restaurants } from "@/assets/data/home";
import { Link } from "expo-router";

const Restaurants = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 15, marginTop: 15 }}
    >
      {restaurants.map((item, index) => (
        <Link key={index} href="/" asChild>
          <TouchableOpacity style={styles.restaurantCard}>
            <Image source={item.img} style={styles.restaurantImage} />
            <View style={styles.restaurantBox}>
              <Text style={styles.restaurantText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
};

export default Restaurants;

const styles = StyleSheet.create({
  restaurantCard: {
    marginEnd: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    width: 300,
    height: 250,
    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    marginBottom: 10,
  },
  restaurantImage: {
    flex: 5,
    width: undefined,
    height: undefined,
  },
  restaurantBox: {
    flex: 3,
  },
  restaurantText: {
    padding: 10,
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
  },
});
