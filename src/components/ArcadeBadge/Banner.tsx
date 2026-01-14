import { color, motion } from 'motion/react'
import {useState} from 'react'

const variants = {
    hovering: (isHovering: boolean) => {
      return {
        opacity: isHovering === true ? 0.7 : 1
      }
    }
  }

const Banner = () => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleHoverIn = () => {
    setIsHovering(true)
  }

  const handleHoverOut = () => {
    setIsHovering(false)
  }

  return (
    <motion.div
    onMouseEnter={handleHoverIn}
    onMouseLeave={handleHoverOut}
    className = "bg-white/15 px-4 py-2 rounded-lg text-white cursor-pointer font-medium flex flex-row justify-center items-center gap-4"
    >
        <motion.p
        custom={isHovering}
        variants={variants}
        animate = "hovering"
        >
          This is a banner with some text.
        </motion.p>
        <button className = "py-1 px-2 bg-white/20 rounded-lg border border-white cursor-pointer font-semibold">Join Newsletter</button>
    </motion.div>
  )
}

export default Banner