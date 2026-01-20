import PaletteItem from './PaletteItem'
import PaletteImgs from './PaletteImgs'

const firstItem = "Notion";
const secondItem = "Linear";
const thirdItem = "Claude";
const fourthItem = "Gmail";

const PaletteContent = () => {
  return (
    <div className = "w-full bg-white p-4 flex flex-row gap-2">
        <div className = "w-full flex flex-col gap-2">
           <PaletteItem
            id =  {firstItem}
            index = {0}
            itemName={firstItem}
            />
            <PaletteItem
            id =  {secondItem}
            index = {1}
            itemName={secondItem}
            />
            <PaletteItem
            id =  {thirdItem}
            index = {2}
            itemName={thirdItem}
            />
            <PaletteItem
            id =  {fourthItem}
            index = {3}
            itemName={fourthItem}
            />
        </div>
        <div className = "flex justify-center items-center w-full">
          <PaletteImgs/>
        </div>
    </div>
  )
}

export default PaletteContent