import { useState } from "react"
import Task from "./Task"
import { Task as TaskType } from "@/lib/types"
// const initialTasks = {
//     'todo': [
//       { id: 'task-1', title: 'Research competitors', description: 'Analyze top 5 competitors', priority: 'High', dueDate: '2023-06-30', status: 'todo' },
//       { id: 'task-2', title: 'Design mockups', description: 'Create initial designs for homepage', priority: 'Medium', dueDate: '2023-07-05', status: 'todo' },
//     ],
//     'in-progress': [
//       { id: 'task-3', title: 'Implement authentication', description: 'Set up user login and registration', priority: 'High', dueDate: '2023-06-28', status: 'in-progress'   },
//     ],
//     'done': [
//       { id: 'task-4', title: 'Set up project repository', description: 'Initialize Git repo and invite team members', priority: 'Low', dueDate: '2023-06-20', status: 'done' },
//     ],
//   }
function BoardView({board}:{board:TaskType[]}) {
    const [tasks, setTasks] = useState(board)
    
    const columnsOrder = ['todo', 'in_progress', 'done']
const columnTitles = {
  'todo': 'To Do',
  'in_progress': 'In Progress',
  'done': 'Done',
}
    return (
        <div className="p-4">
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {columnsOrder.map((column) => (
                    <div key={column} className="bg-gray-100 rounded-lg shadow-md p-4">
                        <h2 className="text-lg font-bold mb-2">{columnTitles[column as keyof typeof columnTitles]}</h2>
                     <div className="flex flex-col gap-2">
                     {
                        tasks.filter((task)=>task.status===column).map((task)=>(
                            <Task key={task.id} task={task} />
                        ))
                     }
                     </div>
                     
                    </div>
                ))}
            </div>

        </div>)
    
}
export default BoardView;