import React from 'react'
import PaletteItem from './PaletteItem'

const testItems = ['Notion', 'Linear', 'Claude', 'Gmail']

const PaletteContent = () => {
  return (
    <div className = "w-full bg-white p-4 flex flex-row">
        <div>
           {testItems.map((item, number) => {
              return(
                <div>
                    <PaletteItem
                    id = {item}
                    key = {item}
                    index = {number}
                    itemName={item}
                    />
                </div>
              )
           })}
        </div>
    </div>
  )
}

export default PaletteContent