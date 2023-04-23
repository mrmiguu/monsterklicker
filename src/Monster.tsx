import anime from 'animejs'
import { useEffect, useRef } from 'react'
import { usePrevious } from 'react-use'
import { animationPaths, bodyMovementTransition, playAnimation } from './Animations'
import MonsterSprite, { translateX, translateY } from './MonsterSprite'
import { playSound } from './audio'
import { TILE_PX } from './consts'
import { PhysicalBody } from './types'

type MonsterProps = PhysicalBody

function Monster(props: MonsterProps) {
  const { x, xi, y, moveSpeed, zIndex, dir, hp, attackTimestamp } = props

  const oldX = usePrevious(x) ?? x
  const oldXi = usePrevious(xi) ?? xi
  const oldY = usePrevious(y) ?? y
  const oldDir = usePrevious(dir) ?? dir
  const oldHP = usePrevious(hp) ?? hp
  const xyRef = useRef<HTMLDivElement>(null)
  const jumpRef = useRef<HTMLDivElement>(null)

  const movingDown = y > oldY
  const movingHorizontally = x !== oldX || xi !== oldXi || dir !== oldDir

  const onJump = () => {
    playSound('jump', { volume: 0.1 })
  }

  const onLand = () => {
    playSound('land', { volume: 0.1 })
    playAnimation(
      <div className="relative w-48 h-12 -translate-y-6 overflow-hidden">
        <img
          className="absolute w-24 h-24 max-w-none grayscale contrast-200 translate-x-[8px] -scale-x-100"
          src={animationPaths.move}
        />
        <img
          className="absolute w-24 h-24 max-w-none grayscale contrast-200 translate-x-[88px]"
          src={animationPaths.move}
        />
      </div>,
      translateX(x, xi),
      translateY(y),
    )
  }

  useEffect(() => {
    anime({
      targets: xyRef.current,
      translateX: {
        value: translateX(x, xi),
        duration: 0, //durationEaseOutExpoBySpeed(moveSpeed),
      },
      translateY: {
        value: translateY(y),
        easing: movingDown ? 'easeInQuad' : undefined,
        duration: 0 /* movingDown
          ? bodyMovementTransition.jumpingHalfDuration + bodyMovementTransition.fallingWhileMovingDownDuration
          : undefined, */,
      },
      ...bodyMovementTransition,
    })
  }, [x, xi, y, moveSpeed])

  // useEffect(() => {
  //   if (hp < oldHP) {
  //     // playSound(pickRandom(['attack1', 'attack2', 'attack3', 'attack4', 'attack5'])!)
  //     playSound('attack')
  //     // playSound('attackCritical')

  //     const powSprite = (
  //       <div className="-translate-y-12">
  //         <img className={`w-24 h-24 max-w-none contrast-200 animate-ping`} src={animationPaths.attack} />
  //       </div>
  //     )

  //     const damage = oldHP - hp

  //     const dmgFont = (
  //       <div className="relative -translate-y-40">
  //         <div className="relative animate-drift-up">
  //           <DamageFont value={damage} zIndex={0} gradient="normal" />
  //         </div>
  //       </div>
  //     )

  //     playAnimation(powSprite, translateX(x, xi), translateY(y))
  //     playAnimation(dmgFont, translateX(x, xi), translateY(y), { animateClass: 'animate-[fade-out_1s_ease-in]' })
  //   }
  // }, [hp])

  const jumpAnimDoneRef = useRef(true)
  const onJumpRef = useRef(onJump)
  const onLandRef = useRef(onLand)
  onJumpRef.current = onJump
  onLandRef.current = onLand

  useEffect(() => {
    if (!jumpAnimDoneRef.current) return
    anime({
      targets: jumpRef.current!,
      keyframes: [
        { translateY: -0.2 * TILE_PX, easing: 'easeOutQuad', duration: bodyMovementTransition.jumpingHalfDuration },
        {
          translateY: 0,
          easing: 'easeInQuad',
          duration: movingDown
            ? bodyMovementTransition.fallingWhileMovingDownDuration
            : bodyMovementTransition.jumpingHalfDuration,
        },
      ],
      begin() {
        onJumpRef.current()
        jumpAnimDoneRef.current = false
      },
      complete() {
        onLandRef.current()
        jumpAnimDoneRef.current = true
      },
    })
  }, [y, attackTimestamp])

  useEffect(() => {
    if (movingHorizontally && jumpAnimDoneRef.current) {
      playSound('move', { volume: 0.1 })
      playAnimation(
        <div className={`w-24 h-12 -translate-y-6 overflow-hidden ${dir < 0 ? 'translate-x-6' : '-translate-x-6'}`}>
          <img
            className={`w-full h-24 max-w-none grayscale contrast-200 ${dir < 0 ? 'scale-x-100' : '-scale-x-100'}`}
            src={animationPaths.move}
          />
        </div>,
        translateX(oldX, oldXi),
        translateY(oldY),
      )
    }
  }, [movingHorizontally])

  return (
    <div ref={xyRef} className="absolute w-0 h-0 left-0 top-0 z-10">
      <div ref={jumpRef} className="w-0 h-0 left-0 top-0 flex justify-center items-end">
        <MonsterSprite {...props} />
      </div>
    </div>
  )
}

export default Monster
export type { MonsterProps }
