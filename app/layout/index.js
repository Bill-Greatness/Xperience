import React, {  } from "react";
import Base from "./base";
import { useColorScheme } from "react-native";
import { ThemeContext } from "../providers/context";

export default function Layout() {
  return (
    <ThemeContext.Provider value={useColorScheme()}>
      <Base />
    </ThemeContext.Provider>
  );
}
