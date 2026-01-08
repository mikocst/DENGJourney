import { motion } from 'motion/react'
import {useState} from 'react';
import NavLinks from './NavLinks';
import NavContentContainer from './NavContentContainer';

const NavMidLink =['Features', 'Agency', 'Resources', 'Help', 'Docs', 'Pricing'];

const ResendNav = () => {

  const [mouseEntering, setMouseEntering] = useState(false);
  
  function handleMouseEnter() {
    setMouseEntering(true);
    console.log("Mouse Entered");
  }

  function handleMouseLeave() {
    setMouseEntering(false);
    console.log("Mouse Left");
  }

  return (
    <header>
        <div className = "flex flex-row items-center justify-between p-2 bg-black/90 text-white relative">
            <h1 className = "font-bold">Logo</h1>
                <div
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}
                className = "flex flex-row items-center relative">
                    <ul className = "flex flex-row gap-4">
                        {NavMidLink.map((linkName, index) => (
                            <NavLinks key={index} id={`nav-link-${linkName}`} name={linkName} />                        
                    ))}
                    </ul>
                <NavContentContainer/>
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