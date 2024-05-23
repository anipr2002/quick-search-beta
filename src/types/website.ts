import { ReactElement } from "react";

export type Website = {
  name: string;
  url: string;
  SearchURL?: string;
  colorTheme: string;
  darkTheme?: boolean;
  logo?: ReactElement;
};

export type Theme = {
  name?: string;
  websiteNameColor?: string;
  bgColor?: string;
  textColor?: string;
};
