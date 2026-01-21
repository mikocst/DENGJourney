import { useContext } from "react"
import { motion } from "motion/react";
import { PaletteContext } from "./PaletteContext"

const PaletteImgs = () => {
  const context = useContext(PaletteContext);
  if (!context) return null;

  return (
    <div className = "flex flex-col w-full h-48 rounded-lg bg-gray-100 p-2 overflow-y-hidden relative">
        <motion.div
        initial = {{y: 0}}
        animate= {{y: `${-(context.activeIndex * 20)}%`}}
        transition={{
        ease: 'easeOut',
        duration: context.direction === 'instant' ? 0 : 0.4}}
        className = "flex flex-col w-full"
        >
          {context?.filteredItems?.map((item, index) => (
            <div
             key = {item}
             className = "h-44 bg-red-300 rounded-md shrink-0">

            </div>
          ))}

          </motion.div>
    </div>
  )
}

export default PaletteImgs