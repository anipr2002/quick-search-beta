import { ReactElement } from "react";

export type Website = {
    name : string;
    url : string;
    colorTheme : string;
    logo? : ReactElement
}