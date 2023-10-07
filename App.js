import * as SplashScreen from "expo-splash-screen";
import { useEffect, useCallback, useState } from "react";
import { View } from "react-native";
import { useFonts } from "expo-font";
import { MainStyle } from "./stylesheets";
import { getConfigs } from "./utils/configs";
import { Language } from "./utils/language";
import { Theme } from "./utils/theme";
import Main from "./pages/Main";

SplashScreen.preventAutoHideAsync();

export default App = () => {
  const [ThemeStyle, setThemeStyle] = useState();
  const [LanguageText, setLanguageText] = useState();
  const [configValues, setConfigValues] = useState();
  const [configChanged, setConfigChanged] = useState(true);

  useEffect(() => {
    if (configChanged) {
      getConfigs().then((data) => {
        setConfigValues(data);
      });
      Language().then((data) => {
        setLanguageText(data);
      });
      Theme().then((data) => {
        setThemeStyle(data);
      });
      setConfigChanged(false);
    }
  }, [configChanged]);

  const [fontsLoaded] = useFonts({
    "Pacifico-Regular": require("./fonts/Pacifico/Pacifico-Regular.ttf"),
    "CaveatBrush-Regular": require("./fonts/CaveatBrush/CaveatBrush-Regular.ttf"),
    "Dangrek-Regular": require("./fonts/Dangrek/Dangrek-Regular.ttf"),
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
        <Main
          Gets={[ThemeStyle, LanguageText, configValues]}
          Sets={[setConfigChanged]}
        />
      </View>
    </>
  );
};
