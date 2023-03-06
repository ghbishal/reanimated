import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {Button} from "react-native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../Navigations/params";
import {InterpolateExample} from "../components/interpolate/InterpolateExample";

type ProfileScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export const HomeTemplate = ({navigation}: Props) => {
  return (
    <SafeAreaView>
      <View>
        <Button title="Basics" onPress={() => navigation.navigate("Basics")} />
        <Button
          title="FadedView"
          onPress={() => navigation.navigate("FadedView")}
        />
        <Button
          title="PanGestureTemplate"
          onPress={() => navigation.navigate("PanGestureTemplate")}
        />
        <Button
          title="InterpolateExample"
          onPress={() => navigation.navigate("InterpolateExample")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
