import feather from 'feather-icons'

type FeatherIconName = keyof typeof feather.icons

interface IconProps {
  name: FeatherIconName
  size?: number | string
  className?: string
  strokeWidth?: number
}

const Icon = ({ name, size = 24, className, strokeWidth = 2 }: IconProps) => {
  const svg = feather.icons[name].toSvg({
    width: size,
    height: size,
    'stroke-width': strokeWidth,
    class: className,
  })

  return <span style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: svg }} />
}

export default Icon
