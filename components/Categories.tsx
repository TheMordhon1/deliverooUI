import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { categories } from "@/assets/data/home";

const Categories = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 15 }}
    >
      {categories.map((item, index) => (
        <View key={index} style={styles.categoriesCard}>
          <Image source={item.img} />
          <Text style={styles.textCategories}>{item.text}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  categoriesCard: {
    marginEnd: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    width: 100,
    height: 100,
    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    marginBottom: 10,
  },
  textCategories: {
    padding: 6,
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
  },
});
