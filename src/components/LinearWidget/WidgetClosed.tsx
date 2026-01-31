import { Circle, ChartNoAxesColumnIncreasing, Box } from "lucide-react"

const WidgetClosed = () => {
  return (
    <div className = "flex flex-col gap-1">
        <div className = "flex flex-row justify-between items-center">
            <p className = "text-black/50 text-sm">DEN-11</p>
            <div className = "p-2 rounded-4xl bg-gray-400"></div>
        </div>
        <div className = "flex flex-row items-center gap-1">
            <Circle className = "w-4 h-4 text-blue-700"/>
            <p className = "font-semibold text-black/70">Design Form</p>
        </div>
        <div>
            <div className = "flex flex-row w-auto gap-1">
                <div className = "border border-gray-400/50 p-1 rounded-md w-auto">
                    <ChartNoAxesColumnIncreasing className ="text-gray-400 w-3 h-3"/>
                </div>
                <div>
                    <div className = "flex flex-row items-center gap-1 border border-gray-400/50 p-1 rounded-md w-auto">
                        <Box className = "text-gray-400 w-3 h-3"/>
                        <p className = "text-xs text-black/40">Aster.Motion</p>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <p className = "text-xs text-black/40">Created Jan 30</p>
        </div>
    </div>
  )
}

export default WidgetClosed