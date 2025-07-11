import type { ScriptModule } from "../../shared/types";


interface ScriptTileProps {
  script: ScriptModule;
  onClick: () => void;
}

export function ScriptTile({ script, onClick }: ScriptTileProps) {
  return (
    <div
      className="border border-fourth p-4 rounded bg-background-light text-primary-text hover:bg-secondary/20 cursor-pointer"
      onClick={onClick}
    >
      <h3 className="font-bold text-secondary-text">{script.name}</h3>
      <p className="text-sm text-fifth-text">{script.description}</p>
    </div>
  );
}