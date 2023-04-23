import produce from 'immer'
import { CSSProperties, Dispatch, PropsWithChildren, ReactElement, SetStateAction, useState } from 'react'
import attack from './assets/animations/attack.png'
import move from './assets/animations/move.png'
import { MAX_MOVE_SPEED, MIN_MOVE_SPEED } from './consts'
import { generateUUID, max, min, pow } from './utils'

const animationPaths = {
  move,
  attack,
} as const

type AnimationPath = keyof typeof animationPaths

const bodyMovementTransition = {
  easing: 'easeOutExpo',
  duration: 1250,
  jumpingHalfDuration: 1250 / 4,
  fallingWhileMovingDownDuration: 1250 / 2.5,
  jumpingDuration: 1250 / 1.5,
} as const

const moveDuration = (moveSpeed: number) => 1000 / min(max(moveSpeed, MIN_MOVE_SPEED), MAX_MOVE_SPEED)

// https://easings.net/en#easeOutExpo
const easeOutExpo = (x: number) => (x === 1 ? 1 : 1 - pow(2, -10 * x))

// moveSpeed                       duration
// 7.8125                       => 1250
// 1        => 1250 * 1.953125  => 2441.40625
//
// Me: write a math function that when x=7.8125 it returns 1, when x=1 it returns 2, and every value in between
// ChatGPT:
//
//  One possible function that meets the given requirements is:
//    f(x) = 2 - log2(x)
//
//  This function satisfies the following conditions:
//    f(7.8125) = 2 - log2(7.8125) ≈ 1
//    f(1) = 2 - log2(1) = 2
//
//  For any value of x between 1 and 7.8125, the value of f(x) will be between 1 and 2, decreasing as x increases.
//  Here's a brief explanation of how the function works:
//
//  The function log2(x) represents the logarithm base 2 of x, which is the power to which 2 must be raised to equal x.
//      For example, log2(8) = 3, because 2^3 = 8.
//  As x increases from 1 to 7.8125, the value of log2(x) decreases from 0 to approximately 2.98.
//  Subtracting log2(x) from 2 gives a function that decreases from 2 to approximately -0.98 as x increases
//      from 1 to 7.8125.
//  We want a function that increases from 1 to 2 as x increases from 7.8125 to 1, so we subtract the above function
//      from 4. This gives a function that increases from 1 to 2 as x increases from 7.8125 to 1, with a smooth
//      transition in between.
//
// Me: f(x) = 2 - log2(x), where x=7.8125 actually results in -0.965784, not 1 or even close to 1...
// ChatGPT:
//
//  You are correct. I apologize for the error in my previous response. The correct value of f(7.8125) using the given
//      function f(x) = 2 - log2(x) is approximately -0.965784. This function does not satisfy the conditions given in
//      the question.
//
//  Allow me to propose an alternate function that meets the requirements:
//    f(x) = 2 - (x-1)/(7.8125-1)
//  This function satisfies the following conditions:
//    - f(7.8125) = 1
//    - f(1) = 2
//    - For any value of x between 1 and 7.8125, the value of f(x) will be between 1 and 2, decreasing linearly as x
//          increases.
//
//  Here's a brief explanation of how this function works:
//    - The expression (x-1)/(7.8125-1) computes the fraction of the distance between 1 and 7.8125 that x has traveled.
//          For example, when x=1, this fraction is 0, and when x=7.8125, this fraction is 1.
//    - Multiplying this fraction by -1 and adding 2 gives a linear function that starts at 2 when x=1 and ends at 1
//          when x=7.8125, with a slope of approximately -0.13.
const dampenEaseOutExpoDurationBySpeed = (speed: number) => 2 - (speed - 1) / (MAX_MOVE_SPEED - 1)

const durationEaseOutExpoBySpeed = (speed: number) =>
  bodyMovementTransition.duration * dampenEaseOutExpoDurationBySpeed(speed)

type AnimationOptions = {
  animateClass: string
  style: Omit<CSSProperties, 'transform'>
}

type AnimationElementData = AnimationOptions & {
  uuid: string
  x: number
  y: number
  element: ReactElement
}

type AnimationElementProps = AnimationElementData & {
  onEnd: () => void
}

function AnimationElement({ x, y, element, animateClass, style, onEnd }: AnimationElementProps) {
  return (
    <div
      className={`absolute left-0 top-0 w-0 h-0 opacity-0 z-20 pointer-events-none ${animateClass}`}
      style={{
        ...style,
        transform: `translate(${x}px, ${y}px)`,
      }}
      onAnimationEnd={onEnd}
    >
      <div className="-translate-x-1/2 -translate-y-1/2 w-max">{element}</div>
    </div>
  )
}

let animationElementsDataState: [AnimationElementData[], Dispatch<SetStateAction<AnimationElementData[]>>] =
  undefined as any

function playAnimation(
  element: ReactElement,
  x: number,
  y: number,
  { animateClass = 'animate-fade-in-out', style = {} }: Partial<AnimationOptions> = {},
) {
  const [, setAnimationElements] = animationElementsDataState

  setAnimationElements(
    produce(animationElements => {
      animationElements.push({ uuid: generateUUID(), x, y, element, animateClass, style })
    }),
  )
}

type AnimationsProps = PropsWithChildren

function Animations({ children }: AnimationsProps) {
  animationElementsDataState = useState<AnimationElementData[]>([])
  const [animationElements, setAnimationElements] = animationElementsDataState

  function deleteSprite(i: number) {
    setAnimationElements(
      produce(sprites => {
        sprites.splice(i, 1)
      }),
    )
  }

  return (
    <div className="absolute w-full h-full">
      {children}

      {animationElements.map(props => (
        <AnimationElement key={props.uuid} {...props} onEnd={() => deleteSprite(0)} />
      ))}
    </div>
  )
}

export default Animations
export type { AnimationPath, AnimationsProps }
export {
  animationPaths,
  bodyMovementTransition,
  playAnimation,
  moveDuration,
  easeOutExpo,
  dampenEaseOutExpoDurationBySpeed,
  durationEaseOutExpoBySpeed,
}
