import { ChartNoAxesColumnIncreasing, Box } from "lucide-react";
import IssueName from "./IssueName";
import IssueOverview from "./IssueOverview";
import IssueDate from "./IssueDate";

const WidgetClosed = () => {
  return (
    <div className = "flex flex-col gap-1">
        <IssueName/>
        <IssueOverview/>
        <div>
            <div className = "flex flex-row w-auto gap-1">
                <div className = "flex items-center border border-gray-400/50 p-1 rounded-md w-auto">
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
        <IssueDate/>
    </div>
  )
}

export default WidgetClosed