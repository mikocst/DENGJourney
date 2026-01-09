import {type Variants} from 'framer-motion';
import { motion, AnimatePresence } from 'motion/react'

interface NavContentContainerProps {
    activeTab: string | null;
    links?: string[] | null;
    cards?: { layout: string, title: string, description: string, link?: string}[] | null;
    direction: number;
    variants: Variants;
}

const NavContentContainer = ({ activeTab, links, cards, direction, variants }: NavContentContainerProps) => {
  return (
        <motion.div 
        layout
        className = "pointer-events-auto overflow-x-hidden background-blur border bg-white/5 border-white/20 flex flex-row gap-4 items-center p-4 rounded-lg">
            <AnimatePresence
            mode='popLayout'
            custom={direction}
            >
                <motion.div
                    key={activeTab}
                    custom={direction}
                    variants={variants}
                    initial="left" 
                    animate="center"
                    exit="right"
                    transition={{ ease: "easeInOut", duration: 0.3 }}
                    className = "flex flex-row gap-8 w-[70%]"
                >
                    <div className = "flex flex-col gap-2">
                        <ul>
                            {links?.map((link,) => (
                                <li key = {link}>{link}</li>
                            ))}
                        </ul>
                    </div>
                    <div className = "flex flex-col gap-2">
                        {cards?.map((card) => (
                            <div key={card.title} className = "w-64 h-auto bg-white/20 rounded-md flex flex-col justify-center p-2">
                                <h3 className = "font-bold">{card.title}</h3>
                                <p className = "text-sm">{card.description}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </motion.div>
  )
}

export default NavContentContainer