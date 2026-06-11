import React from 'react'

interface DockKanbanProps {
    title: string
    priority: "High" | "Low" | "None"
    tag: "Feature" | "Production" | "Revision"
    project: string
    createdAt: string
}

const DockKanban = ({title, priority, tag, project, createdAt}:DockKanbanProps) => {
  return (
    <div>
      <div className = "flex flex-col gap-1">
          <p className = "text-gray-500">{project}</p>
          {title}
      </div>
    </div>
  )
}

export default DockKanban