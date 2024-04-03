import { Button, StyleSheet, Text, View } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import Colors from "@/constants/Colors";

export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref>((props, ref) => {
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
      <Text>BottomSheet</Text>
      <Button title="Dismiss" onPress={() => dismiss()} />
    </BottomSheetModal>
  );
});

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    borderRadius: 0,
    backgroundColor: Colors.lighGrey,
  },
});
