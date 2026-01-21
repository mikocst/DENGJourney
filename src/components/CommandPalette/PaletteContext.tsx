import { createContext } from "react";

export interface PaletteContextProps {
  activeIndex: number;
  index: number;
  setIndex: (n:number) => void;
  isFiltering: boolean;
  direction: string;
  filteredItems: string[];
}

export const PaletteContext = createContext<PaletteContextProps | null>(null);