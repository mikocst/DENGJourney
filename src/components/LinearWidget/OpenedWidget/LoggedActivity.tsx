import React from 'react'

interface LoggedActivityProps {
    description: string;
    image?:string;
}

const LoggedActivity = ({description, image}: LoggedActivityProps) => {
  return (
    <div>
        <img src = {image}></img>
        <p className = "text-xs text-black/40">{description}</p>
    </div>
  )
}

export default LoggedActivity