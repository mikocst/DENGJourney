import { useContext } from "react"
import { motion } from "motion/react";
import { PaletteContext } from "./PaletteContext"

const PaletteImgs = () => {
  const context = useContext(PaletteContext);
  if (!context) return null;

  return (
    <div className = "flex flex-col w-full h-48 rounded-lg  p-2 overflow-y-hidden relative">
        <motion.div
        initial = {{y: 0}}
        animate= {{y: `${-(context.activeIndex * 192)}px`}}
        transition={{
        ease: 'easeOut',
        duration: context.direction === 'instant' ? 0 : 0.2}}
        className = "flex flex-col w-full"
        >
         {context?.filteredItems.map((item, index) => {
          const isActive = index === context.activeIndex;
          const imgSrc = context.manifest?.[item];

          return(
            <motion.div
            key={item}
            animate={{ 
              filter: isActive ? "blur(0px)" : "blur(6px)",
              opacity: isActive ? 1 : 0.4,
            }}
            transition={{
              duration: context.direction === 'instant' ? 0 : 0.3,
              ease: [0.2, 0, 0, 1]
            }}
            className="h-44 rounded-md shrink-0 mb-4 flex items-center justify-center overflow-hidden"
            >
              {imgSrc ? (
                <img 
                  src={imgSrc} 
                  alt={item} 
                  className="max-w-full max-h-full object-contain drop-shadow-xl rounded-md" 
                />
              ) : (
                <span className="text-gray-400 font-mono text-xs">{item}</span>
              )}
            </motion.div>
          )
          
         })}

          </motion.div>
    </div>
  )
}

export default PaletteImgs