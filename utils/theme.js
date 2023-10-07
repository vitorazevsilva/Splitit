import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";
import { Language } from "./language";
import Themes from "../configs/themes";

/**
 * Retrieves the list of available themes.
 * @async
 * @function getAllThemes
 * @returns {Promise<string[]>} The list of available themes.
 */
const getAllThemes = async () => {
  const themeList = [];
  const LanguageText = await Language();
  for (const theme in Themes) {
    if (Themes.hasOwnProperty(theme)) {
      themeList.push(LanguageText.theme[theme]);
    }
  }
  return themeList;
};

/**
 * Retrieves the current theme based on the stored configuration.
 * If no configuration is found, it sets the default theme based on the device's color scheme and stores it.
 * @async
 * @function Theme
 * @returns {Promise<Object>} The current theme configuration.
 */
const Theme = async () => {
  let themeConfig = await AsyncStorage.getItem("themeConfig");
  if (themeConfig === null) {
    let colorScheme = useColorScheme();
    if (colorScheme === "dark") {
      themeConfig = "dark";
      await AsyncStorage.setItem("themeConfig", themeConfig);
    } else {
      themeConfig = "light";
      await AsyncStorage.setItem("themeConfig", themeConfig);
    }
  }
  return Themes[themeConfig];
};

export { Themes, Theme, getAllThemes };
