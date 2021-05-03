import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import { StyleSheet, Text, View } from 'react-native';
import Index from "./screen/Index";
import Add from "./screen/Add";

const Stack = createStackNavigator();
const COLOR = '#2B547E';
export default function App() {
  return (
      <NavigationContainer theme={MyTheme}>
        <StatusBar hidden={true}/>
          <Stack.Navigator>
              <Stack.Screen name="Index" component={Index} options={{
                  headerTitleAlign : 'left',
                  headerStatusBarHeight : 40,
                  headerStyle : {
                      backgroundColor : COLOR
                  },
                  headerTintColor: 'white',
                  headerTitleStyle: {
                      fontWeight: '100'
                  },
                  headerTitle: "CryptoTracker Pro"
              }}/>
              <Stack.Screen name="Add" component={Add} options={{
                  headerTitle : 'Go Back',
                  headerTitleAlign : 'left',
                  headerStatusBarHeight : 40,
                  headerStyle : {
                      backgroundColor : 'white',
                  },
                  headerTintColor: COLOR,
                  headerTitleStyle: {
                      fontWeight: '100'
                  }
              }}/>
          </Stack.Navigator>
      </NavigationContainer>
  );
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#008080',
  },
};
