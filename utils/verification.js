import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import Currency from "../configs/currency.json";

/**
 * Initializes the app by fetching the device locales and retrieving configuration values from AsyncStorage.
 * If the configuration values are not already set, it sets default values for them.
 *
 * @async
 * @returns {Promise<Object>} An object containing the configuration values.
 */
const startApp = async () => {
  // Fetch the Locales from the device

  // Get the configuration values from AsyncStorage
  let debtLimitConfig = await AsyncStorage.getItem("debtLimitConfig");
  let daysLimitConfig = await AsyncStorage.getItem("daysLimitConfig");
  let currencyConfig = await AsyncStorage.getItem("currencyConfig");

  // Set default values if the configuration values are not already set
  if (debtLimitConfig === null) {
    debtLimitConfig = "20";
    await AsyncStorage.setItem("debtLimitConfig", debtLimitConfig);
  }

  if (daysLimitConfig === null) {
    daysLimitConfig = "30";
    await AsyncStorage.setItem("daysLimitConfig", daysLimitConfig);
  }

  if (currencyConfig === null) {
    const userCurrencyCode = Locales[0].currencyCode;
    if (Currency[userCurrencyCode]) {
      currencyConfig = Currency[userCurrencyCode].symbol;
      await AsyncStorage.setItem("currencyConfig", currencyConfig);
    } else {
      currencyConfig = "€";
      await AsyncStorage.setItem("currencyConfig", currencyConfig);
    }
  }

  return {
    debtLimitConfig,
    daysLimitConfig,
    currencyConfig,
  };
};

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
  await AsyncStorage.setItem("themeConfig", "light");

  const userLanguageCode = Locales[0].languageCode;
  if (Language[userLanguageCode]) {
    await AsyncStorage.setItem("languageConfig", userLanguageCode);
  } else {
    await AsyncStorage.setItem("languageConfig", "en");
  }
};

export { startApp, resetConfigs };
