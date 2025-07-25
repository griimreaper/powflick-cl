// CUSTOM ICON COMPONENTS
import Google from "icons/Google";
import Twitter from "icons/Twitter";
import Youtube from "icons/Youtube";
import Facebook from "icons/Facebook";
import Instagram from "icons/Instagram";
import PlayStore from "icons/PlayStore";
import AppleStore from "icons/AppleStore";
import { Pinterest } from "@mui/icons-material";

export const ABOUT_LINKS = [
  // {title: "Careers", link: "/"},
  // {title: "Our Stores", link: "/"},
  // {title: "Our Cares", link: "/"},
  { title: "Terms & Conditions", link: "terms-condition" },
  { title: "Privacy Policy", link: "privacy-policy" },
  { title: "Time and Shipping", link: "shipping" },
  { title: "Return & Refund", link: "return-refund" }, // Agregar el nuevo enlace aquí
];

export const PAGES = [
  ["Store", "products"],
  ["Get a Free Design", "your-design"],
  ["Contact", "contact"],
  ["About Us", "about-us"],
  ["FAQ", "help"],
  ["Creator Kits", "influencers"],
  ["Customization Guide", "customization-guide"],
];

export const SOCIAL_ICON_LINKS = [
  { Icon: Instagram, url: "https://www.instagram.com/powflick/" },
  { Icon: Pinterest, url: "https://www.pinterest.com/powflick/" },
  {
    Icon: Facebook,
    url: "https://www.facebook.com/profile.php?id=61572571284039",
  },
  // { Icon: Twitter, url: "https://twitter.com/" },
  { Icon: Youtube, url: "https://www.youtube.com/@PowFlick" },
  // { Icon: Google, url: "https://www.google.com/" },
];

export const PLAY_APP_STORE_DATA = [
  { url: "/", icon: PlayStore, title: "Google Play", subtitle: "Get it on" },
  {
    url: "/",
    icon: AppleStore,
    title: "App Store",
    subtitle: "Download on the",
  },
];
