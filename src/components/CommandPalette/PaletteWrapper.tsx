import PaletteContent from "./PaletteContent"
import { useContext, useMemo, useState, useRef } from 'react';

interface PaletteContextProps {
  activeIndex: number;
  index: number;
  setIndex: (n:number) => void;
  direction: string;
  itemHeight: number;
  filteredItems: string[];
}

interface PalettteWrapperProps {
  itemHeight: number;
  filteredItems: string[];
}

const PaletteWrapper = ({ itemHeight}: PalettteWrapperProps) => {

const [input, setInput] = useState<string | null>(null);
const [index, setIndex] = useState<number>(0);
const [isFiltering, setIsFiltering] = useState<boolean>(false)
const prevIndexRef = useRef(0);

const direction = index === prevIndexRef.current ? null : (index > prevIndexRef.current ? 'down': 'up');
prevIndexRef.current = index;
const finalDirection = isFiltering ? 'instant' : direction;

const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
  setIndex(0);
  setIsFiltering(true);
  setInput(e.currentTarget.value)
}


  return (
    <div className ="flex flex-col w-full">
        <div className = "w-full relative">
            <div className ="w-6 h-6 bg-gray-300 rounded-lg absolute top-3 left-2"></div>
            <input
            onChange={handleInput}
            placeholder='Search for apps and commands'
            className = "bg-white rounded-t-lg w-full px-9 py-3 border-b border-gray-200"
            />
            <PaletteContent
            />
        </div>
    </div>
  )
}

export default PaletteWrapper