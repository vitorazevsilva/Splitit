import * as SplashScreen from "expo-splash-screen";
import { useEffect, useCallback, useState } from "react";
import { View } from "react-native";
import { useFonts } from "expo-font";
import { MainStyle } from "./stylesheets";
import { startApp } from "./utils/verification";
import { Language } from "./utils/language";
import { Theme } from "./utils/theme";
import Main from "./pages/Main";

SplashScreen.preventAutoHideAsync();

export default App = () => {
  const [ThemeStyle, setTheme] = useState(undefined);
  const [LanguageText, setLanguageText] = useState(undefined);

  useEffect(() => {
    startApp();
    Language().then((data) => {
      setLanguageText(data);
    });
    Theme().then((data) => {
      setTheme(data);
    });
  }, []);

  const [fontsLoaded] = useFonts({
    "Pacifico-Regular": require("./fonts/Pacifico/Pacifico-Regular.ttf"),
    "CaveatBrush-Regular": require("./fonts/CaveatBrush/CaveatBrush-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || ThemeStyle === undefined || LanguageText === undefined) {
    return null;
  }

  return (
    <>
      <View
        style={[MainStyle, ThemeStyle.principal]}
        onLayout={onLayoutRootView}
      >
        <Main Utils={[ThemeStyle, LanguageText]} />
      </View>
    </>
  );
};
