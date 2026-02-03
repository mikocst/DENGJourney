import React from 'react'

const IssueDate = () => {
  const dateOfIssue = new Date().toDateString();

  return (
    <div>
      <p className = "text-xs text-black/40">
            {dateOfIssue}
      </p>
    </div>
  )
}

export default IssueDate