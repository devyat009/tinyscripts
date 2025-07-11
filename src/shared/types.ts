export interface ScriptOptions {
  path: string;
  format: "international" | "american";
  extensions: string[];
}

export interface ScriptModule {
  id: string;
  name: string;
  description: string;
  run: (options: ScriptOptions) => Promise<void>;
  getDefaultOptions: () => ScriptOptions;
  configSchema: ScriptConfigSchema;
}

export interface ScriptConfigSchema {
  [key: string]: {
    type: "string" | "select" | "checkbox";
    label: string;
    default?: string | boolean;
    options?: string[];
  };
}