import { appWindow } from "@tauri-apps/api/window";
import { registerAll } from "@tauri-apps/api/globalShortcut";

export const registerShortCuts = async () => {
    
    await registerAll(["Ctrl+`"], async () => {
      const isMinimized = await appWindow.isMinimized();
      if (isMinimized) {
        await appWindow.unminimize();
        setAlwaysOnTop();
      } else{
        await appWindow.minimize();
      }
    });
  };

  const setAlwaysOnTop = async () => {
    await appWindow.setAlwaysOnTop(true);
    appWindow.setFocus().finally(() => {
      console.log("Focus set to window");
    });
  };