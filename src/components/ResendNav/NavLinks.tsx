import React from 'react'

interface NavLinksProps extends React.HTMLAttributes<HTMLUListElement> {
    id: string;
    name: string;

}

const NavLinks = ({id, name, ...props}: NavLinksProps) => {
  return (
        <li className = "cursor-pointer text-white/70" id={id}>{name}</li>
  )
}

export default NavLinks