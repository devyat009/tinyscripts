export interface ImageOrganizerOptionsDto {
  path: string;
  outputPath?: string;
  format: "international" | "american";
  extensions: string[];
}