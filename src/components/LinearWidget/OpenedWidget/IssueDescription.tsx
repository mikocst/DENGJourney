import React from 'react'

const IssueDescription = () => {
  return (
    <div className = "flex flex-col gap-1">
        <h1 className = "text-lg font-semibold text-black/70">Design Component</h1>
        <textarea className = "w-full py-1 resize-none" 
          placeholder='Add description...'
          spellCheck = "true"
          rows={1}
          />
    </div>
  )
}

export default IssueDescription