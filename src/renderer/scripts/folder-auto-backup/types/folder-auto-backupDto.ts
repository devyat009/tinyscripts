export interface FolderAutoBackupOptionsDto {
  path: string;
  backupPath: string;
  extensions: string[];
  backupType: "local" | "cloud";
  backupCloudService: "google-drive" | "one-drive";
  backupCloudInterval: number;
  backupLocalPath: string;
  backupLocalInterval: number;
  fileName: string;
  fileNameTimestamp: Date;
  compressBackup: boolean;
  compressFormat: "zip" | "tar" | "7z";
  logBackup: boolean;
}