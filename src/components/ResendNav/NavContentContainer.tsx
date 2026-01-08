

const NavContentContainer = () => {
  return (
    <div className = "absolute top-12 background-blur border bg-white/5 border-white/20 flex flex-row gap-4 items-center p-4 rounded-lg">
        <div className = "flex flex-col gap-2">
            <ul>
                <li>Animation</li>
                <li>Design</li>
                <li>Development</li>
                <li>Experience</li>
            </ul>
        </div>
        <div className = "flex flex-col gap-2">
            <div className = "w-64 h-12 bg-white/20 rounded-md"></div>
            <div className = "w-64 h-12 bg-white/20 rounded-md"></div>
        </div>
    </div>
  )
}

export default NavContentContainer