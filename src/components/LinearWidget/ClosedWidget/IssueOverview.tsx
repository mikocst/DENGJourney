import Icon from "../../Icon"

const IssueOverview = () => {
  return (
    <div className = "flex flex-row items-center gap-1">
            <Icon name='circle' className = "w-4 h-4 text-blue-700"/>
            <p className = "font-semibold text-black/70">Design Form</p>
        </div>
  )
}

export default IssueOverview