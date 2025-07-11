import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  invoke: (channel: string, data: unknown) => ipcRenderer.invoke(channel, data),
});