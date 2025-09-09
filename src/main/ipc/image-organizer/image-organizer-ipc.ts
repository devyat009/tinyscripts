import { ipcMain } from "electron";
import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import os from "os";
import type { ImageOrganizerOptions } from "../../../renderer/scripts/image-organizer/types/image-organizerDto";

const MONTHS: Record<number, string> = {
  1: "01 - Janeiro", 2: "02 - Fevereiro", 3: "03 - Março",
  4: "04 - Abril", 5: "05 - Maio", 6: "06 - Junho",
  7: "07 - Julho", 8: "08 - Agosto", 9: "09 - Setembro",
  10: "10 - Outubro", 11: "11 - Novembro", 12: "12 - Dezembro",
};

type OrganizeResult = {
  sourceDir: string;
  moved: number;
  ignored: number;
  errors: number;
  logFile: string;
  entries: string[];
};

function isValidDate(y: number, m: number, d: number): boolean {
  const dt = new Date(y, m - 1, d);
  return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
}

async function moveFileSafe(src: string, dest: string) {
  try {
    await fsp.rename(src, dest);
  } catch (err: unknown) {
    if ((err as { code?: string })?.code === "EXDEV") {
      await fsp.copyFile(src, dest);
      await fsp.unlink(src);
    } else {
      throw err;
    }
  }
}

function normalizeExts(exts?: string[]): string[] {
  const defaults = ["png", "jpg", "jpeg", "gif", "bmp"];
  const list = (exts?.length ? exts : defaults).map((e) => e.replace(/^\./, "").toLowerCase());
  return Array.from(new Set(list));
}

function buildPattern(format: ImageOrganizerOptions["format"], exts: string[]) {
  const extGroup = exts.join("|");
  // Permite separadores -, _, . ou espaço
  const sep = "[-_. ]";
  if (format === "american") {
    // mm{sep}dd{sep}yyyy
    const regex = new RegExp(`.*?(\\d{2})${sep}(\\d{2})${sep}(\\d{4}).*?\\.(${extGroup})$`, "i");
    const map = (g1: string, g2: string, g3: string) => ({ year: Number(g3), month: Number(g1), day: Number(g2) });
    return { regex, map };
  }
  // international yyyy{sep}mm{sep}dd
  const regex = new RegExp(`.*?(\\d{4})${sep}(\\d{2})${sep}(\\d{2}).*?\\.(${extGroup})$`, "i");
  const map = (g1: string, g2: string, g3: string) => ({ year: Number(g1), month: Number(g2), day: Number(g3) });
  return { regex, map };
}

function resolveDefaultSourceDir(): string {
  const home = os.homedir();
  const candidates = [
    path.join(home, "Pictures", "Screenshots"),
    path.join(home, "Pictures", "Capturas de tela"),
    path.join(home, "Pictures", "Capturas de Tela"),
    path.join(home, "Imagens", "Capturas de tela"),
    path.join(home, "Imagens", "Screenshots"),
  ];
  for (const p of candidates) {
    try {
      if (fs.existsSync(p)) return p;
    } catch {
      // ignore
    }
  }
  return candidates[0];
}

async function organizarImagens(options: ImageOrganizerOptions): Promise<OrganizeResult> {
  const baseDir = options?.path && options.path.trim() !== "" ? options.path : resolveDefaultSourceDir();
  const format = options?.format ?? "international";
  const exts = normalizeExts(options?.extensions);

  if (!fs.existsSync(baseDir)) {
    return {
      sourceDir: baseDir,
      moved: 0,
      ignored: 0,
      errors: 0,
      logFile: path.join(baseDir, "organizer.log"),
      entries: [`Folder not found: ${baseDir}\n`],
    };
  }

  const { regex, map } = buildPattern(format, exts);

  const logPath = path.join(baseDir, "organizer.log");
  const header = `\n--- Organization on ${new Date().toISOString().replace("T", " ").slice(0, 19)} ---\n`;

  const entries: string[] = [];
  let moved = 0;
  let ignored = 0;
  let errors = 0;

  const dirents = await fsp.readdir(baseDir, { withFileTypes: true });

  for (const dirent of dirents) {
    if (!dirent.isFile()) continue;

    const filename = dirent.name;
    if (filename.startsWith(".") || filename === "organizer.log") continue;

    const origem = path.join(baseDir, filename);
    const match = regex.exec(filename);

    if (!match) {
      const e = `IGN: ${filename} (formato não reconhecido)\n`;
      entries.push(e);
      ignored++;
      continue;
    }

    const { year, month, day } = map(match[1], match[2], match[3]);

    if (!isValidDate(year, month, day)) {
      const e = `IGN: ${filename} (date invalid)\n`;
      entries.push(e);
      ignored++;
      continue;
    }

    const nomePasta = `${year}/${MONTHS[month]}`;
    const pastaDestino = path.join(baseDir, String(year), MONTHS[month]);
    const destino = path.join(pastaDestino, filename);

    try {
      await fsp.mkdir(pastaDestino, { recursive: true });
      await moveFileSafe(origem, destino);

      const e = `MOV: ${filename} -> ${nomePasta}/\n`;
      entries.push(e);
      moved++;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      const e = `ERR: ${filename} (${message})\n`;
      entries.push(e);
      errors++;
    }
  }

  try {
    await fsp.appendFile(logPath, header + entries.join(""), { encoding: "utf-8" });
  } catch (err) {
    console.warn("Failed to write organizer.log:", err);
  }

  for (const line of entries) console.log(line.trim());

  return { sourceDir: baseDir, moved, ignored, errors, logFile: logPath, entries };
}

ipcMain.handle("run-image-organizer", async (_event, options: ImageOrganizerOptions) => {
  console.log("Organizing files with options:", options);
  return organizarImagens(options);
});