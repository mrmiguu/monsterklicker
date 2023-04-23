import { TILE_PX } from './consts'
import { Texture, useTexture } from './graphics'

type TileProps = {
  w: number
  h: number
  texture: Texture
}

function Tile({ w, h, texture }: TileProps) {
  const textureSrc = useTexture(texture)
  const texturePx = TILE_PX / 4

  const tileTop = (
    <div
      className="absolute left-0 top-0 -translate-y-1/2 w-full border-4 border-black"
      style={{
        height: `${texturePx / 2}px`,
        backgroundSize: `${texturePx}px ${texturePx / 2}px`,
        backgroundImage: `url(${textureSrc})`,
      }}
    />
  )

  const tileSide = (
    <div
      className="relative w-full h-full border-b-4 border-x-4 border-black brightness-50"
      style={{
        backgroundSize: `${texturePx}px ${texturePx}px`,
        backgroundImage: `url(${textureSrc})`,
      }}
    />
  )

  return (
    <div
      className="absolute left-0 top-0"
      style={{
        // boxShadow: '0 5px 5px black',
        transform: `translate(${0 * TILE_PX}px, ${1 * TILE_PX}px)`,
        width: `${w * TILE_PX}px`,
        height: `${h * TILE_PX}px`,
        // backgroundColor: color,
      }}
    >
      {tileSide}
      {tileTop}
    </div>
  )
}

export default Tile
