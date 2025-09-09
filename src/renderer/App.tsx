import { useState } from 'react';
import { scripts } from "./scripts";
import { ScriptTile } from "./components/ScriptTile";
import { ScriptDetailView } from "./components/ScriptDetailView";
import { ImageOrganizerView } from "./scripts/image-organizer/ImageOrganizerView";
import type { ScriptModule } from "../shared/types";

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'script' | 'image-organizer'>('home');
  const [selectedScript, setSelectedScript] = useState<ScriptModule | null>(null);

  const handleScriptClick = (script: ScriptModule) => {
    setSelectedScript(script);
    // Use specific view for image-organizer, generic for others
    if (script.id === 'image-organizer') {
      setCurrentView('image-organizer');
    } else {
      setCurrentView('script');
    }
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedScript(null);
  };

  // Render specific view for image-organizer
  if (currentView === 'image-organizer') {
    return <ImageOrganizerView onBack={handleBackToHome} />;
  }

  // Generic view for other scripts
  if (currentView === 'script' && selectedScript) {
    return (
      <ScriptDetailView 
        script={selectedScript} 
        onBack={handleBackToHome}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">TinyScripts</h1>
          <p className="text-gray-400">A collection of useful automation scripts</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scripts.map((script) => (
            <ScriptTile
              key={script.id}
              script={script}
              onClick={() => handleScriptClick(script)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;