import { useState } from "react"
import WidgetClosed from "./WidgetClosed"

const Widget = () => {

    const [isClosed, setIsClosed] = useState(false)

  return (
    <div className = "bg-gray-200/50 w-sm px-2 py-4 rounded-md border border-gray-300 h-auto">
        <WidgetClosed/>
    </div>
  )
}

export default Widget