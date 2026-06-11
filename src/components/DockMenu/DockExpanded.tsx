import React from 'react'
import DockNote from './DockNote'
import DockKanban from './DockKanban'

const mockNotes = [
    {
        title: 'test note 1',
        content: 'I wrote in a note',
        date: '06.02.26',
        id: 1
    },
    {
        title: 'test note 2',
        content: 'I wrote here',
        date: '06.01.26',
        id: 2
    },
]

const DockExpanded = () => {
  return (
    <div className = "flex flex-col w-full gap-2 p-4 rounded-lg shadow-md bg-gray-100/70">
        <div className = "flex flex-row items-center justify-between">
            <div className = "flex flex-col p-2 border border-gray-300 rounded-xl bg-white/50">
                <p className = "font-semibold text-gray-500">Recent Notes</p>
                <div className = "flex flex-col gap-1">
                    {mockNotes.map((mockNote) => (
                        <DockNote
                        key = {mockNote.id}
                        id = {mockNote.id}
                        title= {mockNote.title}
                        content = {mockNote.content}
                        date = {mockNote.date}
                        />
                    ))}
                </div>
            </div>
            <div className = "flex-col p-2 border border-gray-300 rounded-xl bg-white/50">
            
            </div>
        </div>
    </div>
  )
}

export default DockExpanded