import anime from 'animejs'
import { useEffect, useMemo, useRef, useState } from 'react'
import { usePrevious } from 'react-use'
import { animationPaths, playAnimation } from './Animations'
import DamageFont from './DamageFont'
import { playSound } from './audio'
import { TILE_PX } from './consts'
import { useMonster } from './graphics'
import { PhysicalBody } from './types'
import { pickRandom, randomGenerator } from './utils'

const translateX = (x: number, xi: number) => (x + xi) * TILE_PX
const translateY = (y: number) => (y + 1) * TILE_PX

type MonsterSpriteProps = PhysicalBody

function MonsterSprite({ uuid, x, xi, y, dir, hp, sprite }: MonsterSpriteProps) {
  const dirRef = useRef<HTMLDivElement>(null)
  const bodyImgRef = useRef<HTMLImageElement>(null)

  const spriteSrc = useMonster(sprite)
  const oldHP = usePrevious(hp) ?? hp

  const [bodyImgHeight, setBodyImgHeight] = useState<number>()

  useEffect(() => {
    anime({
      targets: dirRef.current,
      scaleX: dir < 0 ? 1 : -1,
    })
  }, [dir])

  const breatheDelay = useMemo(() => {
    const random = randomGenerator(uuid)
    return -3 * random()
  }, [])

  useEffect(() => {
    if (hp < oldHP) {
      // playSound(pickRandom(['attack1', 'attack2', 'attack3', 'attack4', 'attack5'])!)
      playSound('attack')
      // playSound('attackCritical')

      const powSprite = (
        <div className={`-translate-y-12 ${pickRandom(['rotate-0', 'rotate-45', 'rotate-90', 'rotate-180'])}`}>
          <img className={`w-24 h-24 max-w-none contrast-200 animate-ping`} src={animationPaths.attack} />
        </div>
      )

      const damage = oldHP - hp

      const dmgFont = (
        <div className="relative -translate-y-24">
          <div className="relative animate-drift-up">
            <DamageFont value={damage} zIndex={0} gradient="normal" />
          </div>
        </div>
      )

      playAnimation(powSprite, translateX(x, xi), translateY(y))
      playAnimation(dmgFont, translateX(x, xi + (randomGenerator()() - 0.5) / 7), translateY(y) - bodyImgHeight!, {
        animateClass: 'animate-[fade-out_1250ms_ease-in]',
      })
    }
  }, [hp])

  const body = (
    <img
      ref={bodyImgRef}
      className={`relative z-[0] max-w-none origin-bottom transition-all duration-700 ${
        hp > 0 ? 'scale-[4]' : 'scale-x-[4] scale-y-0'
      }`}
      src={spriteSrc}
      onLoad={() => {
        const bodyImg = bodyImgRef.current!
        const { height } = bodyImg.getBoundingClientRect()
        setBodyImgHeight(height)
      }}
    />
  )

  return (
    <div
      className={`relative origin-bottom animate-breathe ${
        hp <= 0 && 'opacity-0 grayscale'
      } transition-opacity duration-700 pointer-events-none ${'text-[0]' /* inline-block fix */}`}
      style={{ animationDelay: `${breatheDelay}s` }}
    >
      <div ref={dirRef}>{body}</div>
    </div>
  )
}

export default MonsterSprite
export type { MonsterSpriteProps }
export { translateX, translateY }
