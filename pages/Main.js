import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { FontAwesome5, Ionicons, Octicons } from "@expo/vector-icons";
import { HeaderStyle, NavBarStyle, RouterStyle } from "../stylesheets";
export default ({ Utils }) => {
  const [ThemeStyle] = Utils;
  const [Page, setPage] = useState("home");
  return (
    <>
      <Header Utils={Utils} Page={Page} />
      <View style={[RouterStyle, ThemeStyle.primaryBackground]}></View>
      <NavBar Utils={Utils} Page={[Page, setPage]} />
    </>
  );
};

const Header = ({ Utils: [ThemeStyle, LanguageText], Page }) => {
  return (
    <>
      <Text style={[HeaderStyle.title, ThemeStyle.secondaryText]}>
        {LanguageText.labels[Page]?.title || "Trans. not avail."}
      </Text>
      <Text style={[HeaderStyle.subtitle, ThemeStyle.secondaryText]}>
        {LanguageText.labels[Page]?.subtitle || "Trans. not avail."}
      </Text>
    </>
  );
};

const NavBar = ({ Utils: [ThemeStyle], Page: [Page, setPage] }) => {
  const getStyleForPage = (page, view = true) => {
    if (Page === page) return view ? ThemeStyle.principal : { color: "#fff" };
    else return view ? ThemeStyle.secondaryBackground : ThemeStyle.primary;
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <>
      <View style={[NavBarStyle.container, ThemeStyle.principal]}>
        <TouchableOpacity
          style={[
            NavBarStyle.itens,
            getStyleForPage("home"),
            { borderTopLeftRadius: 25 },
          ]}
          onPress={() => handlePageChange("home")}
        >
          <Octicons
            name="home"
            style={[getStyleForPage("home", false)]}
            size={45}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[NavBarStyle.itens, getStyleForPage("debt")]}
          onPress={() => handlePageChange("debt")}
        >
          <FontAwesome5
            name="list-ul"
            style={[getStyleForPage("debt", false)]}
            size={45}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[NavBarStyle.itens, getStyleForPage("friends")]}
          onPress={() => handlePageChange("friends")}
        >
          <FontAwesome5
            name="user-friends"
            style={[getStyleForPage("friends", false)]}
            size={45}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            NavBarStyle.itens,
            getStyleForPage("settings"),
            { borderTopRightRadius: 25 },
          ]}
          onPress={() => handlePageChange("settings")}
        >
          <Ionicons
            name="ios-settings-sharp"
            style={[getStyleForPage("settings", false)]}
            size={45}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};
