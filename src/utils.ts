import { DependencyList, useEffect } from 'react'
import seedrandom from 'seedrandom'
import { v5 } from 'uuid'

export const { log, warn, error } = console
export const { stringify, parse } = JSON
export const { min, max, abs, pow, sqrt, floor, ceil, PI, sin, cos } = Math
export const { keys, values, entries } = Object

const defaultRandom = () => Math.random()

const sleep = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const randomGenerator = (seed?: any) => (seed !== undefined ? seedrandom(`${seed}`) : defaultRandom)

const pickRandom = <T>(t: readonly T[], random = defaultRandom) => t[floor(t.length * random())]
const randomRange = (a: number, b: number, random = defaultRandom) => a + floor((b - a) * random())

const UUID_NAMESPACE = 'a1474fab-a831-4c59-9196-7bf3845f7a45'
const generateUUID = (random = defaultRandom) => v5(`${random()}`, UUID_NAMESPACE)

function useAnyInput(callback: () => void, deps?: DependencyList) {
  useEffect(() => {
    const onInput = (e: KeyboardEvent | MouseEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
      callback()
    }

    addEventListener('mouseup', onInput)
    addEventListener('keyup', onInput)
    return () => {
      removeEventListener('mouseup', onInput)
      removeEventListener('keyup', onInput)
    }
  }, deps)
}

const SWIPE_THRESHOLD = 3
function useScreenSwipe(onSwipe: (dir: 'up' | 'left' | 'down' | 'right') => void, deps?: DependencyList) {
  useEffect(() => {
    let originX = 0
    let originY = 0
    let swipeX = false
    let dist = 0

    const onTouchStart = (e: TouchEvent) => {
      dist = 0
      const touch = e.touches[0]!
      originX = touch.screenX
      originY = touch.screenY
    }

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]!
      const moveX = touch.screenX - originX
      const moveY = touch.screenY - originY
      if (abs(moveX) < SWIPE_THRESHOLD && abs(moveY) < SWIPE_THRESHOLD) return
      swipeX = abs(moveX) > abs(moveY)
      dist = swipeX ? moveX : moveY
    }

    const onTouchEnd = () => {
      if (!dist) return
      onSwipe(!swipeX && dist < 0 ? 'up' : swipeX && dist < 0 ? 'left' : !swipeX && dist > 0 ? 'down' : 'right')
    }

    document.body.addEventListener('touchstart', onTouchStart)
    document.body.addEventListener('touchmove', onTouchMove)
    document.body.addEventListener('touchend', onTouchEnd)
    return () => {
      removeEventListener('touchstart', onTouchStart)
      removeEventListener('touchmove', onTouchMove)
      removeEventListener('touchend', onTouchEnd)
    }
  }, deps)
}

const getImage = (path: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = path
  })

const createBlankCanvas = (width: number, height: number) => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  return [canvas, canvas.getContext('2d')] as const
}

const getImageCanvasData = async (path: string) => {
  const img = await getImage(path)

  const [canvas, ctx] = createBlankCanvas(img.naturalWidth, img.naturalHeight)
  ctx!.drawImage(img, 0, 0)

  return [canvas, ctx!.getImageData(0, 0, canvas.width, canvas.height)] as const
}

export {
  sleep,
  pickRandom,
  randomRange,
  generateUUID,
  randomGenerator,
  useAnyInput,
  useScreenSwipe,
  getImage,
  createBlankCanvas,
  getImageCanvasData,
}
