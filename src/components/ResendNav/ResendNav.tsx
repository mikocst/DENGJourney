import { motion } from 'motion/react'
import {useState} from 'react';
import NavLinks from './NavLinks';
import NavContentContainer from './NavContentContainer';

type TabData = { links: string[] };
type NavConfig = Record<string, TabData>;

const FeaturesTab: TabData = {
    links: ['Animation', 'Design', 'Development', 'Experience'],
};

const AgencyTab: TabData = {
    links: ['About Us', 'Our Team', 'Careers', 'Contact'],
};

const ResourcesTab: TabData = {
    links: ['Blog', 'Case Studies', 'E-books', 'Webinars'],
};

const HelpTab: TabData = {
    links: ['Support Center', 'FAQs', 'Contact Us', 'Live Chat'],
};

const NavDATA : NavConfig = {
    Features: FeaturesTab,
    Agency: AgencyTab,
    Resources: ResourcesTab,
    Help: HelpTab,}

const ResendNav = () => {
   const [activeTab, setActiveTab] = useState<string | null>(null); 

   const handleActiveTab = (tabName: string) => {
        setActiveTab(tabName);
        console.log(`Active tab set to: ${tabName}`);
    }

    const handleMouseLeave = () => {
        setActiveTab(null);
        console.log('Active tab cleared');
    }

    const content = activeTab ? NavDATA[activeTab] : null;

  return (
    <header>
        <div className = "flex flex-row items-center justify-between p-2 bg-black/90 text-white relative">
            <h1 className = "font-bold">Logo</h1>
                <div className = "flex flex-row items-center relative"
                onMouseLeave={handleMouseLeave}
                >
                    <ul className = "flex flex-row gap-4">
                    {Object.keys(NavDATA).map((tabName) => (
                        <NavLinks
                        id = {tabName}
                        key={tabName}
                        name={tabName}
                        onMouseEnter={() => handleActiveTab(tabName)}
                        ></NavLinks>
                    ))}
                    </ul>
                { activeTab != null && (
                    <div className = "absolute top-12">
                        <NavContentContainer
                        activeTab={activeTab}
                        />
                    </div>
                )}
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