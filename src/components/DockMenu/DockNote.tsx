import React from 'react'

interface DockNoteProps {
    title: string;
    content:string;
    date: string;
}

const DockNote = ({title, content, date}: DockNoteProps) => {
  return (
    <div className = "flex flex-col w-full px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200/70">
        <p className = "text-gray-500">{title}</p>
        <div className = "flex flex-row gap-1">
            <p className = "font-medium text-gray-400/80">{date}:</p>
            <p className = "truncate text-gray-500/70 max-w-[20ch]">{content}</p>
        </div>
    </div>
  )
}

export default DockNote