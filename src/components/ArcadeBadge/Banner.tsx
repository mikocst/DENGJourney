import { color, motion } from 'motion/react'

const textVariants = {
    base: {opacity: 1},
    active: {opacity: 0.7}
  }

const buttonVariants = {
    base: {opacity: 1, scale: .97},
    active: {opacity: 0.7, scale: 1.05}
}

const Banner = () => {

  return (
    <motion.div
    whileHover={"active"}
    className = "bg-white/15 px-4 py-2 rounded-lg text-white cursor-pointer font-medium flex flex-row justify-center items-center gap-4 border border-white/10 shadow-lg shadow-white/10"
    >
        <motion.p
        variants={textVariants}
        >
          This is a banner with some text.
        </motion.p>
        <motion.button
         variants = {buttonVariants}
         className = "py-1 px-2 bg-white/20 rounded-lg border border-white cursor-pointer font-semibold">
          Join Newsletter
        </motion.button>
    </motion.div>
  )
}

export default Banner