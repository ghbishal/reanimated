import {View, Text, Dimensions, StyleSheet} from "react-native";
import React, {useLayoutEffect} from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

type Props = {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
};

const {height, width} = Dimensions.get("window");

const SIZE = width * 0.7;

export const Page = ({title, index, translateX}: Props) => {
  const inputRange = [(-index - 1) * width, index * width, (index + 1) * width];

  const rStyle = useAnimatedStyle(() => {
    // What is interpolate and how it is working?
    //when translatex.value = (index - 1) * width then scale value = 0,
    // when translatex.value = index * width then scale value = 1,
    //when translatex.value = (index + 1) * width then scale value = 0,
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );

    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP
    );

    return {
      borderRadius,
      transform: [{scale}],
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [200, 0, -200]
    );

    return {
      transform: [
        {
          translateY,
        },
      ],
    };
  });

  return (
    <View
      className="items-center justify-center"
      style={[
        styles.pageContainer,
        {backgroundColor: `rgba(0,0,256,0.${index + 2})`},
      ]}
    >
      <Animated.View style={[styles.square, rStyle]} />
      <Animated.View style={[{position: "absolute"}, rTextStyle]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    width,
    height,
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: "rgba(0,0,256,0.4)",
  },
  text: {
    fontSize: 70,
    color: "white",
    textTransform: "uppercase",
    fontWeight: "700",
  },
});
