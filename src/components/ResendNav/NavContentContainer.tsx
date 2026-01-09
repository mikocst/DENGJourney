
interface NavContentContainerProps {
    activeTab: string | null;
    links?: string[] | null;
    cards?: { layout: string, title: string, description: string, link?: string}[] | null;
}

const NavContentContainer = ({ activeTab, links, cards }: NavContentContainerProps) => {
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
            {cards?.map((card) => (
                <div key={card.title} className = "w-64 h-auto bg-white/20 rounded-md flex flex-col justify-center p-2">
                    <h3 className = "font-bold">{card.title}</h3>
                    <p className = "text-sm">{card.description}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default NavContentContainer