import { NotebookPen, CalendarDays, KanbanSquare,  Bot } from 'lucide-react'

const DockMinimized = () => {
  return (
    <div 
        className = "relative flex flex-row items-center justify-between w-full p-2 rounded-md shadow-sm bg-gray-100/70"
        >
            <NotebookPen size={"18px"} className = "text-gray-600 cursor-pointer "/>
            <CalendarDays size = {"18px"} className = "text-gray-600 cursor-pointer "/>
            <KanbanSquare size = {"18px"} className = "text-gray-600 cursor-pointer "/>
            <Bot size = {"18px"} className = "text-gray-600 cursor-pointer "/>
        </div>
  )
}

export default DockMinimized