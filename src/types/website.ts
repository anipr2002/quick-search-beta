import { ReactElement } from "react";

export type Website = {
  name: string;
  url: string;
  SearchURL?: string;
  colorTheme: string;
  logo?: ReactElement;
};

export type Theme = {
  name?: string;
  websiteNameColor?: string;
  bgColor?: string;
  textColor?: string;
};
