import Icon from '../Icon'

const DockMinimized = () => {
  return (
    <div
        className = "relative flex flex-row items-center justify-between w-full p-2 rounded-md shadow-sm bg-gray-100/70"
        >
            <Icon name='edit-3' size={"18px"} className = "text-gray-600 cursor-pointer "/>
            <Icon name='calendar' size = {"18px"} className = "text-gray-600 cursor-pointer "/>
            <Icon name='trello' size = {"18px"} className = "text-gray-600 cursor-pointer "/>
            <Icon name='cpu' size = {"18px"} className = "text-gray-600 cursor-pointer "/>
        </div>
  )
}

export default DockMinimized