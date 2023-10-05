import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import Currency from "../configs/currency.json";
import Language from "../configs/language.json";

/**
 *
 * Starts the app by initializing the app's configuration.
 * @returns {Promise<boolean>} A promise that resolves to true if the app was successfully initialized, or false otherwise.
 */

const startApp = async () => {
  try {
    const Locales = await getLocales();
    const debtLimitConfig = await AsyncStorage.getItem("debtLimitConfig");
    const daysLimitConfig = await AsyncStorage.getItem("daysLimitConfig");
    const currencyConfig = await AsyncStorage.getItem("currencyConfig");
    const themeConfig = await AsyncStorage.getItem("themeConfig");
    const languageConfig = await AsyncStorage.getItem("languageConfig");

    if (debtLimitConfig === null) {
      await AsyncStorage.setItem("debtLimitConfig", "20");
    }

    if (daysLimitConfig === null) {
      await AsyncStorage.setItem("daysLimitConfig", "30");
    }

    if (currencyConfig === null) {
      const userCurrencyCode = Locales[0].currencyCode;
      if (Currency[userCurrencyCode]) {
        await AsyncStorage.setItem(
          "currencyConfig",
          Currency[userCurrencyCode].symbol
        );
      } else {
        await AsyncStorage.setItem("currencyConfig", "€");
      }
    }

    if (themeConfig === null) {
      await AsyncStorage.setItem("themeConfig", "system");
    }

    if (languageConfig === null) {
      const userLanguageCode = Locales[0].languageCode;

      if (Language[userLanguageCode]) {
        await AsyncStorage.setItem(
          "languageConfig",
          Language[userLanguageCode].universalName
        );
      } else {
        await AsyncStorage.setItem("languageConfig", "english");
      }
    }

    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Sets all settings to the default
 */

const resetConfigs = async () => {
  const Locales = await getLocales();
  await AsyncStorage.setItem("debtLimitConfig", "20");
  await AsyncStorage.setItem("daysLimitConfig", "30");
  const userCurrencyCode = Locales[0].currencyCode;
  if (Currency[userCurrencyCode]) {
    await AsyncStorage.setItem(
      "currencyConfig",
      Currency[userCurrencyCode].symbol
    );
  } else {
    await AsyncStorage.setItem("currencyConfig", "€");
  }
  await AsyncStorage.setItem("themeConfig", "system");
  const userLanguageCode = Locales[0].languageCode;

  if (Language[userLanguageCode]) {
    await AsyncStorage.setItem(
      "languageConfig",
      Language[userLanguageCode].universalName
    );
  } else {
    await AsyncStorage.setItem("languageConfig", "english");
  }
};

/**
 * Retrieves configuration values from AsyncStorage.
 *
 * @async
 * @returns {Promise<Object>} The configuration object containing debtLimitConfig, daysLimitConfig, currencyConfig, themeConfig, and languageConfig.
 */
const getConfig = async () => {
  const debtLimitConfig = await AsyncStorage.getItem("debtLimitConfig");
  const daysLimitConfig = await AsyncStorage.getItem("daysLimitConfig");
  const currencyConfig = await AsyncStorage.getItem("currencyConfig");
  const themeConfig = await AsyncStorage.getItem("themeConfig");
  const languageConfig = await AsyncStorage.getItem("languageConfig");

  return {
    debtLimitConfig,
    daysLimitConfig,
    currencyConfig,
    themeConfig,
    languageConfig,
  };
};

export { startApp, resetConfigs, getConfig };
