import { useState } from 'react';
import type { ScriptModule } from '../../shared/types';

interface ScriptDetailViewProps {
  script: ScriptModule;
  onBack: () => void;
}

export function ScriptDetailView({ script, onBack }: ScriptDetailViewProps) {
  const [options, setOptions] = useState(script.getDefaultOptions());
  const [activeTab, setActiveTab] = useState<'details' | 'settings'>('details');

  const handleRun = () => {
    script.run(options);
  };

  const handleOptionChange = (key: string, value: string | boolean) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
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
          <h1 className="text-2xl font-bold">{script.name}</h1>
          <span className="text-sm text-gray-400 bg-gray-700 px-3 py-1 rounded-full">
            {script.id}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="p-6 border-b border-gray-700">
        <p className="text-lg text-gray-300">{script.description}</p>
      </div>

      {/* Action Bar */}
      <div className="p-6 border-b border-gray-700">
        <button
          onClick={handleRun}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Run Script
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
              <h2 className="text-xl font-semibold mb-4">About {script.name}</h2>
              <p className="text-gray-300 leading-relaxed">{script.description}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Configuration Options</h3>
              <div className="grid gap-3">
                {Object.entries(script.configSchema).map(([key, config]) => (
                  <div key={key} className="bg-gray-800 p-4 rounded-lg">
                    <div className="font-medium text-white">{config.label}</div>
                    <div className="text-sm text-gray-400 mt-1">
                      Type: <span className="text-blue-400">{config.type}</span>
                      {config.options && (
                        <span className="ml-4">
                          Options: <span className="text-green-400">{config.options.join(', ')}</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl space-y-6">
            <h2 className="text-xl font-semibold">Configuration</h2>
            
            {Object.entries(script.configSchema).map(([key, config]) => (
              <div key={key} className="space-y-3">
                <label className="block text-sm font-medium text-gray-300">
                  {config.label}
                </label>
                
                {config.type === 'string' && (
                  <input
                    type="text"
                    value={String(options[key] || '')}
                    onChange={(e) => handleOptionChange(key, e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                    placeholder={`Enter ${config.label.toLowerCase()}`}
                  />
                )}

                {config.type === 'select' && config.options && (
                  <select
                    value={String(options[key] || '')}
                    onChange={(e) => handleOptionChange(key, e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                  >
                    {config.options.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}

                {config.type === 'checkbox' && (
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={Boolean(options[key])}
                      onChange={(e) => handleOptionChange(key, e.target.checked)}
                      className="h-5 w-5 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-400 focus:ring-2"
                    />
                    <span className="text-gray-300">Enable this option</span>
                  </label>
                )}
              </div>
            ))}

            <div className="pt-4 border-t border-gray-700">
              <button
                onClick={handleRun}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Apply Settings & Run
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
