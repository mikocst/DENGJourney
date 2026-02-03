import Comments from "./Comments"

const ActivityLog = () => {
  return (
    <div className = "flex flex-col gap-1 w-full">
        <div className = "flex flex-row justify-between items-center">
            <h2>Activity</h2>
            <div className = "flex flex-row gap-4 justify-center items-center">
                <p className = "text-xs text-black/40">Unsubscribe</p>
                <div className = "bg-gray-200 w-4 h-4 rounded-lg "></div>
            </div>
        </div>
        <div>
            <p>Activity Log Component</p>
        </div>
        <Comments/>
    </div>
  )
}

export default ActivityLog