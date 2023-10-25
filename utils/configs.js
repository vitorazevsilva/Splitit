import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import Currency from "../configs/currency";

/**
 * Retrieves the configuration values from AsyncStorage.
 * If the values are not already set, default values are used.
 * @returns {Promise} A promise that resolves to an object containing the configuration values.
 * @property {string} debtLimitConfig - The debt limit configuration value.
 * @property {string} daysLimitConfig - The days limit configuration value.
 * @property {string} currencyConfig - The currency configuration value.
 */
const getConfigs = async () => {
  const Locales = await getLocales();
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

const getAllCurrency = () => {
  const nameList = [];
  for (const currency in Currency) {
    nameList.push({ name: Currency[currency], code: currency });
  }
  return nameList;
};

/**
 * Sets the configuration value in AsyncStorage if the provided key is valid.
 * @param {string} key - The key of the configuration value.
 * @param {string} value - The value to be set.
 * @returns {Promise<boolean>} A promise that resolves to true if the value is successfully set, or false otherwise.
 */
const setConfig = async (key, value) => {
  if (
    key === "debtLimitConfig" ||
    key === "daysLimitConfig" ||
    key === "currencyConfig" ||
    key === "themeConfig" ||
    key === "languageConfig"
  )
    return value !== null
      ? await AsyncStorage.setItem(key, value).then(() => true)
      : false;
  else return false;
};

export { getConfigs, setConfig, getAllCurrency };
