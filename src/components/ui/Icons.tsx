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
  FaGithub,
} from "react-icons/fa";

interface IconsProps {
  name: string;
  size?: number;
}

const Icons: React.FC<IconsProps> = ({ name, size }) => {
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
    github: <FaGithub size={size} />,
  };

  // Get the icon based on the provided website name
  const selectedIcon = iconMap[name];

  // If the provided name doesn't match any known icon, you can provide a default icon or handle it as needed
  if (!selectedIcon) {
    // You can return a default icon or null, or handle the case in a way that makes sense for your application
    return null;
  }

  return selectedIcon;
};

export default Icons;
