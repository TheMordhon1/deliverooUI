import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

const Filter = () => {
  return (
    <View style={styles.container}>
      <Text>Filter</Text>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.lighGrey,
  },
});
