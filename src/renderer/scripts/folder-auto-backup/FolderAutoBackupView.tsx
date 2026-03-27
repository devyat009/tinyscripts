import { useEffect, useState } from "react";
import type { FolderAutoBackupOptionsDto } from "./types/folder-auto-backupDto";


interface FolderAutoBackupViewProps {
  onBack: () => void;
}

export function FolderAutoBackupView({ onBack }: FolderAutoBackupViewProps) {
  const [options, setOptions] = useState<FolderAutoBackupOptionsDto>({
    path: "",
    backupPath: "",
    extensions: [],
    backupType: "local",
    backupCloudService: "google-drive",
    backupCloudInterval: 0,
    backupLocalPath: "",
    backupLocalInterval: 0,
    fileName: "",
    fileNameTimestamp: new Date(),
    compressBackup: false,
    compressFormat: "zip",
    logBackup: false,
  });

  const [activeTab, setActiveTab] = useState<"details" | "settings" |"logs">("details");
  const [notice, setNotice] = useState<
    | null
    | {
      type: 'success' | 'error' | 'info';
      title: string;
      lines: string[];
    }
  >(null);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 6000);
    return () => clearTimeout(t);
  }, [notice]);


  const handleBrowse = (field: 'path' | 'outputPath') => async () => {
    try {
      console.log('Calling open-directory-dialog...');
      const result = await window.electron.invoke('open-directory-dialog') as { canceled: boolean; filePaths: string[] };
      console.log('Dialog result:', result);

      if (result && !result.canceled && result.filePaths.length > 0) {
        setOptions((prev) => ({ ...prev, [field]: result.filePaths[0] }));
      }
    } catch (error) {
      console.error('Error opening directory dialog:', error);
    }
  };

  const handleRun = async () => {

  };


  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Notification (top-left) */}
      {/* Notification (top-left) */}
      {notice && (
        <div className="fixed top-4 right-4 z-50 w-[360px] pointer-events-none">
          <div
            className={`pointer-events-auto rounded-lg border p-4 shadow-lg transition-all ${
              notice.type === 'success'
                ? 'bg-green-700 border-green-800 text-white'
                : notice.type === 'error'
                ? 'bg-red-700 border-red-800 text-white'
                : 'bg-gray-800 border-gray-700 text-white'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-lg">
                {notice.type === 'success' ? '✓' : notice.type === 'error' ? '⚠' : 'ℹ'}
              </div>
              <div className="flex-1">
                <div className="font-semibold mb-1">{notice.title}</div>
                <div className="text-sm space-y-1 whitespace-pre-wrap break-all">
                  {notice.lines.map((line, idx) => (
                    <div key={idx} title={line}>
                      {line}
                    </div>
                  ))}
                </div>
              </div>
              <button
                className="ml-2 text-white/70 hover:text-white"
                onClick={() => setNotice(null)}
                aria-label="Close notification"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="flex items-center gap-4 p-6 border-b border-gray-700">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <span className="text-xl">←</span>
          <span>Back</span>
        </button>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Folder Auto Backup</h1>
          {/* <span className="text-sm text-gray-400 bg-gray-700 px-3 py-1 rounded-full">
            folder-auto-backup
          </span> */}
        </div>
      </div>

      { /* Description */}
      <div className="p-6 border-b border-gray-700">
        <p className="text-lg text-gray-300">
          Automatically backs up a folder at regular intervals to local or cloud storage
        </p>
      </div>
      
      {/* Action Bar */}
      <div className="p-6 border-b boder-gray-700">
        <button
          onClick={handleRun}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Run Backup
          </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700">
        <button
          onClick={() => setActiveTab('details')}
          className={`px-6 py-4 font-medium transition-colors ${
            activeTab === 'details'
              ? 'text-blue-400 border-b-2 border-blue-400 bg-gray-800'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          Details
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-6 py-4 font-medium transition-colors ${
            activeTab === 'settings'
              ? 'text-blue-400 border-b-2 border-blue-400 bg-gray-800'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          Settings
        </button>
        <button 
          onClick={() => setActiveTab('logs')}
          className={`px-6 py-4 font-medium transition-colors ${
            activeTab === 'logs'
              ? 'text-blue-400 border-b-2 border-blue-400 bg-gray-800'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          Logs
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'details' && (
          <div className="max-w-4xl space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">About Folder Auto Backup</h2>
              <div className="bg-gray-800 p-6 rounded-lg">
                <p className="text-gray-300 leading-relaxed mb-4">
                  This script automatically backs up a folder at regular intervals to local or cloud storage.
                </p>
                <h3 className="text-lg font-medium mb-3 text-blue-400">Features:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'settings' && (
          <div>
          </div>
        )}
        {activeTab === 'logs' && (
          <div>
          </div>
        )}
      </div>
      

    </div>
  )
}