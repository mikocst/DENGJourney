import PaletteItem from './PaletteItem'
import PaletteImgs from './PaletteImgs'
import { useContext } from 'react';
import { PaletteContext } from './PaletteContext';

const PaletteContent = () => {
  const context = useContext(PaletteContext);


  return (
    <div className = "w-full bg-white p-4 flex flex-row gap-2 rounded-b-lg">
        <div className = "w-full flex flex-col gap-2">
          {context?.filteredItems.map((item, index) => 
            <PaletteItem
              key={item}
              id={item}
              itemName={item}
              index={index}
              isSelected={index === context.activeIndex}
            />
          )
        }
        </div>
        <div className = "flex justify-center items-center w-full">
          <PaletteImgs/>
        </div>
    </div>
  )
}

export default PaletteContent