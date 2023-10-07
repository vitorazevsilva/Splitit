import AsyncStorage from "@react-native-async-storage/async-storage";
import Languages from "../configs/languages";

/**
 * Retrieves the list of available languages.
 * @function getAllLanguages
 * @returns {string[]} The list of available languages.
 */
const getAllLanguages = () => {
  const nameList = [];
  for (const language in Languages) {
    if (Languages.hasOwnProperty(language)) {
      nameList.push(Languages[language].name);
    }
  }
  return nameList;
};

/**
 * Retrieves the current language based on the stored configuration.
 * If no configuration is found, it sets the default language based on the user's device language and stores it.
 * @async
 * @function Language
 * @returns {Promise<Object>} The language configuration object.
 */
const Language = async () => {
  let languageConfig = await AsyncStorage.getItem("languageConfig");
  if (languageConfig === null) {
    const Locales = await getLocales();
    const userLanguageCode = Locales[0].languageCode;
    if (Language[userLanguageCode]) {
      languageConfig = userLanguageCode;
      await AsyncStorage.setItem("languageConfig", languageConfig);
    } else {
      languageConfig = "en";
      await AsyncStorage.setItem("languageConfig", "en");
    }
  }
  return Languages[languageConfig].filename;
};

export { Languages, Language, getAllLanguages };
