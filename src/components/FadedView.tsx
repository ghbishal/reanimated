import {View, Text} from "react-native";
import React, {useEffect} from "react";
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const MOVING_DISTANCE = 50;

export const FadedView = () => {
  const progress = useSharedValue(0);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.value, [0, 0.5, 1], [0, 1, 0]),
      transform: [
        {
          translateX: interpolate(
            progress.value,
            [0, 0.5, 1],
            [MOVING_DISTANCE, 0, -MOVING_DISTANCE]
          ),
        },
      ],
    };
  });

  useEffect(() => {
    progress.value = withSequence(
      withTiming(0, {duration: 250}),
      withTiming(0.5, {duration: 250}),
      withDelay(2000, withTiming(1, {duration: 250}))
    );
  });

  return (
    <View>
      <Animated.View style={reanimatedStyle}>
        <View
          style={{
            height: 32,
            backgroundColor: "orange",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              paddingVertical: 10,
            }}
          >
            オンラインになりますた
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};
