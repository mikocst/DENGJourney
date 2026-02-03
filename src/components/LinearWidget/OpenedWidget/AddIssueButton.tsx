import React from 'react'
import { Plus } from 'lucide-react'

const AddIssueButton = () => {
  return (
    <button className = "flex flex-row gap-1 items-center py-2 cursor-pointer">
      <Plus className = "w-4 h-4 text-black/40"/>
      <p className='text-xs text-black/40'>Add sub-issues</p>
    </button>
  )
}

export default AddIssueButton