import { ipcMain } from "electron";
import type { ScriptOptions } from "../../shared/types";

ipcMain.handle("run-image-organizer", async (event, options: ScriptOptions) => {
  console.log("organizing files with:", options);
  // to do: logic to organize images based on the provided options
});