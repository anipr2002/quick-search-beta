import { useEffect } from "react";
import SearchBar from "./components/SearchBar";
import { registerShortCuts } from "./helper/handleGlobalShortcut";

const App = () => {
  useEffect(() => {
    registerShortCuts();
  }, []);

  return (
    <>
      <SearchBar />
    </>
  );
};

export default App;
