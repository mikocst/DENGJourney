import PaletteContent from "./PaletteContent"
import { createContext, useState, useRef, useMemo } from 'react';
import { PaletteContext } from "./PaletteContext";



interface PalettteWrapperProps {
  filteredItems: string[];
}



const PaletteWrapper = ({ filteredItems}: PalettteWrapperProps) => {

const [input, setInput] = useState<string>('');
const [index, setIndex] = useState<number>(0);
const [isFiltering, setIsFiltering] = useState<boolean>(false)
const prevIndexRef = useRef(0);

const filtered = useMemo(() => {
  if (!input.trim()) return filteredItems;
  return filteredItems.filter(item => 
    item.toLowerCase().includes(input.toLowerCase())
  );
}, [input, filteredItems]);

const direction = index === prevIndexRef.current ? null : (index > prevIndexRef.current ? 'down': 'up');
const finalDirection = isFiltering ? 'instant' : direction;
prevIndexRef.current = index;

const contextValue = useMemo(() => {
  return {
    activeIndex: index,
    index: index,
    setIndex: setIndex,
    direction: finalDirection || 'none',
    isFiltering: isFiltering,
    filteredItems: filtered
  }
}, [index, finalDirection, isFiltering, filteredItems, filtered])

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

    if (index < filteredItems.length - 1) {
      setIndex(prev => prev + 1);
    }
  }
}


  return (
    <PaletteContext.Provider value = {
              contextValue
            }>
    <div className ="flex flex-col w-full">
        <div className = "w-full relative">
            <div className ="w-6 h-6 bg-gray-300 rounded-lg absolute top-3 left-2"></div>
            <input
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder='Search for apps and commands'
            className = "bg-white rounded-t-lg w-full px-9 py-3 border-b border-gray-200"
            />
                <PaletteContent
              />
        </div>
    </div>
    </PaletteContext.Provider>
  )
}

export default PaletteWrapper