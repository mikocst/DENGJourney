import React from 'react'

interface DockKanbanProps {
    title: string
    priority: "High" | "Low" | "None"
    tag: "Feature" | "Production" | "Revision"
    project: string
    createdAt: string
}

const DockKanban = () => {
  return (
    <div>DockKanban</div>
  )
}

export default DockKanban