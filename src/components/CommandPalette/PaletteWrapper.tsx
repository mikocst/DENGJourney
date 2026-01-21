import PaletteContent from "./PaletteContent"
import { createContext, useState, useRef, useMemo } from 'react';

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

const PaletteContext = createContext<PaletteContextProps | null>(null);

const PaletteWrapper = ({ itemHeight, filteredItems}: PalettteWrapperProps) => {

const [input, setInput] = useState<string | null>(null);
const [index, setIndex] = useState<number>(0);
const [isFiltering, setIsFiltering] = useState<boolean>(false)
const prevIndexRef = useRef(0);

const direction = index === prevIndexRef.current ? null : (index > prevIndexRef.current ? 'down': 'up');
const finalDirection = isFiltering ? 'instant' : direction;
prevIndexRef.current = index;

const contextValue = useMemo(() => {
  return {
    activeIndex: index,
    index: index,
    setIndex: setIndex,
    direction: finalDirection || 'none',
    itemHeight: itemHeight,
    filteredItems: filteredItems
  }
}, [index, finalDirection, itemHeight])

const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
  setIndex(0);
  setIsFiltering(true);
  setInput(e.currentTarget.value)
}

const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
  console.log(e.key)
  if(e.key === "ArrowUp") {
    e.preventDefault();
    setIsFiltering(false);
    
    if(index > 0) {
      setIndex(prev => prev - 1);
    }
  }

  if(e.key === "ArrowDown") {
    e.preventDefault();
    setIsFiltering(false)

    if (index < filteredItems.length) {
      setIndex(prev => prev + 1);
    }
  }
}


  return (
    <div className ="flex flex-col w-full">
        <div className = "w-full relative">
            <div className ="w-6 h-6 bg-gray-300 rounded-lg absolute top-3 left-2"></div>
            <input
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder='Search for apps and commands'
            className = "bg-white rounded-t-lg w-full px-9 py-3 border-b border-gray-200"
            />
            <PaletteContext.Provider value = {
              contextValue
            }>
                <PaletteContent
              />
            </PaletteContext.Provider>
        </div>
    </div>
  )
}

export default PaletteWrapper