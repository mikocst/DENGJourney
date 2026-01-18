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
    className = "cursor-pointer py-2 w-full"
    >
        <p>{itemName}</p>
    </div>
  )
}

export default PaletteItem