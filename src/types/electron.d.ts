export interface ElectronAPI {
  invoke: (channel: string, args?: unknown) => Promise<unknown>;
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}