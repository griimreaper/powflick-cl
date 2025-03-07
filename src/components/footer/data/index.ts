// CUSTOM ICON COMPONENTS
import Google from "icons/Google";
import Twitter from "icons/Twitter";
import Youtube from "icons/Youtube";
import Facebook from "icons/Facebook";
import Instagram from "icons/Instagram";
import PlayStore from "icons/PlayStore";
import AppleStore from "icons/AppleStore";

export const ABOUT_LINKS = [
  // {title: "Careers", link: "/"},
  // {title: "Our Stores", link: "/"},
  // {title: "Our Cares", link: "/"},
  { title: "Terms & Conditions", link: "terms-condition" },
  { title: "Privacy Policy", link: "privacy-policy" },
  { title: "Time an Shipping", link: "shipping" },
];

export const PAGES = [
  ["Super Design", "your-design"],
  ["Contact", "contact"],
  ["About Us", "about-us"],
  ["Help", "help"],
];

export const SOCIAL_ICON_LINKS = [
  { Icon: Facebook, url: "https://www.facebook.com/" },
  { Icon: Twitter, url: "https://twitter.com/" },
  {
    Icon: Youtube,
    url: "https://www.youtube.com/"
  },
  { Icon: Google, url: "https://www.google.com/" },
  { Icon: Instagram, url: "https://www.instagram.com/" }
];

export const PLAY_APP_STORE_DATA = [
  { url: "/", icon: PlayStore, title: "Google Play", subtitle: "Get it on" },
  { url: "/", icon: AppleStore, title: "App Store", subtitle: "Download on the" }
];
