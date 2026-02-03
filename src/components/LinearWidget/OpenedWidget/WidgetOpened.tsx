import React from 'react'
import { Plus } from 'lucide-react'

const WidgetOpened = () => {
  return (
    <div className = "flex flex-col gap-1">
        <div className = "flex flex-col gap-1">
          <h1 className = "text-lg font-semibold text-black/70">Design Component</h1>
          <textarea className = "w-full py-1 resize-none" 
          placeholder='Add description...'
          spellCheck = "true"
          rows={1}
          />
            <button className = "flex flex-row gap-1 items-center py-2 cursor-pointer">
              <Plus className = "w-4 h-4 text-black/40"/>
              <p className='text-xs text-black/40'>Add sub-issues</p>
            </button>
        </div>
    </div>
  )
}

export default WidgetOpened