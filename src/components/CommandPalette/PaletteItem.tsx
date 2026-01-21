interface PaletteItemProps extends React.HTMLAttributes<HTMLDivElement> {
    id: string;
    itemName: string;
    index: number; 
    isSelected: boolean;
}

const PaletteItem = ({id,itemName, index, isSelected}: PaletteItemProps) => {

  const itemId = id || itemName
  const position = index + 1;

  return (
    <div
    id = {itemId}
    data-index = {index}
    aria-posinset = {position}
    className = {`cursor-pointer p-2 w-full rounded-sm transition-colors duration-150 ${isSelected ? 'bg-blue-100/50' : 'hover:bg-gray-200/30'}`}
    >
        <p className = {`text-sm ${isSelected ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
          {itemName}</p>
    </div>
  )
}

export default PaletteItem