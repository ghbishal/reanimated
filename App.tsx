import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from "react";
import {HomeTemplate} from "./src/Templates/HomeTemplate";
import {Basics} from "./src/components/Basics";
import {FadedView} from "./src/components/FadedView";
import {PanGestureTemplate} from "./src/components/PanGestureTemplate";
import {RootStackParamList} from "./src/Navigations/params";
import {InterpolateExample} from "./src/components/interpolate/InterpolateExample";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    // <NavigationContainer>
    //   {/* // not sure if we need TailwindProvider */}
    //   <Stack.Navigator>
    //     <Stack.Screen name="Home" component={HomeScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeTemplate} />
        <Stack.Screen name="Basics" component={Basics} />
        <Stack.Screen name="FadedView" component={FadedView} />
        <Stack.Screen
          name="PanGestureTemplate"
          component={PanGestureTemplate}
        />
        <Stack.Screen
          name="InterpolateExample"
          component={InterpolateExample}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
