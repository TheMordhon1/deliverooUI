import ParallaxScrollView from "@/Components/ParallaxScrollView";
import Restaurants from "@/Components/Restaurants";
import { restaurant } from "@/assets/data/restaurant";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link, useNavigation } from "expo-router";
import React, { useLayoutEffect, useRef, useState } from "react";
import {
  Image,
  ListRenderItem,
  Platform,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const Details = () => {
  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  const scrollViewRef = useRef<ScrollView>(null);
  const itemsCategoryRef = useRef<TouchableOpacity[]>([]);

  const onScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    if (y > 350) {
      opacity.value = withTiming(1);
    } else {
      opacity.value = withTiming(0);
    }
  };

  const DATA = restaurant.food.map((item, index) => ({
    title: item.category,
    data: item.meals,
    index,
  }));

  const handleSelectCategory = (index: number) => {
    setSelectedIndex(index);
    const selectedItems = itemsCategoryRef?.current[index];
    selectedItems.measure((x) => {
      scrollViewRef?.current?.scrollTo({
        x: Platform.OS === "ios" ? x - 50 : x,
        y: 0,
        animated: true,
      });
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
      headerTintColor: Colors.primary,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.roundButton}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.rightButton}>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="share-outline" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="search-outline" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const renderItem: ListRenderItem<any> = ({ item, index }) => (
    <Link href="/" asChild>
      <TouchableOpacity style={styles.renderItem}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemInfo}>{item.info}</Text>
          <Text style={styles.itemPrice}>${item.price}</Text>
        </View>
        <View style={styles.itemRight}>
          <Image source={item.img} style={styles.itemImage} />
        </View>
      </TouchableOpacity>
    </Link>
  );
  return (
    <>
      <ParallaxScrollView
        showVerticalScrollIndicator={false}
        scrollEvent={onScroll}
        backgroundColor="#FFFFFF"
        contentBackgroundColor={Colors.lighGrey}
        contentContainerStyle={{ flex: 1, backgroundColor: "red" }}
        parallaxHeaderHeight={250}
        stickyHeaderHeight={95}
        renderStickyHeader={() => (
          <View
            key="sticky-header"
            style={
              Platform.OS === "ios"
                ? styles.stickySectionIos
                : styles.stickySectionAndroid
            }
          >
            <Text style={styles.stickyTitle}>{restaurant.name}</Text>
          </View>
        )}
        // renderScrollComponent={() => <Animated.View />}
        renderBackground={() => <Image source={restaurant.img} />}
      >
        <View style={styles.container}>
          <Text style={styles.restaurantTitle}>{restaurant.name}</Text>
          <Text style={styles.restaurantDescription}>
            {restaurant.delivery} ·{" "}
            {restaurant.tags.map(
              (tag, index) =>
                ` ${tag} ${index === restaurant.tags.length - 1 ? "" : "·"}`
            )}
          </Text>
          <Text style={styles.restaurantDescription}>{restaurant.about}</Text>

          <SectionList
            keyExtractor={(item, index) => `${item.id + index}`}
            sections={DATA}
            renderItem={renderItem}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.sectionHeader}>{title}</Text>
            )}
            contentContainerStyle={{ paddingBottom: 50 }}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  backgroundColor: Colors.grey,
                  marginHorizontal: 15,
                }}
              />
            )}
            SectionSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: Colors.grey }} />
            )}
            scrollEnabled={false}
          />
        </View>
      </ParallaxScrollView>
      <Animated.View style={[styles.stickyCategoriesContainer, animatedStyle]}>
        <ScrollView
          horizontal
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 15,
            gap: 40,
            alignItems: "center",
          }}
        >
          {restaurant.food.map((item, index) => (
            <TouchableOpacity
              key={index}
              ref={(ref) => (itemsCategoryRef.current[index] = ref!)}
              style={
                index === selectedIndex
                  ? styles.buttonCategoryActive
                  : styles.buttonCategory
              }
              onPress={() => handleSelectCategory(index)}
            >
              <Text
                style={
                  index === selectedIndex
                    ? styles.buttonTextCategoryActive
                    : styles.buttonTextCategory
                }
              >
                {item.category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    </>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lighGrey,
    flex: 1,
  },
  restaurantTitle: {
    fontSize: 30,
    color: Colors.mediumDark,
    marginBottom: 16,
    padding: 15,
  },
  restaurantDescription: {
    fontSize: 16,
    color: Colors.medium,
    marginBottom: 16,
    lineHeight: 20,
    padding: 15,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.mediumDark,
    marginTop: 40,
    padding: 15,
  },
  renderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    gap: 16,
  },
  itemLeft: {
    flex: 2,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemInfo: {
    fontSize: 14,
    color: Colors.medium,
    marginTop: 10,
  },
  itemPrice: {
    fontSize: 14,
    color: Colors.medium,
    marginTop: 20,
  },
  itemRight: { flex: 1, width: 80, height: 120 },
  itemImage: {
    width: undefined,
    height: undefined,
    flex: 1,
    borderRadius: 8,
  },
  stickySectionIos: {
    paddingLeft: 70,
    justifyContent: "flex-end",
    height: 87,
  },
  stickySectionAndroid: {
    paddingLeft: 70,
    justifyContent: "flex-end",
    height: 72,
  },
  stickyTitle: {
    color: Colors.mediumDark,
    fontWeight: "bold",
    fontSize: 20,
  },
  roundButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },
  rightButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  stickyCategoriesContainer: {
    position: "absolute",
    top: Platform.OS === "android" ? 76 : 93,
    right: 0,
    left: 0,
    backgroundColor: "#FFFFFF",
    paddingTop: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: Platform.OS === "android" ? 0.4 : 8,
    shadowColor: "#000000",
    shadowOpacity: 0.01,
    shadowRadius: 0.3,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    marginBottom: 12,
  },
  buttonCategoryActive: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 20,
    elevation: 8,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    marginBottom: 12,
  },
  buttonTextCategoryActive: {
    color: "#FFFFFF",
  },
  buttonCategory: {
    marginBottom: 12,
  },
  buttonTextCategory: {
    color: Colors.primary,
  },
});
