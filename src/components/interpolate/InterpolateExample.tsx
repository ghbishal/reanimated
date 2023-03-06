import {View, Text} from "react-native";
import React, {useLayoutEffect} from "react";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import {Page} from "./Page";
import {useNavigation} from "@react-navigation/native";

const WORDS = ["What's", "up", "mobile", "devs?"];

export const InterpolateExample = () => {
  const navigation = useNavigation();

  // header is not being displayed
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: false,
  //   });
  // });

  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    console.log(event.contentOffset.x);
  });

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      horizontal
      style={{flex: 1, backgroundColor: "#fff"}}
    >
      {WORDS.map((title, index) => {
        return (
          <Page
            key={index.toString()}
            title={title}
            index={index}
            translateX={translateX}
          />
        );
      })}
    </Animated.ScrollView>
  );
};
