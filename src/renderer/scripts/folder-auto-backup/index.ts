import type { ScriptModule } from "../../../shared/types";

const folderAutoBackup: ScriptModule = {
  id: "folder-auto-backup",
  name: "Folder Auto Backup",
  description: "Automatically backs up a folder at regular intervals to local or cloud storage",
  getDefaultOptions: () => ({
    path: "",
    multiplePath: Boolean,
    multiplePaths: [] as string[],
    
    backupType: ["local", "cloud"],
    // cloud backup options
    backupCloud: Boolean,
    backupCloudService: ["google-drive", "one-drive"],
    backupCloudInterval: Number,

    // local backup options
    backupLocalPath: String,
    backupLocalInterval: Number,

    // file
    fileName: String,
    fileNameTimestamp: Date,

    // compress into
    compressBackup: Boolean,
    compressFormat: ["zip", "tar", "7z"],

    logBackup: Boolean,
  }),
  configSchema: {
    path: { type: "string", label: "Folder path to back up" },
    multiplePath: { type: "boolean", label: "Backup multiple paths" },
    multiplePaths: { type: "array", label: "Paths to back up (if multiple)" },

    backupType: { type: "select", label: "Backup type", options: ["local", "cloud"] },
    // cloud backup options
    backupCloud: { type: "boolean", label: "Enable cloud backup" },
    backupCloudService: { type: "select", label: "Cloud service", options: ["google-drive", "one-drive"] },
    backupCloudInterval: { type: "number", label: "Cloud backup interval (minutes)" },
    // local backup options
    backupLocalPath: { type: "string", label: "Local backup path" },
    backupLocalInterval: { type: "number", label: "Local backup interval (minutes)" },
    // file
    fileName: { type: "string", label: "Backup file name" },
    fileNameTimestamp: { type: "date", label: "Include timestamp in file name" },
    // compress into
    compressBackup: { type: "boolean", label: "Compress backup" },
    compressFormat: { type: "select", label: "Compression format", options: ["zip", "tar", "7z"] },
    logBackup: { type: "boolean", label: "Log backup activities" },
  },
  run: async (options) => {
    // Actual logic will be in the main process
    window.electron.invoke("run-folder-auto-backup", options);
  },
};

export default folderAutoBackup;