import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { applyMiddleware, createStore } from "redux";

import Button from "./1-helpers/Button";
import PostArea from "./0-modules/PostArea";
import { PostTitle } from "./0-modules/Post";
import { Provider } from "react-redux";
import React from "react";
import Root from "./0-modules/Blog";
import { StatusBar } from "expo-status-bar";
import { colors } from "./1-helpers/content";
import rootReducer from "./0-modules/Root/ducks/reducer";
import styled from "@emotion/native";
import thunk from "redux-thunk";

export const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Root />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BABY_BLUE,
  },
});
