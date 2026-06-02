import { useState } from 'react'
import { ChevronUpCircle, NotebookPen, CalendarDays, KanbanSquare,  Bot } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

const DockWrapper = () => {

  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <div className = "flex flex-col items-center gap-2 relative p-2 w-48"
         onMouseEnter={() => setIsHover(true)}
         onMouseLeave={() => setIsHover(false)}
    >
            <AnimatePresence>
                {isHover && (
                    <motion.button key = "expand" 
                    initial = {{opacity: 0, y:0}}
                    animate = {{opacity: 1, y: -20}}
                    exit = {{opacity: 0, y:0}}
                    transition={{ease: 'easeOut', duration: 0.2}}
                    className = "bg-gray-200/50 p-1 rounded-4xl absolute top-0">
                        <ChevronUpCircle className='text-gray-400 size-4'/>
                    </motion.button>
                )}
            </AnimatePresence>
        <div 
        className = "p-2 bg-gray-100/70 rounded-md shadow-sm relative w-full flex flex-row justify-between items-center"
        >
            <NotebookPen size={"18px"} className = "text-gray-600"/>
            <CalendarDays size = {"18px"} className = "text-gray-600"/>
            <KanbanSquare size = {"18px"} className = "text-gray-600"/>
            <Bot size = {"18px"} className = "text-gray-600"/>
        </div>
    </div>
  )
}

export default DockWrapper