"use client";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { File, useFileStore } from "@/lib/store";
import { hasDraggableData } from "@/lib/utils";
import {
  Announcements,
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import type { Column } from "./board-column";
import { BoardColumn, BoardContainer } from "./board-column";
import NewCategoryDialog from "./new-category-dialog";
import { FileCard } from "./file-card";
// import { coordinateGetter } from "./multipleContainersKeyboardPreset";

const defaultCols = [
  {
    id: "TODO" as const,
    title: "Todo",
  },
  {
    id: "IN_PROGRESS" as const,
    title: "In progress",
  },
  {
    id: "DONE" as const,
    title: "Done",
  },
] satisfies Column[];

export type ColumnId = (typeof defaultCols)[number]["id"];

const initialFiles: File[] = [
  {
    id: "file1",
    status: "DONE",
    title: "Project initiation and planning",
  },
  {
    id: "file2",
    status: "DONE",
    title: "Gather requirements from stakeholders",
  },
];
export function FileBoard() {
  // const [columns, setColumns] = useState<Column[]>(defaultCols);
  const columns = useFileStore((state) => state.columns);
  const setColumns = useFileStore((state) => state.setCols);
  const pickedUpFileColumn = useRef<ColumnId | null>(null);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  // const [files, setFiles] = useState<File[]>(initialFiles);
  const files = useFileStore((state) => state.files);
  const setFiles = useFileStore((state) => state.setFiles);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [isMounted, setIsMounted] = useState<Boolean>(false);

  const [activeFile, setActiveFile] = useState<File | null>(null);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  useEffect(() => {
    useFileStore.persist.rehydrate();
  }, []);
  if (!isMounted) return;

  function getDraggingFileData(fileId: UniqueIdentifier, columnId: ColumnId) {
    const filesInColumn = files.filter((file) => file.status === columnId);
    const filePosition = filesInColumn.findIndex((file) => file.id === fileId);
    const column = columns.find((col) => col.id === columnId);
    return {
      filesInColumn,
      filePosition,
      column,
    };
  }

  const announcements: Announcements = {
    onDragStart({ active }) {
      if (!hasDraggableData(active)) return;
      if (active.data.current?.type === "Column") {
        const startColumnIdx = columnsId.findIndex((id) => id === active.id);
        const startColumn = columns[startColumnIdx];
        return `Picked up Column ${startColumn?.title} at position: ${
          startColumnIdx + 1
        } of ${columnsId.length}`;
      } else if (active.data.current?.type === "File") {
        pickedUpFileColumn.current = active.data.current.file.status;
        const { filesInColumn, filePosition, column } = getDraggingFileData(
          active.id,
          pickedUpFileColumn.current,
        );
        return `Picked up File ${active.data.current.file.title} at position: ${
          filePosition + 1
        } of ${filesInColumn.length} in column ${column?.title}`;
      }
    },
    onDragOver({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) return;

      if (
        active.data.current?.type === "Column" &&
        over.data.current?.type === "Column"
      ) {
        const overColumnIdx = columnsId.findIndex((id) => id === over.id);
        return `Column ${active.data.current.column.title} was moved over ${
          over.data.current.column.title
        } at position ${overColumnIdx + 1} of ${columnsId.length}`;
      } else if (
        active.data.current?.type === "File" &&
        over.data.current?.type === "File"
      ) {
        const { filesInColumn, filePosition, column } = getDraggingFileData(
          over.id,
          over.data.current.file.status,
        );
        if (over.data.current.file.status !== pickedUpFileColumn.current) {
          return `File ${
            active.data.current.file.title
          } was moved over column ${column?.title} in position ${
            filePosition + 1
          } of ${filesInColumn.length}`;
        }
        return `File was moved over position ${filePosition + 1} of ${
          filesInColumn.length
        } in column ${column?.title}`;
      }
    },
    onDragEnd({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) {
        pickedUpFileColumn.current = null;
        return;
      }
      if (
        active.data.current?.type === "Column" &&
        over.data.current?.type === "Column"
      ) {
        const overColumnPosition = columnsId.findIndex((id) => id === over.id);

        return `Column ${
          active.data.current.column.title
        } was dropped into position ${overColumnPosition + 1} of ${
          columnsId.length
        }`;
      } else if (
        active.data.current?.type === "File" &&
        over.data.current?.type === "File"
      ) {
        const { filesInColumn, filePosition, column } = getDraggingFileData(
          over.id,
          over.data.current.file.status,
        );
        if (over.data.current.file.status !== pickedUpFileColumn.current) {
          return `File was dropped into column ${column?.title} in position ${
            filePosition + 1
          } of ${filesInColumn.length}`;
        }
        return `File was dropped into position ${filePosition + 1} of ${
          filesInColumn.length
        } in column ${column?.title}`;
      }
      pickedUpFileColumn.current = null;
    },
    onDragCancel({ active }) {
      pickedUpFileColumn.current = null;
      if (!hasDraggableData(active)) return;
      return `Dragging ${active.data.current?.type} cancelled.`;
    },
  };

  return (
    <DndContext
      accessibility={{
        announcements,
      }}
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <BoardContainer>
        <SortableContext items={columnsId}>
          {columns?.map((col, index) => (
            <Fragment key={col.id}>
              <BoardColumn
                column={col}
                files={files.filter((file) => file.status === col.id)}
              />
              {index === columns?.length - 1 && (
                <div className="w-[300px]">
                  <NewCategoryDialog />
                </div>
              )}
            </Fragment>
          ))}
          {!columns.length && <NewCategoryDialog />}
        </SortableContext>
      </BoardContainer>

      {"document" in window &&
        createPortal(
          <DragOverlay>
            {activeColumn && (
              <BoardColumn
                isOverlay
                column={activeColumn}
                files={files.filter((file) => file.status === activeColumn.id)}
              />
            )}
            {activeFile && <FileCard file={activeFile} isOverlay />}
          </DragOverlay>,
          document.body,
        )}
    </DndContext>
  );

  function onDragStart(event: DragStartEvent) {
    if (!hasDraggableData(event.active)) return;
    const data = event.active.data.current;
    if (data?.type === "Column") {
      setActiveColumn(data.column);
      return;
    }

    if (data?.type === "File") {
      setActiveFile(data.file);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveFile(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (!hasDraggableData(active)) return;

    const activeData = active.data.current;

    if (activeId === overId) return;

    const isActiveAColumn = activeData?.type === "Column";
    if (!isActiveAColumn) return;

    const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

    const overColumnIndex = columns.findIndex((col) => col.id === overId);

    setColumns(arrayMove(columns, activeColumnIndex, overColumnIndex));
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    if (!hasDraggableData(active) || !hasDraggableData(over)) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    const isActiveAFile = activeData?.type === "File";
    const isOverAFile = activeData?.type === "File";

    if (!isActiveAFile) return;

    // Im dropping a File over another File
    if (isActiveAFile && isOverAFile) {
      const activeIndex = files.findIndex((t) => t.id === activeId);
      const overIndex = files.findIndex((t) => t.id === overId);
      const activeFile = files[activeIndex];
      const overFile = files[overIndex];
      if (activeFile && overFile && activeFile.status !== overFile.status) {
        activeFile.status = overFile.status;
        setFiles(arrayMove(files, activeIndex, overIndex - 1));
      }

      setFiles(arrayMove(files, activeIndex, overIndex));
    }

    const isOverAColumn = overData?.type === "Column";

    // Im dropping a File over a column
    if (isActiveAFile && isOverAColumn) {
      const activeIndex = files.findIndex((t) => t.id === activeId);
      const activeFile = files[activeIndex];
      if (activeFile) {
        activeFile.status = overId as ColumnId;
        setFiles(arrayMove(files, activeIndex, activeIndex));
      }
    }
  }
}
