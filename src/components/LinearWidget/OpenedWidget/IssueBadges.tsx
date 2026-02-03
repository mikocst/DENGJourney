interface IssueBadgeProps {
    icon?: string;
    title: string;
}

const IssueBadges = ({icon, title}: IssueBadgeProps) => {
  return (
    <div className = "flex flex-row gap-1 border border-black/20 p-1 rounded-sm bg-gray-100/70">
        <div>
            {icon}
        </div>
        <p className = "text-xs text-black/80">{title}</p>
    </div>
  )
}

export default IssueBadges