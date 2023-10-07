import { StyleSheet } from "react-native";

const MainStyle = StyleSheet.create({
  alignItems: "center",
  height: "100%",
});

const HeaderStyle = StyleSheet.create({
  title: {
    fontFamily: "Pacifico-Regular",
    fontSize: 40,
    paddingTop: 15,
  },
  subtitle: {
    fontFamily: "CaveatBrush-Regular",
    fontSize: 17,
  },
});

const NavBarStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    height: "10%",
    width: "100%",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  itens: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
});

const RouterStyle = StyleSheet.create({
  width: "100%",
  position: "relative",
  bottom: 0,
  height: "100%",
  marginTop: 15,
  borderTopRightRadius: 25,
  borderTopLeftRadius: 25,
});

const SettingsStyle = StyleSheet.create({
  containerRow: {
    flexDirection: "row",
    width: "100%",
  },
  containerColumn: {
    flexDirection: "column",
    width: "100%",
    paddingRight: 15,
  },
  inputGroup: {
    flexDirection: "column",
    paddingLeft: 15,
  },
  label: {
    paddingTop: 25,
    fontSize: 16,
    fontFamily: "Dangrek-Regular",
    fontWeight: 500,
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 14,
    width: "100%",
    borderRadius: 8,
  },
});
export { MainStyle, HeaderStyle, NavBarStyle, RouterStyle, SettingsStyle };
