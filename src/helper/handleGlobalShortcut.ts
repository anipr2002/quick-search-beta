import { appWindow } from "@tauri-apps/api/window";
import { registerAll } from "@tauri-apps/api/globalShortcut";
import { invoke } from "@tauri-apps/api";

export const registerShortCuts = async () => {
    
    await registerAll(["Ctrl+`"], async () => {
      const isMinimized = await appWindow.isMinimized();
      if (isMinimized) {
        await appWindow.unminimize();
        invoke("show_window");
        setAlwaysOnTop();
      } else{
        await appWindow.minimize();
        invoke("hide_window")
      }
    });
  };

  const setAlwaysOnTop = async () => {
    await appWindow.setAlwaysOnTop(true);
    appWindow.setFocus().finally(() => {
      console.log("Focus set to window");
    });
  };