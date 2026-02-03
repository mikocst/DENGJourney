import { useState } from "react"
import WidgetClosed from "./ClosedWidget/WidgetClosed";
import WidgetOpened from "./OpenedWidget/WidgetOpened";

const Widget = () => {

    const [isClosed, setIsClosed] = useState(false);

    const handleIsClosed = () => {
      setIsClosed(!isClosed)
    }

  return (
    <div className = "bg-gray-200/20 w-sm px-2 rounded-md border border-gray-300 h-auto">
        <WidgetOpened/>
    </div>
  )
}

export default Widget