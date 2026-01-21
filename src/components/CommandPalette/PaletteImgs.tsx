import { useContext } from "react"
import { PaletteContext } from "./PaletteContext"

const PaletteImgs = () => {
  const context = useContext(PaletteContext);

  const filteredLength = context?.filteredItems?.length;
  console.log(filteredLength)

  return (
    <div className = "flex flex-col justify-center items-center w-full h-full rounded-lg bg-gray-500 p-3 overflow-y-hidden relative">
        <div className = "w-full h-full m-2 bg-blue-500 rounded-md absolute"></div>
        <div className = "w-full h-full bg-green-500 rounded-md"></div>
        </div>
  )
}

export default PaletteImgs