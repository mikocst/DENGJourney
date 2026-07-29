import { useState } from 'react'
import Icon from '../Icon'
import { motion, AnimatePresence } from 'motion/react'
import DockMinimized from './DockMinimized'
import DockExpanded from './DockExpanded'

const DockWrapper = () => {

  const [isHover, setIsHover] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleClick = () => {
        setIsExpanded(true);
        setIsHover(false)
  }
  

  return (
    <motion.div className = "relative flex flex-col items-center gap-2 p-2" 
         layout
         onMouseEnter={() => setIsHover(true)}
         onMouseLeave={() => setIsHover(false)}
         initial = {{width: '192px'}}
         animate = {{width: `${isExpanded ? '800px' : '192px'}`}}
         transition = {{type: 'spring', duration: .7, bounce: 0.2}}
    >
            <AnimatePresence>
                {isHover && (
                    <motion.button key = "expand" 
                    initial = {{opacity: 0, y:0}}
                    animate = {{opacity: 1, y: -20}}
                    exit = {{opacity: 0, y:0}}
                    transition={{ease: 'easeOut', duration: 0.2}}
                    className = "absolute top-0 p-1 cursor-pointer bg-gray-200/50 rounded-4xl"
                    onClick={handleClick}
                    >
                        <Icon name='chevron-up' className='text-gray-400 size-4'/>
                    </motion.button>
                )}
            </AnimatePresence>
        <motion.div
        key = {isExpanded ? "expanded" : "minimized"}
        animate  = {{filter: ["blur(0px)", "blur(5px)", "blur(0px)"], opacity: 0.8}}
        initial = {false}
        transition = {{duration: 0.3, ease: 'easeOut'}}
        className = "w-full"
        >
            <AnimatePresence>
                {isExpanded ? (
                    <DockExpanded/>
                ) : (
                    <DockMinimized/>
                )}
            </AnimatePresence>
        </motion.div>
    </motion.div>
  )
}

export default DockWrapper