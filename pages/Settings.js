import { Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { SettingsStyle } from "../stylesheets";
import { setConfig } from "../utils/configs";
import { getAllLanguages, getLanguage } from "../utils/language";

export default ({
  Gets: [ThemeStyle, LanguageText, configValues],
  Sets: [setConfigChanged],
}) => {
  const [debtLimit, setDebtLimit] = useState();
  const [daysLimit, setDaysLimit] = useState();
  const [currencyConfig, setCurrencyConfig] = useState();
  const [themeConfig, setThemeConfig] = useState();
  const [languageConfig, setLanguageConfig] = useState();

  useEffect(() => {
    setDebtLimit(configValues?.debtLimitConfig);
    setDaysLimit(configValues?.daysLimitConfig);
  }, [configValues?.debtLimitConfig, configValues?.daysLimitConfig]);

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
              ThemeStyle.tertiaryText,
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
              ThemeStyle.tertiaryText,
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
          labelText={LanguageText.labels.settings.currency}
          configName="currencyConfig"
          selectedValue={"€"}
        ></InputGroupColumn>
        <InputGroupColumn
          Gets={[ThemeStyle]}
          Sets={[setConfigChanged]}
          labelText={LanguageText.labels.settings.theme}
          configName="themeConfig"
          selectedValue={"light"}
        ></InputGroupColumn>
        <InputGroupColumn
          Gets={[ThemeStyle]}
          Sets={[setConfigChanged]}
          labelText={LanguageText.labels.settings.language}
          configName="languageConfig"
          selectedValue={getLanguage()}
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
}) => {
  const [selected, setSelected] = useState(selectedValue);
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
              setSelected(itemValue);
              setConfig(configName, itemValue).then(setConfigChanged(true));
              console.log(configName, itemValue);
            }}
            style={[SettingsStyle.input, ThemeStyle.tertiaryText]}
          >
            {children}
          </Picker>
        </View>
      </View>
    </>
  );
};
