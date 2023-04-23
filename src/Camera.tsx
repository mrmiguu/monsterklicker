import { ReactNode, useRef } from 'react'
import { TILE_PX } from './consts'
import { useElementSize } from './hooks'

type CameraProps = {
  children: ReactNode
}

const Camera: React.FC<CameraProps> = ({ children }) => {
  const tiles = 1.25
  const tilesPx = tiles * TILE_PX

  const wrapperRef = useRef<HTMLDivElement>(null)
  const xyRef = useRef<HTMLDivElement>(null)
  const { width: wPx, height: hPx } = useElementSize(wrapperRef)

  const centerX = 0
  const centerY = 0

  const scale = wPx < hPx ? wPx / tilesPx : hPx / tilesPx

  return (
    <div ref={wrapperRef} className="relative h-full w-full flex justify-center items-center overflow-hidden">
      <div
        className="relative shrink-0"
        style={{
          width: `${tilesPx}px`,
          height: `${tilesPx}px`,
          transform: `scale(${scale})`,
        }}
      >
        <div
          ref={xyRef}
          className="absolute w-full h-full"
          style={{
            transform: `translate(${(-centerX + tiles / 2 - 0.5) * TILE_PX}px, ${
              (-centerY + tiles / 2 - 0.5) * TILE_PX
            }px)`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default Camera
