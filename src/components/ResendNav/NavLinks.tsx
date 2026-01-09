import React from 'react'

interface NavLinksProps {
    id: string;
    name: string;
    activeTab?: string | null
    
    onMouseEnter?: () => void;
    onMouseLeave?: () => void; 
}

const NavLinks = ({id, name, onMouseEnter, onMouseLeave}: NavLinksProps) => {
  return (
        <li
        className = "cursor-pointer text-white/70 hover:text-white"
        id={id}
        onMouseEnter= {onMouseEnter}
        onMouseLeave={onMouseLeave}
        >
            {name}
        </li>
  )
}

export default NavLinks