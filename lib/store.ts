import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { persist } from "zustand/middleware";
import { Column } from "@/components/file/board-column";
import { UniqueIdentifier } from "@dnd-kit/core";

export type Status = "TODO" | "IN_PROGRESS" | "DONE";

const defaultCols = [
  {
    id: "TODO" as const,
    title: "Todo",
  },
] satisfies Column[];

export type ColumnId = (typeof defaultCols)[number]["id"];

export type File = {
  id: string;
  title: string;
  description?: string;
  status: Status;
};

export type State = {
  files: File[];
  columns: Column[];
  draggedFile: string | null;
};

export type Actions = {
  addFile: (title: string, description?: string) => void;
  addCol: (title: string) => void;
  dragFile: (id: string | null) => void;
  removeFile: (title: string) => void;
  removeCol: (id: UniqueIdentifier) => void;
  setFiles: (updatedFile: File[]) => void;
  setCols: (cols: Column[]) => void;
  updateCol: (id: UniqueIdentifier, newName: string) => void;
};

export const useFileStore = create<State & Actions>()(
  persist(
    (set) => ({
      files: [],
      columns: defaultCols,
      draggedFile: null,
      addFile: (title: string, description?: string) =>
        set((state) => ({
          files: [
            ...state.files,
            { id: uuid(), title, description, status: "TODO" },
          ],
        })),
      updateCol: (id: UniqueIdentifier, newName: string) =>
        set((state) => ({
          columns: state.columns.map((col) =>
            col.id === id ? { ...col, title: newName } : col,
          ),
        })),
      addCol: (title: string) =>
        set((state) => ({
          columns: [...state.columns, { id: uuid(), title }],
        })),
      dragFile: (id: string | null) => set({ draggedFile: id }),
      removeFile: (id: string) =>
        set((state) => ({
          files: state.files.filter((file) => file.id !== id),
        })),
      removeCol: (id: UniqueIdentifier) =>
        set((state) => ({
          columns: state.columns.filter((col) => col.id !== id),
        })),
      setFiles: (newFiles: File[]) => set({ files: newFiles }),
      setCols: (newCols: Column[]) => set({ columns: newCols }),
    }),
    { name: "file-store", skipHydration: true },
  ),
);
