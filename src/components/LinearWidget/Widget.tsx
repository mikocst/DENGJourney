import { useState } from "react"
import WidgetClosed from "./WidgetClosed"

const Widget = () => {

    const [isClosed, setIsClosed] = useState(false)

  return (
    <div className = "bg-gray-200 w-64 px-4 py-8 rounded-md border border-gray-300">
        <WidgetClosed/>
    </div>
  )
}

export default Widget