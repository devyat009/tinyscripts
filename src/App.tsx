import { ScriptTile } from "./renderer/components/ScriptTile";
import { scripts } from "./renderer/scripts";
import type { ScriptModule } from "./shared/types";

function openModalWithScript(script: ScriptModule) {
  console.log("opening moda script:", script);
}

function App() {
  return (
    <div className="grid grid-cols-2 gap-4 p-8 bg-background text-primary-text max-w-2xl">
      {scripts.map((script) => (
        <ScriptTile
          key={script.id}
          script={script}
          onClick={() => openModalWithScript(script)}
        />
      ))}
    </div>
  );
}

export default App;