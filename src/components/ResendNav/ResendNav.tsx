import { motion, AnimatePresence } from 'motion/react'
import {useState} from 'react';
import NavLinks from './NavLinks';
import NavContentContainer from './NavContentContainer';
import { filter } from 'motion/react-client';

type CardData = { layout: string, title: string, description: string, link?: string};
type Cards = CardData[];
type TabData = { links: string[], cards: Cards };
type NavConfig = Record<string, TabData>;

const FeaturesTab: TabData = {
    links: ['Animation', 'Design', 'Development', 'Experience'],
    cards: [
        { layout: "card", title: "Animation", description: "Create stunning animations with our tools.", link: "Animation" },
        { layout: "card", title: "Design", description: "Design beautiful interfaces with our templates.", link: "Templates" },
    ]
};

const AgencyTab: TabData = {
    links: ['About', 'Team', 'Careers', 'Contact'],
    cards: [
        { layout: "card", title: "About Us", description: "Learn more about our agency and mission.", link: "About" },
        { layout: "card", title: "Careers", description: "Join our team and build your career with us.", link: "Careers" },
    ]
};

const ResourcesTab: TabData = {
    links: ['Blog', 'Case Studies', 'E-books', 'Webinars'],
    cards: [
        { layout: "card", title: "Blog", description: "Read our latest articles and insights.", link: "Blog" },
    ]
};

const HelpTab: TabData = {
    links: ['Support', 'FAQs', 'Contact'],
    cards: [
        { layout: "card", title: "Support", description: "Get help and support for our products.", link: "Support" },
    ]
};

const NavDATA : NavConfig = {
    Features: FeaturesTab,
    Agency: AgencyTab,
    Resources: ResourcesTab,
    Help: HelpTab,}

const ResendNav = () => {
   const [activeTab, setActiveTab] = useState<string | null>(null); 
   const [direction, setDirection] = useState<number>(0);
   const [prevIndex, setPrevIndex] = useState<number>(-1);

    const tabVariants = {
        left: (direction: number) => {
            return {
                x: direction > 0 ? 50 : -50,
                opacity: 0,
                filter: "blur(5px)"
            }
        },
        center: (direction: number) => {
            return {
                x: 0,
                opacity: 1,
                filter: "blur(0px)"
            }
        },
        right: (direction: number) => {
            return {
                x: direction < 0 ? 50 :-50,
                opacity: 0,
                filter: "blur(5px)"
            }
        }
    }

    const handleTabAnimation = (index: number, tabName: string) => {
        if (prevIndex !== -1) {
            const newDirection = index > prevIndex ? 1 : -1;
            setDirection(newDirection);
        }
        setPrevIndex(index);
        setActiveTab(tabName);
    }

    const handleMouseLeave = () => {
        setActiveTab(null);
        console.log('Active tab cleared');
    }

    const content = activeTab ? NavDATA[activeTab] : null;

  return (
    <header>
        <div className = "flex flex-row items-center justify-between bg-black/90 text-white relative">
            <h1 className = "font-bold">Logo</h1>
                <div className = "flex flex-row items-center relative p-3"
                onMouseLeave={handleMouseLeave}
                >
                    <ul className = "flex flex-row gap-4">
                    {Object.keys(NavDATA).map((tabName, index) => (
                        <NavLinks
                        id = {tabName}
                        key={tabName}
                        name={tabName}
                        onMouseEnter={() => handleTabAnimation(index, tabName)}
                        ></NavLinks>
                    ))}
                    </ul>
                <AnimatePresence mode='wait'>
                { activeTab != null && (
                        <motion.div className = "absolute top-12"
                        initial = {{opacity: 0, y: -10}}
                        animate = {{opacity: 1, y: 0}}
                        exit = {{opacity: 0, y: -10}}
                        transition = {{duration: 0.2}}
                        >
                                <NavContentContainer
                                activeTab={activeTab}
                                direction={direction}
                                variants={tabVariants}
                                links={content?.links}
                                cards={content?.cards}
                                />
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
            <div className = "flex flex-row items-center gap-4">
                <a className = "cursor-pointer">Login</a>
                <button className = "cursor-pointer py-2 px-4 bg-black/20 rounded-md border border-white/30 hover:bg-white/20">
                    Get Started
                </button>
            </div>
        </div>
    </header>
  )
}

export default ResendNav