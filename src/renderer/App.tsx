import { scripts } from "./scripts";
import { ScriptTile } from "./components/ScriptTile";
import type { ScriptModule } from "../shared/types";


function openModalWithScript(script: ScriptModule) {
  // to do: modal logic
  console.log("Opening modal for the script:", script);
}

function App() {
  return (
    <div className="grid grid-cols-2 gap-4 p-8">
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