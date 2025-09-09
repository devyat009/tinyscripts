import type { ScriptModule } from "../../shared/types";

interface ScriptTileProps {
  script: ScriptModule;
  onClick: () => void;
}

export function ScriptTile({ script, onClick }: ScriptTileProps) {
  return (
    <div
      className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:bg-gray-700 hover:border-gray-600 cursor-pointer transition-all duration-200 group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-white text-lg group-hover:text-blue-400 transition-colors">
          {script.name}
        </h3>
        {/* <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
          {script.id}
        </span> */}
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">
        {script.description}
      </p>
      <div className="mt-4 flex items-center text-xs text-gray-400">
        <span className="bg-gray-700 px-2 py-1 rounded mr-2">Script</span>
        <span>Click to configure</span>
      </div>
    </div>
  );
}