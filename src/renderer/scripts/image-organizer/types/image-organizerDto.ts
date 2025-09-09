export interface ImageOrganizerOptions {
  path: string;
  outputPath?: string;
  format: "international" | "american";
  extensions: string[];
}