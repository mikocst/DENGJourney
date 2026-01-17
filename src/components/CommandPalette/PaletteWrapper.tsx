

const PaletteWrapper = () => {
  return (
    <div className ="flex flex-col w-full">
        <div className = "w-full relative">
            <div className ="w-6 h-6 bg-gray-300 rounded-lg absolute top-3 left-2"></div>
            <input
            placeholder='Search for apps and commands'
            className = "bg-white rounded-md w-full px-9 py-3"
            />
        </div>
    </div>
  )
}

export default PaletteWrapper