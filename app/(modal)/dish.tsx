import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import Animated, { FadeIn, FadeInLeft } from "react-native-reanimated";

const Dish = () => {
  const { item, name, id, info, price, img } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Animated.Image
        source={img}
        style={styles.image}
        entering={FadeIn.duration(400).delay(100)}
      />
      <View style={styles.textContainer}>
        <Animated.Text
          style={styles.name}
          entering={FadeInLeft.duration(400).delay(200)}
        >
          {name}
        </Animated.Text>
        <Animated.Text
          style={styles.info}
          entering={FadeInLeft.duration(400).delay(400)}
        >
          {info}
        </Animated.Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.fullButton}>
          <Text style={styles.textFooter}>Add for ${price}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Dish;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: "100%",
    height: 300,
  },
  textContainer: {
    padding: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: Colors.mediumDark,
    marginBottom: 8,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    paddingBottom: 30,
    left: 0,
    width: "100%",
    padding: 15,
    backgroundColor: "#FFFFFF",
    elevation: 8,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: -10,
    },
  },
  fullButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  textFooter: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
