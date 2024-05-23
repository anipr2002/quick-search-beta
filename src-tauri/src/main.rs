// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process;
use tauri::{*};
use tauri_plugin_autostart::MacosLauncher;

#[tauri::command]
fn hide_window(app: AppHandle) {
  let window = app.get_window("main").unwrap();
  let menu_item = app.tray_handle().get_item("toggle");
  menu_item.set_title("Show").unwrap();
  window.hide().unwrap();
}

#[tauri::command]
fn show_window(app: AppHandle) {
  let window = app.get_window("main").unwrap();
  let menu_item = app.tray_handle().get_item("toggle");
  menu_item.set_title("Hide").unwrap();
  window.show().unwrap();
  window.center().unwrap()
}


fn make_tray() -> SystemTray {     // <- a function that creates the system tray
  let menu = SystemTrayMenu::new()
    .add_item(CustomMenuItem::new("toggle".to_string(), "Hide"))
    .add_item(CustomMenuItem::new("quit".to_string(), "Quit"));
  return SystemTray::new().with_menu(menu);
}



fn main() {
  tauri::Builder::default()
    .system_tray(make_tray())
    .invoke_handler(tauri::generate_handler![hide_window,show_window])  // <- adding the hide_window command to the application
    .on_system_tray_event(handle_tray_event)  // <- adding the system tray to the application
    .plugin(tauri_plugin_autostart::init(MacosLauncher::LaunchAgent, Some(vec!["--flag1", "--flag2"]) /* arbitrary number of args to pass to your app */))
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

fn handle_tray_event(app: &AppHandle, event: SystemTrayEvent) {
  if let SystemTrayEvent::MenuItemClick { id, .. } = event {
    if id.as_str() == "quit" {
      process::exit(0);
    }
    if id.as_str() == "toggle" {
      let window = app.get_window("main").unwrap();
      let menu_item = app.tray_handle().get_item("toggle");
      if window.is_visible().unwrap() {
        window.hide().unwrap();
        menu_item.set_title("Show").unwrap();
      } else {
        window.show().unwrap();
        window.center().unwrap();
        menu_item.set_title("Hide").unwrap();
      }
    }
  }
}

