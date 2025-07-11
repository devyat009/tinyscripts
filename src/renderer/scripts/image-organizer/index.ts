import type { ScriptModule } from "../../../shared/types";


const imageOrganizer: ScriptModule = {
  id: "image-organizer",
  name: "Organize Images by Date",
  description: "Moves images based on dates in the filename",
  getDefaultOptions: () => ({
    path: "",
    format: "international",
    extensions: ["jpg", "png", "webp", "jpeg"],
  }),
  configSchema: {
    path: { type: "string", label: "Images path" },
    format: {
      type: "select",
      label: "Data format",
      options: ["international", "american"],
    },
    extensions: { type: "string", label: "Extentions (jpg,png,webp, jpeg)" },
  },
  run: async (options) => {
    // A lógica real estará no processo main
    window.electron.invoke("run-image-organizer", options);
  },
};

export default imageOrganizer;
