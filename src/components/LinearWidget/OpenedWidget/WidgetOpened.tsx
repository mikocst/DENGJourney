import React from 'react'
import IssueBadges from './IssueBadges'
import IssueDescription from './IssueDescription'
import AddIssueButton from './AddIssueButton'
import ActivityLog from './ActivityLog'

const WidgetOpened = () => {
  return (
    <div className = "flex flex-col gap-1">
      <div className = "flex flex-row gap-2 border-b border-black/20 py-2">
        <IssueBadges
        title='Hi'
        />
        <IssueBadges
        title='Hello'
        />
      </div>
        <div className = "flex flex-col gap-1 border-b border-black/20">
          <IssueDescription/>
          <AddIssueButton/>
        </div>
        <ActivityLog/>
    </div>
  )
}

export default WidgetOpened