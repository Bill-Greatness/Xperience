import React, { useContext } from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import { Notice } from "../components/alert";
import { testNotice } from "../assets/data";

import Top from "../layout/top";
import { ThemeContext } from "../providers/context";
export default function Alert() {
  const theme = useContext(ThemeContext);

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme === "light" ? "#fff" : "#2069e0",
        flex: 1,
      }}
    >
      <Top />
      <ScrollView
        style={{
          backgroundColor: theme === "light" ? "#fff" : "#000",
        }}
      >
        {testNotice.map((ntc) => (
          <View key={ntc.content}>
            <Notice notice={ntc} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
