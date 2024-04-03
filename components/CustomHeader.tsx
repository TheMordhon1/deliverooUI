import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SearchBar = () => (
  <View style={style.searchBarContainer}>
    <View style={style.searchBar}>
      <Ionicons name="search-outline" color={Colors.medium} size={20} />
      <TextInput
        style={style.searchInput}
        placeholder="Restaurants, groceries, dishes"
      />
    </View>
    <Link href={"/"} asChild>
      <TouchableOpacity style={style.optionButton}>
        <Ionicons name="options-outline" color={Colors.primary} size={20} />
      </TouchableOpacity>
    </Link>
  </View>
);

const CustomHeader = () => {
  return (
    <SafeAreaView style={style.safeArea}>
      <View style={style.container}>
        <TouchableOpacity>
          <Image
            style={style.bike}
            source={require("@/assets/images/bike.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={style.titleContainer}>
          <Text style={style.title}>Delivery · Now</Text>
          <View style={style.locationName}>
            <Text style={style.subTitle}>Bogor, Jawa Barat</Text>
            <Ionicons name="chevron-down" color={Colors.primary} size={20} />
          </View>
        </TouchableOpacity>
        <View style={style.actionButtonContainer}>
          <TouchableOpacity style={style.actionButton}>
            <Ionicons name="heart-outline" color={Colors.primary} size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={style.actionButton}>
            <Ionicons name="person-outline" color={Colors.primary} size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <SearchBar />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    height: 60,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    gap: 20,
  },
  bike: {
    width: 30,
    height: 30,
    backgroundColor: "#f6f6f6",
    borderRadius: 50,
  },
  titleContainer: {
    flex: 1,
  },
  locationName: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  title: {
    color: Colors.medium,
    fontSize: 14,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  actionButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  actionButton: {
    backgroundColor: Colors.lighGrey,
    padding: 10,
    borderRadius: 10,
  },

  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    gap: 10,
    height: 50,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: Colors.lighGrey,
    borderRadius: 5,
    paddingLeft: 5,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    color: Colors.mediumDark,
  },
  optionButton: {
    padding: 10,
  },
});

export default CustomHeader;
