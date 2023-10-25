import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { FontAwesome5, Ionicons, Foundation } from "@expo/vector-icons";
import { HeaderStyle, NavBarStyle, RouterStyle } from "../stylesheets";
import Settings from "./Settings";

export default ({ Gets, Sets }) => {
  const [ThemeStyle] = Gets;
  const [Page, setPage] = useState("friends");

  const isPage = (page) => {
    return Page === page;
  };

  return (
    <>
      <Header Gets={Gets} Page={[Page, setPage]} />
      <View style={[RouterStyle, ThemeStyle.primaryBackground]}>
        {isPage("settings") && <Settings Gets={Gets} Sets={Sets} />}
      </View>
      <NavBar Gets={Gets} Page={[Page, setPage]} />
    </>
  );
};

const Header = ({ Gets: [ThemeStyle, LanguageText], Page: [Page] }) => {
  return (
    <>
      <Text style={[HeaderStyle.title, ThemeStyle.info]}>
        {LanguageText.labels[Page]?.title || "Trans. not avail."}
      </Text>
      <Text style={[HeaderStyle.subtitle, ThemeStyle.info]}>
        {LanguageText.labels[Page]?.subtitle || "Trans. not avail."}
      </Text>
    </>
  );
};

const NavBar = ({ Gets: [ThemeStyle], Page: [Page, setPage] }) => {
  const getStyleForPage = (page, view = true) => {
    if (Page === page) return view ? ThemeStyle.principal : ThemeStyle.info;
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
          <Foundation
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
