import {
  Button,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { useNavigation } from "expo-router";
import categories from "@/assets/data/filter.json";
import { Ionicons } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export type Categories = {
  name: string;
  count: number;
  checked?: boolean;
};
const Filter = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState<Categories[]>(categories);
  const [selected, setSelected] = useState<Categories[]>([]);
  const flexWidth = useSharedValue(0);
  const textScale = useSharedValue(0);

  useEffect(() => {
    const hasSelected = selected.length > 0;
    const selectedItems = items.filter((item) => item.checked);
    const newSelected = selectedItems.length > 0;

    if (hasSelected !== newSelected) {
      flexWidth.value = withTiming(newSelected ? 150 : 0);
      textScale.value = withTiming(newSelected ? 1 : 0);
    }

    setSelected(selectedItems);
  }, [items]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: flexWidth.value,
      opacity: flexWidth.value > 0 ? 1 : 0,
    };
  });
  const animatedText = useAnimatedStyle(() => {
    return {
      transform: [{ scale: textScale.value }],
    };
  });

  function handleSelect(item: Categories) {
    item.checked = !item.checked;
    let newItems = items.map((i) => (i.name === item.name ? item : i));
    setItems(newItems);
  }

  function handleClearAll() {
    let clearItems = items.map((i) => ({ ...i, checked: false }));
    setItems(clearItems);
  }
  const itemBox = () => (
    <>
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="arrow-down-outline" size={20} color={Colors.medium} />
          <View style={styles.textItem}>
            <Text style={styles.titleItem}>Sort</Text>
            <Text style={styles.subTitleItem}>Recommended</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="fast-food-outline" size={20} color={Colors.medium} />
          <View style={styles.textItem}>
            <Text style={styles.titleItem}>Hygiene rating</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="pricetag-outline" size={20} color={Colors.medium} />
          <View style={styles.textItem}>
            <Text style={styles.titleItem}>Offers</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="nutrition-outline" size={20} color={Colors.medium} />
          <View style={styles.textItem}>
            <Text style={styles.titleItem}>Sort</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.itemHeaderContainer}>
        <Text style={styles.itemHeaderText}>Categories</Text>
        {/* <TouchableOpacity style={styles.clearButton}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity> */}
      </View>
    </>
  );
  const renderItem: ListRenderItem<Categories> = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleSelect(item)}
      style={styles.categoryItem}
      activeOpacity={1}
    >
      <Text>
        {item.name} ({item.count})
      </Text>
      <BouncyCheckbox
        fillColor={Colors.primary}
        unfillColor="#FFFFFF"
        disableBuiltInState
        iconStyle={{
          borderRadius: 4,
          borderWidth: 2,
          borderColor: Colors.primary,
        }}
        innerIconStyle={{ borderRadius: 4, borderWidth: 2 }}
        isChecked={item.checked}
        onPress={() => handleSelect(item)}
      />
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        ListHeaderComponent={itemBox}
      />
      <View style={{ height: 80 }} />
      <View style={styles.footer}>
        <Animated.View style={[animatedStyle, styles.buttonOutline]}>
          <TouchableOpacity onPress={() => handleClearAll()}>
            <Animated.Text style={[animatedText, styles.textButtonOutline]}>
              Clear All
            </Animated.Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.buttonFull]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.textButtonFull}>Done</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
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

  itemContainer: {
    backgroundColor: "#FFFFFF",
    marginBottom: 20,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  textItem: {
    flex: 1,
    marginLeft: 10,
  },
  titleItem: {
    fontSize: 14,
    color: "#000000",
  },
  subTitleItem: {
    fontSize: 12,
    color: Colors.medium,
  },
  itemHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemHeaderText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  clearButton: {
    marginRight: 8,
  },
  clearText: {
    color: Colors.medium,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: Colors.lighGrey,
    padding: 10,
    elevation: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    shadowOffset: {
      width: 0,
      height: -10,
    },
  },
  buttonFull: {
    backgroundColor: Colors.primary,
    justifyContent: "center",
    borderRadius: 8,
    height: 50,
    flex: 1,
  },
  buttonOutline: {
    borderColor: Colors.primary,
    borderWidth: 0.5,
    justifyContent: "center",
    height: 50,
    borderRadius: 8,
  },
  textButtonFull: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  textButtonOutline: {
    textAlign: "center",
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
});
