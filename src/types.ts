import { Monster } from './graphics'

type PhysicalBody = {
  uuid: string
  sprite: Monster
  x: number
  xi: number
  y: number
  vx: -1 | 0 | 1
  vy: -1 | 0 | 1
  moveSpeed: number
  moveTimestamp?: number
  zIndex: number
  dir: -1 | 1
  hp: number
  exp: number
  faith: number
  attackSpeed: number
  attack?: boolean
  attackTimestamp?: number
  freefallTimestamp?: number
}

export type { PhysicalBody }
