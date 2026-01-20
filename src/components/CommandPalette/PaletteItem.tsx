import React, { useId } from 'react'

interface PaletteItemProps extends React.HTMLAttributes<HTMLDivElement> {
    id: string;
    itemName: string;
    index: number; 
    ref?: React.Ref<HTMLDivElement>
}

const PaletteItem = ({id,itemName, index,ref}: PaletteItemProps) => {

  const generatedId = useId();
  const itemId = id || generatedId
  const position = index + 1;

  return (
    <div
    key={itemId}
    ref = {ref}
    id = {itemId}
    data-index = {index}
    aria-posinset = {position}
    className = "cursor-pointer p-2 w-full hover:bg-gray-200/30 rounded-sm"
    >
        <p className = "text-sm text-gray-600">{itemName}</p>
    </div>
  )
}

export default PaletteItem