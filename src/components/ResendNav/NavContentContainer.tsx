
interface NavContentContainerProps {
    activeTab: string | null;
    links?: string[] | null;
}

const NavContentContainer = ({ activeTab, links }: NavContentContainerProps) => {
  return (
    <div className = "pointer-events-none background-blur border bg-white/5 border-white/20 flex flex-row gap-4 items-center p-4 rounded-lg">
        <div className = "flex flex-col gap-2">
            <ul>
                {links?.map((link,) => (
                    <li key = {link}>{link}</li>
                ))}
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