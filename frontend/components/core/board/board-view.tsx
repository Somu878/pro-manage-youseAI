import { useEffect, useState } from "react";
import Task from "./Task";
import { TaskStatus, Task as TaskType } from "@/lib/types";
import { Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { DndContext } from "@/components/context/DndContext";
import { useBoard } from "@/app/hooks/UseBoard";
import BoardLoader from "@/components/ui/BoardLoader";
import { Loader2 } from "lucide-react";

function BoardView() {
  const { board, updateBoard, isLoading, error, refreshBoard } = useBoard();
  const [tasks, setTasks] = useState<Record<TaskStatus, TaskType[]>>({
    todo: [],
    in_progress: [],
    done: [],
  });

  useEffect(() => {
    setTasks({
      todo: board.filter((task) => task.status === "todo"),
      in_progress: board.filter((task) => task.status === "in_progress"),
      done: board.filter((task) => task.status === "done"),
    });
  }, [board]);
  const columnsOrder = ["todo", "in_progress", "done"];
  const columnTitles = {
    todo: "To Do",
    in_progress: "In Progress",
    done: "Done",
  };

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) {
      const column = source.droppableId as keyof typeof tasks;
      const reorderedTasks = Array.from(tasks[column]);
      const [removedTask] = reorderedTasks.splice(source.index, 1);
      reorderedTasks.splice(destination.index, 0, removedTask);
      setTasks((prev) => ({
        ...prev,
        [column]: reorderedTasks,
      }));
      console.log(tasks);
    } else {
      // Moving task between columns
      const sourceColumn = source.droppableId as keyof typeof tasks;
      const destinationColumn = destination.droppableId as keyof typeof tasks;
      const sourceTasks = Array.from(tasks[sourceColumn]);
      const destTasks = Array.from(tasks[destinationColumn]);
      // Remove the task from the source column
      const [movedTask] = sourceTasks.splice(source.index, 1) as TaskType[];
      console.log(movedTask);
      // Add the task to the destination column
      destTasks.splice(destination.index, 0, movedTask);
      console.log(destTasks);
      //update the task's status when moving between columns
      movedTask.status = destinationColumn as TaskStatus;
      // Update the state with tasks in both columns
      setTasks((prev) => ({
        ...prev,
        [sourceColumn]: sourceTasks,
        [destinationColumn]: destTasks,
      }));
      const all = [...tasks.todo, ...tasks.in_progress, ...tasks.done];
      updateBoard(all);
    }
  };
  if (
    tasks.todo.length === 0 &&
    tasks.in_progress.length === 0 &&
    tasks.done.length === 0
  )
    return (
      <div className="text-center text-gray-500 flex items-center justify-center h-[550px]">
        No tasks found <br /> Add some tasks to get started
      </div>
    );
  if (isLoading)
    return (
      <div className="text-center text-gray-500 flex items-center justify-center h-[550px]">
        <Loader2 className="w-7   h-7 animate-spin" />
      </div>
    );

  if (error) return <div>Error: {error}</div>;
  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {columnsOrder.map((column, index) => (
            <Droppable key={index} droppableId={column} isCombineEnabled={true}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-gray-100 rounded-lg shadow-md p-4 min-h-[550px]
                dark:bg-[#262626] dark:text-white"
                >
                  <h2 className="text-lg font-bold mb-2">
                    {columnTitles[column as keyof typeof columnTitles]}
                  </h2>
                  <div className="flex flex-col gap-2">
                    {tasks[column as keyof typeof tasks].map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            key={task.id}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="cursor-grab 
                            rounded-md
                            active:shadow-lg active:shadow-gray-400"
                          >
                            <Task
                              task={task}
                              refreshBoard={() => refreshBoard()}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DndContext>
  );
}

export default BoardView;
