import React, { useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { MdOutlineKeyboardTab } from "react-icons/md";
import Icons from "./ui/Icons";
import websiteData from "../assets/websites.json";
import { Website } from "../types/website";
import useStore from "../store/store";
import { getAutocompleteSuggestions } from "../helper/autocompleteHelper";
import { open } from "@tauri-apps/api/shell";
import { appWindow } from "@tauri-apps/api/window";

const SearchBar = () => {
  const {
    websiteName,
    colorTheme,
    setSearchQuery,
    setWebsiteName,
    searchQuery,
    tabpressed,
    setTabPressed,
    setColorTheme,
    matchedWebsite,
    setMatchedWebsite,
  } = useStore();

  const inputRef = useRef<HTMLInputElement>(null);

  const getColorTheme = (websiteName: string): void => {
    const website: Website = websiteData.find(
      (website) => website.name.toLowerCase() === websiteName.toLowerCase()
    ) as Website;

    if (website) {
      setColorTheme(website.colorTheme);
    } else {
      setColorTheme("#8D9093");
    }
  };

  const handleKeyPress = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ): Promise<void> => {
    const isMinimized = await appWindow.isMinimized();
    if (e.key === "Tab" && !tabpressed) {
      e.preventDefault();
      handleTabPress();
      //   console.log(colorTheme);
    } else if (e.key === "Escape") {
      if (!tabpressed) {
        await appWindow.minimize();
        resetData();
      }
      resetData();
      inputRef.current?.focus();
    } else if (e.key === "Enter") {
      redirectToWebsite();
      if (!isMinimized) appWindow.minimize();
      resetData();
    } else if (e.key === "Backspace") {
      setMatchedWebsite(null);
    } else if (e.key === "Enter" && searchQuery === "") {
      redirectToWebsiteName();
      if (!isMinimized) appWindow.minimize();
      resetData();
    }
  };

  const resetData = (): void => {
    setTabPressed(false);
    setSearchQuery("");
    setMatchedWebsite(null);
    setColorTheme("#8D9093");
  };

  const handleTabPress = (): void => {
    setTabPressed(true);

    const partialName = inputRef.current?.value as string;

    if (partialName.length > 2) {
      const suggestions = getAutocompleteSuggestions({
        websiteData,
        input: partialName,
      });

      const matched = suggestions.length > 0 ? suggestions[0] : null;

      if (matched) {
        // Set the completed website name
        setWebsiteName(matched.name);
        // Set the color theme based on the completed website name
        getColorTheme(matched.colorTheme as string);
        // console.log(colorTheme);
        setMatchedWebsite(null);
      }

      //if no matched website, set the website name to Google and partial name to search query
      if (!matched) {
        setWebsiteName("google");
        setColorTheme("google");
        setSearchQuery(partialName);
      }
    } else if (partialName.length <= 2) {
      setWebsiteName("google");
      setColorTheme("google");
      setSearchQuery(partialName);
    }

    inputRef.current?.focus();
    getColorTheme(inputRef.current?.value as string);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const partialName = e.target.value.toLowerCase();

    // Find a unique partial match in the website names from the JSON data if partialName.length > 3
    if (partialName.length > 2) {
      const matched = websiteData.find((website) =>
        website.name.toLowerCase().startsWith(partialName)
      );

      setMatchedWebsite(matched || null);
      setWebsiteName(e.target.value);
    }
  };

  //useEffect for color theme
  useEffect(() => {
    getColorTheme(websiteName);
  }, [websiteName]);

  //useEffect for tab to matched website

  const constructWebsiteURL = (
    SearchURL: string,
    searchQuery: string
  ): string => {
    const website: Website = websiteData.find(
      (website) => website.name.toLowerCase() === SearchURL.toLowerCase()
    ) as Website;
    if (website) {
      return website.SearchURL + searchQuery;
    } else {
      return "https://www.google.com/search?q=" + websiteName + searchQuery;
    }
  };

  const contructWebsiteName = (websiteName: string): string => {
    const website: Website = websiteData.find(
      (website) => website.name.toLowerCase() === websiteName.toLowerCase()
    ) as Website;
    if (website) {
      return website.url;
    } else {
      return "https://www.google.com/search?q=" + websiteName + searchQuery;
    }
  };

  const isValidWebsiteName = (websiteName: string): boolean => {
    return websiteName.trim() !== "";
  };

  const redirectToWebsite = (): void => {
    if (isValidWebsiteName(websiteName)) {
      const searchURL: string = constructWebsiteURL(websiteName, searchQuery);
      open(searchURL).catch((e) => {
        console.error("Error opening the URL:", e);
      });
    } else {
      alert("Please enter a valid website name");
      console.error("Please enter a valid website name");
    }
  };

  const redirectToWebsiteName = (): void => {
    if (isValidWebsiteName(websiteName)) {
      const websiteURL: string = contructWebsiteName(websiteName);
      open(websiteURL).catch((e) => {
        console.error("Error opening the URL:", e);
      });
    } else {
      alert("Please enter a valid website name");
      console.error("Please enter a valid website name");
    }
  };

  return (
    <div className="w-screen h-screen bg-transparent px-96 flex items-center justify-center">
      <div
        className={`w-full h-20 grainy rounded-xl gap-5 flex items-center px-4`}
        style={{
          boxShadow: `0 0 5px ${colorTheme}, 0 0 15px ${colorTheme}`,
        }}
      >
        {!tabpressed && !matchedWebsite && (
          <div className="ml-4">
            <Search size={24} color="black" />
          </div>
        )}
        {!tabpressed && matchedWebsite && (
          <div className="ml-4" style={{ color: matchedWebsite.colorTheme }}>
            <Icons name={matchedWebsite.name.toLowerCase()} size={24} />
          </div>
        )}

        {!tabpressed && (
          <>
            <div className="h-full w-full flex ">
              <input
                type="text"
                placeholder="Enter Website"
                className="w-full h-full flex-1 p-2 bg-transparent outline-none font-medium text-black text-xl"
                onKeyDown={handleKeyPress}
                onChange={(e) => {
                  setWebsiteName(e.target.value);
                  handleInputChange(e);
                  if (e.target.value === "") {
                    setMatchedWebsite(null);
                  }
                }}
                ref={inputRef}
                autoFocus
              />
              <div className="h-full w-fit flex items-center">
                {matchedWebsite && (
                  <>
                    <span
                      className={"mr-2 font-mono"}
                      style={{ color: matchedWebsite.colorTheme }}
                    >
                      Search {matchedWebsite.name}
                    </span>
                    <div style={{ color: matchedWebsite.colorTheme }}>
                      <MdOutlineKeyboardTab />
                    </div>
                  </>
                )}
                {!matchedWebsite && (
                  <>
                    <span className={"mr-2"}>Tab to Search</span>
                    <div>
                      <MdOutlineKeyboardTab />
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}

        {/* This when the website name is entered */}
        {tabpressed && (
          <>
            {/* This is the website name section */}
            <div
              className={`w-fit h-fit border text-white rounded-xl flex items-center ml-6`}
              style={{
                backgroundColor: colorTheme,
                boxShadow: `0 0 5px ${colorTheme}, 0 0 15px ${colorTheme}`,
              }}
            >
              <span className="pl-2">
                <Icons name={websiteName.toLowerCase()} />
              </span>
              <h1 className="p-2 font-medium">{websiteName}</h1>
            </div>

            {/* This is the search query section */}
            <div className="flex-1">
              <input
                type="text"
                ref={inputRef}
                autoFocus
                onKeyDown={handleKeyPress}
                placeholder={`Search ${websiteName}`}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                value={searchQuery}
                className="w-full h-full p-2 bg-transparent outline-none text-black text-xl"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
