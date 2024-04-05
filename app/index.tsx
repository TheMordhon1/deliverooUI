import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import React from "react";
import Categories from "@/Components/Categories";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Restaurants from "@/Components/Restaurants";

const statusBarHeight = StatusBar.currentHeight || 0;

const Page = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
      >
        <Categories />
        <Text style={styles.title}>Top picks in your area</Text>
        <Restaurants />
        <Text style={styles.title}>Offers near you</Text>
        <Restaurants />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    top: Platform.OS === "android" ? statusBarHeight + 60 : 60,
    backgroundColor: Colors.lighGrey,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 15,
    marginTop: 20,
  },
});
export default Page;
