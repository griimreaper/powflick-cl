import { components } from "./components";
import { typography } from "./typography";
import {
  blue,
  marron,
  paste,
  primary,
  themeColors,
  orange,
  bluish,
  success,
  warning,
  gold
} from "./theme-colors";

const THEMES = {
  GIFT: "GIFT",
  HEALTH: "HEALTH",
  DEFAULT: "DEFAULT",
  GROCERY: "GROCERY",
  PASTE: "PASTE",
  ORANGE: "ORANGE",
  GOLD: "GOLD",
  BLUISH: "BLUISH",
  GREEN: "GREEN",
  YELLOW: "YELLOW"
};

const breakpoints = {
  values: {
    xs: 0,
    sm: 500,
    md: 768,
    lg: 1280,
    xl: 1600,
    xxl: 1920
  }
};

/*
WE CREATED MULTIPLE THEME OPTIONS FOR DIFFERENT SHOP VARIATION.

YOU CAN JUST KEEP [THEMES.DEFAULT] AND REMOVE OTHER THEME OPTIONS.
*/
const themesOptionList = {
  [THEMES.DEFAULT]: {
    typography,
    components,
    breakpoints,
    palette: { ...themeColors }
  },

};

const themeOptions = (pathname: string) => {
  let themeOption;

  /*
    YOU CAN ALSO REMOVE updateTheme function
    AND FOLLOWING ENTIRE switch case BLOCK.
  */
  const updateTheme = (themeName: string) => {
    themeOption = themesOptionList[themeName];
  };

  switch (pathname) {
    case "/":
      updateTheme(THEMES.DEFAULT);
      break;

    case "/furniture-1":
      updateTheme(THEMES.PASTE);
      break;

    case "/medical":
      updateTheme(THEMES.PASTE);
      break;

    case "/furniture-2":
      updateTheme(THEMES.ORANGE);
      break;

    case "/furniture-3":
      updateTheme(THEMES.GOLD);
      break;

    case "/health-beauty":
      updateTheme(THEMES.HEALTH);
      break;

    case "/gift-shop":
      updateTheme(THEMES.GIFT);
      break;

    default:
      if (pathname.startsWith("/grocery-4")) {
        themeOption = themesOptionList[THEMES.GREEN];
      } else if (pathname.startsWith("/gadget-3")) {
        themeOption = themesOptionList[THEMES.HEALTH];
      } else {
        themeOption = themesOptionList[THEMES.DEFAULT];
      }

      break;
  }
  /*
        IF YOU REMOVE THE switch case, YOU NEED TO ASSIGN VALUE TO themeOptions
        E.G. themeOption = themesOptions[THEMES.DEFAULT];
    */
  // themeOption = themesOptions[THEMES.DEFAULT];

  return themeOption;
};

export default themeOptions;
