import { useState } from "react"
import WidgetClosed from "./ClosedWidget/WidgetClosed";
import WidgetOpened from "./OpenedWidget/WidgetOpened";
import { motion, AnimatePresence, } from "motion/react";
import { useRef, useEffect } from "react";

const Widget = () => {

    const [isClosed, setIsClosed] = useState(true);

    const widgetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

      const handleMouseDown = (e:MouseEvent) => {
        const element = e.target;
        const chosenElements = (element as Element).matches('input, textarea, button')

        if(!widgetRef) return;
        if(!(element instanceof Element)) return;
        
        if(!widgetRef.current?.contains(element as Node) && !chosenElements) {
          setIsClosed(true)
        }
      }

      document.addEventListener(('mousedown'), handleMouseDown)
      return () => document.removeEventListener(('mousedown'), handleMouseDown)
    }, [])

  return (
    <motion.div
    ref =  {widgetRef}
    layout
    animate ={{height: 'auto'}}
    transition = {{type: "spring", bounce: 0.2, stiffness: 250, damping: 20, duration: 0.3, mass: 1}}
    className = "bg-gray-200/20 w-sm p-2 rounded-md border border-gray-300 h-auto overflow-hidden">
        <AnimatePresence
        mode = "popLayout"
        >
          {isClosed === true ? (
            <motion.div
            onClick={() => setIsClosed(false)}
            key = "closed"
            initial = {{opacity: 0}}
            animate = {{opacity: 1}}
            exit = {{opacity: 0, filter: "blur(10px)", y: -20}}
            transition = {{duration: 0.2, delay: 0.15}}
            >
              <WidgetClosed/>
            </motion.div>
          ) : (
            <motion.div
            key = "open"
            initial = {{opacity: 0}}
            animate = {{opacity: 1}}
            exit = {{opacity: 0, filter: "blur(10px)", y:-20}}
            transition = {{duration: 0.2, delay: 0.15}}
            >
              <WidgetOpened/>
            </motion.div>
          )}
        </AnimatePresence>
    </motion.div>
  )
}

export default Widget