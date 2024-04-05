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
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const Restaurants = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 15, marginTop: 15 }}
    >
      {restaurants.map((item, index) => (
        <Link key={index} href="/(modal)/details" asChild>
          <TouchableOpacity style={styles.restaurantCard}>
            <View style={styles.imageContainer}>
              <Image source={item.img} style={styles.restaurantImage} />
              <View style={styles.durationContainer}>
                <View style={styles.duration}>
                  <Ionicons
                    name="ios-stopwatch-outline"
                    size={14}
                    color={Colors.mediumDark}
                  />
                  <Text style={styles.durationText}>{item.duration} min</Text>
                </View>
              </View>
            </View>
            <View style={styles.restaurantBox}>
              <Text style={styles.restaurantText}>{item.name}</Text>
              <View style={styles.restaurantRating}>
                <Ionicons name="star" size={12} color={Colors.green} />
                <Text style={styles.ratingText}>{item.rating}</Text>
                <Text style={styles.ratingsText}>{item.ratings}</Text>
              </View>
              <Text style={styles.distanceText}>
                {item.distance}
                {item.isFreeDelivery ? " · Free delivery" : ""}
              </Text>
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
  imageContainer: {
    flex: 5,
  },
  restaurantImage: {
    width: undefined,
    height: undefined,
    flex: 1,
  },
  durationContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  duration: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: "#FFFFFF",
    padding: 8,
    borderRadius: 999,
    elevation: 4,
    shadowColor: "#000000",
    flexWrap: "wrap",
    shadowOpacity: 0.06,
    marginTop: -15,
    marginRight: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  durationText: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.mediumDark,
  },
  restaurantBox: {
    paddingTop: 2,
    paddingBottom: 10,
    paddingHorizontal: 10,
    gap: 5,
  },
  restaurantText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
  },
  restaurantRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    color: Colors.green,
    fontSize: 12,
  },
  ratingsText: {
    color: Colors.medium,
    fontSize: 12,
  },
  restaurantDistance: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  distanceText: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.medium,
  },
});
