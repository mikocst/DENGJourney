import React from 'react'
import Icon from '../Icon'

interface DockKanbanProps {
    title: string
    priority: "High" | "Low" | "None"
    tag: "Feature" | "Production" | "Revision"
    project: string
    createdAt: string
}

const DockKanban = ({title, priority, tag, project, createdAt}:DockKanbanProps) => {
  return (
    <div className = "flex flex-col">
      <div className = "flex flex-col gap-1">
          <p className = "text-gray-700">{title}</p>
      </div>
      <div className = "flex flex-row">
          <div className = "p-1 border border-gray-200">
              <Icon name='clock' size={'16px'} className = "text-red-400"/>
            </div>
          <div className = "p-1 border border-gray-200">
              <p>{project}</p>
            </div>
          <div className = "p-1 border border-gray-200">
              <p>{tag}</p>
            </div>
      </div>
      <p>{createdAt}</p>
    </div>
  )
}

export default DockKanban