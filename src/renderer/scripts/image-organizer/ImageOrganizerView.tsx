import { useEffect, useState } from 'react';
import type { ImageOrganizerOptions } from './types/image-organizerDto';

interface ImageOrganizerViewProps {
  onBack: () => void;
}

export function ImageOrganizerView({ onBack }: ImageOrganizerViewProps) {
  const [options, setOptions] = useState<ImageOrganizerOptions>({
    path: '',
    format: 'international',
    extensions: ['jpg', 'png', 'webp', 'jpeg']
  });
  const [activeTab, setActiveTab] = useState<'details' | 'settings'>('details');
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

  const handleRun = async () => {
    try {
      const result = (await window.electron.invoke('run-image-organizer', options)) as {
        sourceDir: string;
        moved: number;
        ignored: number;
        errors: number;
        logFile: string;
      };
      console.log('Image organizer executed successfully', result);
      if (result) {
        setNotice({
          type: result.errors > 0 ? 'error' : 'success',
          title: 'Image Organizer',
          lines: [
            `Pasta: ${result.sourceDir}`,
            `Movidos: ${result.moved}`,
            `Ignorados: ${result.ignored}`,
            `Erros: ${result.errors}`,
            `Log: ${result.logFile}`,
          ],
        });
      }
    } catch (error) {
      console.error('Error running image organizer:', error);
      setNotice({
        type: 'error',
        title: 'Fail to run Image Organizer',
        lines: [String(error)],
      });
    }
  };

  const handleBrowse = async () => {
  
    try {
      console.log('Calling open-directory-dialog...');
      const result = await window.electron.invoke('open-directory-dialog') as { canceled: boolean; filePaths: string[] };
      console.log('Dialog result:', result);
      
      if (result && !result.canceled && result.filePaths.length > 0) {
        setOptions((prev) => ({ ...prev, path: result.filePaths[0] }));
      }
    } catch (error) {
      console.error('Error opening directory dialog:', error);
    }
  };

  const handleOptionChange = (key: keyof ImageOrganizerOptions, value: string | string[]) => {
    setOptions((prev: ImageOrganizerOptions) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
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
          <h1 className="text-2xl font-bold">Image Organizer</h1>
          <span className="text-sm text-gray-400 bg-gray-700 px-3 py-1 rounded-full">
            image-organizer
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="p-6 border-b border-gray-700">
        <p className="text-lg text-gray-300">
          Automatically organize your images by extracting dates from filenames and moving them into organized folder structures.
        </p>
      </div>

      {/* Action Bar */}
      <div className="p-6 border-b border-gray-700">
        <button
          onClick={handleRun}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Organize Images
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
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'details' && (
          <div className="max-w-4xl space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">About Image Organizer</h2>
              <div className="bg-gray-800 p-6 rounded-lg">
                <p className="text-gray-300 leading-relaxed mb-4">
                  This script automatically organizes your image files by analyzing the filenames for date patterns
                  and moving them into a structured folder hierarchy based on year/month.
                </p>
                <h3 className="text-lg font-medium mb-3 text-blue-400">Features:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Supports multiple date formats (International: YYYY-MM-DD, American: MM-DD-YYYY)</li>
                  <li>Handles multiple image formats (JPG, PNG, WebP, JPEG)</li>
                  <li>Creates organized folder structure automatically</li>
                  <li>Safe operation with error handling</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl space-y-6">
            <h2 className="text-xl font-semibold">Configuration</h2>
            
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-300">
                Images Directory Path
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={options.path}
                  onChange={(e) => handleOptionChange('path', e.target.value)}
                  className="w-full pr-28 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                  placeholder="C:\Users\YourName\Pictures"
                />
                <button
                  className="absolute top-1/2 right-2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  style={{ minWidth: '80px' }}
                  onClick={handleBrowse}
                >
                  Browse
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-300">
                Date Format
              </label>
              <select
                value={options.format}
                onChange={(e) => handleOptionChange('format', e.target.value as 'international' | 'american')}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
              >
                <option value="international">International (DD-MM-YYYY)</option>
                <option value="american">American (MM-DD-YYYY)</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-300">
                File Extensions (comma separated)
              </label>
              <input
                type="text"
                value={options.extensions.join(', ')}
                onChange={(e) => handleOptionChange('extensions', e.target.value.split(',').map(ext => ext.trim()))}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                placeholder="jpg, png, webp, jpeg"
              />
            </div>

            <div className="pt-4 border-t border-gray-700">
              <button
                onClick={handleRun}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Apply Settings & Organize
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
