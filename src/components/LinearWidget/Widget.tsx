import { useState } from "react"
import WidgetClosed from "./ClosedWidget/WidgetClosed";
import WidgetOpened from "./OpenedWidget/WidgetOpened";
import { motion, AnimatePresence, } from "motion/react";

const Widget = () => {

    const [isClosed, setIsClosed] = useState(true);

    const handleIsClosed = () => {
      
      setIsClosed(!isClosed)
    }

  return (
    <motion.div
    layout
    animate ={{height: 'auto'}}
    transition = {{type: "spring", bounce: 0.2, stiffness: 300, damping: 20, duration: 0.3}}
    onClick={() => handleIsClosed()}
    className = "bg-gray-200/20 w-sm p-2 rounded-md border border-gray-300 h-auto overflow-hidden">
        <AnimatePresence
        mode = "popLayout"
        >
          {isClosed === true ? (
            <motion.div
            key = "closed"
            initial = {{opacity: 0}}
            animate = {{opacity: 1}}
            exit = {{opacity: 0, filter: "blur(10px)", y: -20}}
            transition = {{duration: 0.2, delay: 0.2}}
            >
              <WidgetClosed/>
            </motion.div>
          ) : (
            <motion.div
            key = "open"
            initial = {{opacity: 0}}
            animate = {{opacity: 1}}
            exit = {{opacity: 0, filter: "blur(10px)", y:-20}}
            transition = {{duration: 0.2, delay: 0.2}}
            >
              <WidgetOpened/>
            </motion.div>
          )}
        </AnimatePresence>
    </motion.div>
  )
}

export default Widget