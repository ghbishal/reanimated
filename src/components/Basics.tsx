import React, {useEffect} from "react";
import {StyleSheet, Text, View} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const SIZE = 100.0;

const handleRotation = (progress: Animated.SharedValue<number>) => {
  "worklet";

  return `${progress.value * 2 * Math.PI}rad`;
};

export const Basics = () => {
  // shared value
  const progress = useSharedValue(1);
  const scale = useSharedValue(2);

  // Animation styles
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * SIZE) / 2,
      transform: [{scale: scale.value}, {rotate: handleRotation(progress)}],
    };
  });

  useEffect(() => {
    progress.value = withRepeat(withTiming(0.5), 3, true);
    // withSpring makes it like a bounce effect
    scale.value = withRepeat(withSpring(1), 3, true);
  });
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {height: SIZE, width: SIZE, backgroundColor: "blue"},
          reanimatedStyle,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
