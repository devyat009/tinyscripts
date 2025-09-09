export interface ScriptModule<TOptions = Record<string, unknown>> {
  id: string;
  name: string;
  description: string;
  run: (options: TOptions) => Promise<void>;
  getDefaultOptions: () => TOptions;
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