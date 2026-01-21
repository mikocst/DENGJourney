import { createContext } from "react";

export interface Dictionary<T> {
  [key: string]: T
}

export interface PaletteContextProps {
  activeIndex: number;
  index: number;
  setIndex: (n:number) => void;
  isFiltering: boolean;
  direction: string;
  manifest: Dictionary<string>
  filteredItems: string[];
}

export const PaletteContext = createContext<PaletteContextProps | null>(null);