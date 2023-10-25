import AsyncStorage from "@react-native-async-storage/async-storage";
import Languages from "../configs/languages";

let languageConfig = undefined;

/**
 * Retrieves the list of available languages.
 * @function getAllLanguages
 * @returns {string[]} The list of available languages.
 */
const getAllLanguages = () => {
  const nameList = [];
  for (const language in Languages) {
    if (Languages.hasOwnProperty(language)) {
      nameList.push({ name: Languages[language].name, code: language });
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
  languageConfig = await AsyncStorage.getItem("languageConfig");
  if (languageConfig === null) {
    const Locales = await getLocales();
    const userLanguageCode = Locales[0].languageCode;
    if (Language[userLanguageCode]) {
      languageConfig = userLanguageCode;
      console.log(
        "%clanguage.js line:35 languageConfig",
        "color: #007acc;",
        languageConfig
      );
      await AsyncStorage.setItem("languageConfig", languageConfig);
    } else {
      languageConfig = "en";
      await AsyncStorage.setItem("languageConfig", "en");
    }
  }
  return Languages[languageConfig].filename;
};

const getLanguage = () => {
  return languageConfig;
};

export { Languages, Language, getAllLanguages, getLanguage };
