import { Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { SettingsStyle } from "../stylesheets";
import { setConfig } from "../utils/configs";
import { getAllLanguages, getLanguage } from "../utils/language";
import { getAllThemes, getTheme } from "../utils/theme";

export default ({
  Gets: [ThemeStyle, LanguageText, configValues],
  Sets: [setConfigChanged],
}) => {
  const [debtLimit, setDebtLimit] = useState();
  const [daysLimit, setDaysLimit] = useState();
  const [allThemes, setAllThemes] = useState();

  useEffect(() => {
    setDebtLimit(configValues?.debtLimitConfig);
    setDaysLimit(configValues?.daysLimitConfig);
  }, [configValues?.debtLimitConfig, configValues?.daysLimitConfig]);

  useEffect(() => {
    if (allThemes === undefined || allThemes.length < 1)
      getAllThemes().then((themes) => {
        setAllThemes(themes);
      });
  }, [allThemes]);

  return (
    <>
      <View style={[SettingsStyle.containerRow]}>
        <View
          style={[
            SettingsStyle.inputGroup,
            { width: "50%", paddingRight: 7.5 },
          ]}
        >
          <Text style={[SettingsStyle.label, ThemeStyle.primaryText]}>
            {LanguageText.labels.settings.debt_limit}
          </Text>
          <TextInput
            style={[
              SettingsStyle.input,
              ThemeStyle.secondaryBackground,
              ThemeStyle.primaryText,
            ]}
            onChangeText={(value) => setDebtLimit(value)}
            value={debtLimit}
            onBlur={() =>
              setConfig("debtLimitConfig", debtLimit).then(
                setConfigChanged(true)
              )
            }
          />
        </View>
        <View
          style={[
            SettingsStyle.inputGroup,
            { width: "50%", paddingRight: 15, paddingLeft: 7.5 },
          ]}
        >
          <Text style={[SettingsStyle.label, ThemeStyle.primaryText]}>
            {LanguageText.labels.settings.days_limit}
          </Text>
          <TextInput
            style={[
              SettingsStyle.input,
              ThemeStyle.secondaryBackground,
              ThemeStyle.primaryText,
            ]}
            onChangeText={(value) => setDaysLimit(value)}
            value={daysLimit}
            onBlur={() =>
              setConfig("daysLimitConfig", daysLimit).then(
                setConfigChanged(true)
              )
            }
          />
        </View>
      </View>
      <View style={[SettingsStyle.containerColumn]}>
        <InputGroupColumn
          Gets={[ThemeStyle]}
          Sets={[setConfigChanged]}
          labelText={LanguageText.labels?.settings?.currency}
          configName="currencyConfig"
          selectedValue={"€"}
        ></InputGroupColumn>
        {allThemes !== undefined ? (
          <InputGroupColumn
            Gets={[ThemeStyle]}
            Sets={[setConfigChanged]}
            labelText={LanguageText.labels?.settings?.theme}
            configName="themeConfig"
            selectedValue={getTheme()}
          >
            {allThemes.map((theme) => (
              <Picker.Item
                key={theme.code}
                label={theme.name}
                value={theme.code}
              />
            ))}
          </InputGroupColumn>
        ) : (
          <></>
        )}
        <InputGroupColumn
          Gets={[ThemeStyle]}
          Sets={[setConfigChanged]}
          labelText={LanguageText.labels?.settings?.language}
          configName="languageConfig"
          selectedValue={getLanguage()}
          reloadThemes={setAllThemes}
        >
          {getAllLanguages().map((language) => (
            <Picker.Item
              key={language.code}
              label={language.name}
              value={language.code}
            />
          ))}
        </InputGroupColumn>
      </View>
    </>
  );
};

const InputGroupColumn = ({
  children,
  Gets: [ThemeStyle],
  Sets: [setConfigChanged],
  labelText,
  configName,
  selectedValue,
  reloadThemes = undefined,
}) => {
  const [selected, setSelected] = useState(selectedValue);
  useEffect(() => {
    console.log(
      "%cSettings.js line:139 selectedValue",
      "color: #007acc;",
      selectedValue
    );
  }, []);
  return (
    <>
      <View style={[SettingsStyle.inputGroup]}>
        <Text style={[SettingsStyle.label, ThemeStyle.primaryText]}>
          {labelText}
        </Text>
        <View
          style={[
            ThemeStyle.secondaryBackground,
            {
              borderRadius: 8,
            },
          ]}
        >
          <Picker
            selectedValue={selected}
            onValueChange={(itemValue, itemIndex) => {
              if (itemValue !== null) {
                setSelected(itemValue);
                setConfig(configName, itemValue).then(setConfigChanged(true));
                if (configName === "languageConfig") reloadThemes([]);
              }

              console.log(
                "%cSettings.js line:160 itemValue",
                "color: #007acc;",
                itemValue
              );
            }}
            style={[SettingsStyle.input, ThemeStyle.primaryText]}
          >
            {children}
          </Picker>
        </View>
      </View>
    </>
  );
};
