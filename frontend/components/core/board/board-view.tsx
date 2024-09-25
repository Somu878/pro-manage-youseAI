import { useState } from "react";
import Task from "./Task";
import {  Task as TaskType } from "@/lib/types";
import { Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { DndContext } from "@/components/context/DndContext";


function BoardView({ board }: { board: TaskType[] }) {
  const [tasks, setTasks] = useState({
    todo: board.filter((task) => task.status === 'todo'),
    in_progress: board.filter((task) => task.status === 'in_progress'),
    done: board.filter((task) => task.status === 'done'),
  });

  const columnsOrder = ['todo', 'in_progress', 'done'];
  const columnTitles = {
    todo: 'To Do',
    in_progress: 'In Progress',
    done: 'Done',
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination} = result;
console.log(source,destination)
    // If the item is dropped outside any droppable area
    if (!destination) return;

    const sourceColumn = source.droppableId;
    const sourceIndex = source.index;
    const destColumn = destination.droppableId;
    const destIndex = destination.index;
    console.log(sourceColumn,sourceIndex)
    console.log(destColumn,destIndex)
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {columnsOrder.map((column,index) => (
            <Droppable key={index} droppableId={column} >
              {(provided) => (
                <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="bg-gray-100 rounded-lg shadow-md p-4"
              >
                  <h2 className="text-lg font-bold mb-2">
                    {columnTitles[column as keyof typeof columnTitles]}
                  </h2>
                  <div className="flex flex-col gap-2">
                    {tasks[column as keyof typeof tasks].map((task, index) => (
                    
                      <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                        {(provided) => (
                          <div
                            key={task.id}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className=" cursor-grab"
                          >
                         <Task task={task} />
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
