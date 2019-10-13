import { useState } from "react";
import { join } from "path";
import { dirs as fetchDirs } from "../Services/IPC";

interface State {
  dirs: string[];
  currentDir: string;
}

interface Getters {
  dirs: string[];
  currentDir: string;
}

interface Actions {
  digDir(dir: string): void;
  parentDir(): void;
  updateDirs(): void;
}

export type FileSystemStore = Getters & Actions

export function useFileSystem(): FileSystemStore {
  const [state, setState] = useState<State>({
    dirs: [],
    currentDir: "~/",
  });

  async function updateDirs() {
    const { currentDir } = state;
    const response = await fetchDirs(currentDir);
    setState({ ...state, currentDir: response.currentDir, dirs: response.dirs });
  }

  function digDir(path: string) {
    setState({ ...state, currentDir: path });
  }

  function parentDir() {
    const { currentDir } = state;
    digDir(join(currentDir, ".."));
  }

  const { dirs, currentDir } = state;
  return {
    dirs,
    currentDir,
    digDir,
    parentDir,
    updateDirs,
  }
}
