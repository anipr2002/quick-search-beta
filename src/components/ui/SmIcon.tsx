import React from "react";

import {
  FaGoogle,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
  FaPinterest,
  FaTwitch,
  FaReddit,
  FaAmazon,
  FaWikipediaW,
  FaSpotify,
  FaSearch,
  FaGithub,
  FaEnvelope,
  FaSlack,
} from "react-icons/fa";
import { SiMonkeytype, SiNotion, SiNetflix, SiMedium } from "react-icons/si";

interface IconsProps {
  name: string;
  size?: number;
}

const SmIcons: React.FC<IconsProps> = ({ name, size }) => {
  // Define a mapping of website names to Lucide icons
  const iconMap: { [key: string]: React.ReactElement } = {
    google: <FaGoogle size={size} />,
    facebook: <FaFacebook size={size} />,
    twitter: <FaTwitter size={size} />,
    linkedin: <FaLinkedin size={size} />,
    youtube: <FaYoutube size={size} />,
    instagram: <FaInstagram size={size} />,
    pinterest: <FaPinterest size={size} />,
    twitch: <FaTwitch size={size} />,
    reddit: <FaReddit size={size} />,
    amazon: <FaAmazon size={size} />,
    wikipedia: <FaWikipediaW size={size} />,
    spotify: <FaSpotify size={size} />,
    netflix: <SiNetflix size={size} />,
    gmail: <FaEnvelope size={size} />,
    github: <FaGithub size={size} />,
    monkeytype: <SiMonkeytype size={size} />,
    notion: <SiNotion size={size} />,
    medium: <SiMedium size={size} />,
    slack: <FaSlack size={size} />,
  };

  // Get the icon based on the provided website name
  const selectedIcon = iconMap[name];

  // If the provided name doesn't match any known icon, you can provide a default icon or handle it as needed
  if (!selectedIcon) {
    return <FaSearch size={size} />;
  }

  return selectedIcon;
};

export default SmIcons;
