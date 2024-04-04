import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export type Ref = BottomSheetModal;
export type ToggleState = {
  tab1: boolean;
  tab2: boolean;
};

const BottomSheet = forwardRef<Ref>((props, ref) => {
  const [toggle, setToggle] = useState<ToggleState>({
    tab1: true,
    tab2: false,
  });
  const snapPoints = useMemo(() => ["50%"], []);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  const handleToggle = (tab: keyof ToggleState) => {
    setToggle((prevState) => ({
      ...prevState,
      tab1: tab === "tab1",
      tab2: tab === "tab2",
    }));
  };

  const { dismiss } = useBottomSheetModal();
  return (
    <BottomSheetModal
      ref={ref}
      handleIndicatorStyle={{ display: "none" }}
      backgroundStyle={styles.container}
      overDragResistanceFactor={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
    >
      <View style={styles.contentContainer}>
        <View style={styles.toggle}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              toggle.tab1 && styles.activeToggleButton,
            ]}
            onPress={() => handleToggle("tab1")}
          >
            <Text
              style={[
                styles.toggleText,
                toggle.tab1 && styles.activeToggleText,
              ]}
            >
              Delivery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              toggle.tab2 && styles.activeToggleButton,
            ]}
            onPress={() => handleToggle("tab2")}
          >
            <Text
              style={[
                styles.toggleText,
                toggle.tab2 && styles.activeToggleText,
              ]}
            >
              Pickup
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subHeader}>Your Location</Text>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="location-outline" size={20} color={Colors.medium} />
          <Text style={styles.textItem}>Current location</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.subHeader}>Arrival Time</Text>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="stopwatch-outline" size={20} color={Colors.medium} />
          <Text style={styles.textItem}>Now</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.dismissButton} onPress={() => dismiss()}>
        <Text style={styles.dismissText}>Confirm</Text>
      </TouchableOpacity>
    </BottomSheetModal>
  );
});

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    borderRadius: 0,
    backgroundColor: Colors.lighGrey,
  },

  contentContainer: {},
  toggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    gap: 5,
  },
  toggleButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  toggleText: {
    color: Colors.primary,
    fontWeight: "600",
    fontSize: 16,
  },
  activeToggleButton: {
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  activeToggleText: {
    color: "#FFFFFF",
  },

  subHeader: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 15,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#FFFFFF",
    borderColor: Colors.grey,
    borderWidth: 1,
    padding: 15,
    marginBottom: 16,
  },
  textItem: {
    flex: 1,
    color: Colors.mediumDark,
    fontWeight: "600",
  },
  dismissButton: {
    padding: 15,
    backgroundColor: Colors.primary,
    alignItems: "center",
    margin: 15,
    borderRadius: 4,
  },
  dismissText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
