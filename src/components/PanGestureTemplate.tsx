import {View, Text} from "react-native";
import React from "react";
import Animated, {
  event,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import {useAnimatedGestureHandler} from "react-native-reanimated";
import {PanGestureHandler} from "react-native-gesture-handler";

const SIZE = 100.0;
const CIRCLE_RADIUS = SIZE * 2;

type ContextProps = {
  translateX: number;
  translateY: number;
};

export const PanGestureTemplate = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextProps
  >({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: () => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);

      if (distance < CIRCLE_RADIUS + SIZE / 2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });
  return (
    <View className="justify-center items-center flex-1">
      <View
        className="justify-center items-center rounded-full border-4 border-[#4c30817d] "
        style={{
          width: CIRCLE_RADIUS * 2,
          height: CIRCLE_RADIUS * 2,
        }}
      >
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View
            style={[
              {
                width: SIZE,
                height: SIZE,
                backgroundColor: "rgba(0,0,256,0.5)",
                borderRadius: 20,
              },
              rStyle,
            ]}
          />
        </PanGestureHandler>
      </View>
    </View>
  );
};
