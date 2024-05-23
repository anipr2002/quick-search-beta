import React from "react";
import { Icon } from "@iconify/react";
import { FaSearch } from "react-icons/fa";

interface IconsProps {
  name: string;
  size?: number;
}

const Icons: React.FC<IconsProps> = ({ name, size }) => {
  // Define a mapping of website names to Lucide icons
  const iconMap: { [key: string]: React.ReactElement } = {
    google: <Icon fontSize={size} icon="logos:google-icon" />,
    facebook: <Icon fontSize={size} icon="logos:facebook" />,
    twitter: <Icon fontSize={size} icon="logos:twitter" />,
    linkedin: <Icon fontSize={size} icon="logos:linkedin-icon" />,
    youtube: <Icon fontSize={size} icon="logos:youtube-icon" />,
    instagram: <Icon fontSize={size} icon="skill-icons:instagram" />,
    pinterest: <Icon fontSize={size} icon="logos:pinterest" />,
    twitch: <Icon fontSize={size} icon="logos:twitch" />,
    reddit: <Icon fontSize={size} icon="logos:reddit-icon" />,
    amazon: <Icon fontSize={size} icon="ri:amazon-fill" />,
    wikipedia: <Icon fontSize={size} icon="flat-color-icons:wikipedia" />,
    spotify: <Icon fontSize={size} icon="logos:spotify-icon" />,
    netflix: <Icon fontSize={size} icon="logos:netflix" />,
    chatgpt: <Icon fontSize={size} icon="arcticons:openai-chatgpt" />,
    gmail: <Icon fontSize={size} icon="logos:google-gmail" />,
    github: <Icon fontSize={size} icon="skill-icons:github-light" />,
    monkeytype: <Icon fontSize={size} icon="simple-icons:monkeytype" />,
    medium: <Icon fontSize={size} icon="logos:medium-icon" />,
    notion: <Icon fontSize={size} icon="logos:notion-icon" />,
    slack: <Icon fontSize={size} icon="devicon:slack" />,
  };

  // Get the icon based on the provided website name
  const selectedIcon = iconMap[name];

  // If the provided name doesn't match any known icon, you can provide a default icon or handle it as needed
  if (!selectedIcon) {
    return <FaSearch size={size} />;
  }

  return selectedIcon;
};

export default Icons;
