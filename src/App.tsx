import produce from 'immer'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { usePrevious } from 'react-use'
import Animations from './Animations'
import Camera from './Camera'
import Monster from './Monster'
import Tile from './Tile'
import { musicChoices, playMusic, playSound } from './audio'
import { backgroundChoices, textureChoices, useBackground } from './graphics'
import { useStateWithLocalStorage } from './hooks'
import {
  MonsterProgressionMetadata,
  getEXPFromMonster,
  getMonsterHP,
  getMonsterLevel,
  monsterProgression,
} from './monsterProgression'
import { getEXPRequiredForLevel, getLevelByEXP, getPlayerDamage } from './playerEXP'
import { PhysicalBody } from './types'
import { floor, generateUUID, max, pickRandom, randomGenerator, randomRange, sleep, useAnyInput } from './utils'

function App() {
  const [exp, storeEXP] = useStateWithLocalStorage({ exp: 0 })

  const level = getLevelByEXP(exp)
  const map = floor(level / 7)

  const randomByMap = useMemo(() => randomGenerator(`map-${map}`), [map])

  const background = useMemo(() => pickRandom(backgroundChoices, randomByMap)!, [randomByMap])
  const backgroundSrc = useBackground(background)

  const texture = useMemo(() => pickRandom(textureChoices, randomByMap)!, [randomByMap])

  useEffect(() => {
    playMusic(pickRandom(musicChoices, randomByMap)!)
  }, [randomByMap])

  const expRequiredForLevel = getEXPRequiredForLevel(level)
  const expRequiredForNextLevel = getEXPRequiredForLevel(level + 1) - expRequiredForLevel
  const expFraction = (exp - expRequiredForLevel) / expRequiredForNextLevel
  const previousLevel = usePrevious(level) ?? level
  const levelUp = level > previousLevel

  const mapMonsterPool = useMemo(() => monsterProgression.slice(4 * map, 4 * map + 4), [map])
  const [monsterMetadata, setMonsterMetadata] = useState<MonsterProgressionMetadata | null>(null)
  const [monster, setMonster] = useState<PhysicalBody | null>(null)
  const { hp = 0 } = monster ?? {}

  const monsterLevel = monsterMetadata ? getMonsterLevel(monsterMetadata) : 0
  const monsterHPFraction = monsterMetadata ? max(0, hp) / getMonsterHP(monsterMetadata) : 0

  useEffect(() => {
    if (!monsterMetadata) {
      const monsterMetadata = pickRandom(mapMonsterPool)!
      setMonsterMetadata(monsterMetadata)
      setMonster({
        uuid: generateUUID(),
        sprite: monsterMetadata.monster,
        x: 0,
        xi: 0.5,
        y: 0,
        vx: 0,
        vy: 0,
        moveSpeed: 1.25,
        zIndex: 0,
        dir: -1,
        hp: getMonsterHP(monsterMetadata),
        exp: 0,
        faith: 1,
        attackSpeed: 1,
      })
    }
  }, [monsterMetadata])

  const clearMonster = useCallback(() => {
    setMonsterMetadata(null)
    setMonster(null)
  }, [])

  useAnyInput(() => {
    setMonster(
      produce(monster => {
        if (!monsterMetadata) return
        if (!monster) return

        let { hp } = monster

        if (hp > 0) {
          hp = hp - randomRange(1, getPlayerDamage(level))

          if (hp <= 0) {
            storeEXP(exp => exp + getEXPFromMonster(monsterMetadata))
            sleep(700).then(clearMonster)
          }
        }

        monster.hp = hp
      }),
    )
  }, [monsterMetadata, clearMonster, level])

  useEffect(() => {
    if (levelUp) {
      playSound('levelUp')
      toast(`Level ${level}`, { icon: '🎉' })
    }
  }, [levelUp])

  const bgElem = (
    <div className="absolute w-full h-full bg-center bg-cover" style={{ backgroundImage: `url(${backgroundSrc})` }} />
  )

  const uiMonsterHPElem = (
    <div className="absolute flex items-start w-full h-full pt-4">
      <div className="relative w-3/5 h-4 border-r-4 border-white left-[-2px] drop-shadow-pixel bg-white/50 border-y-4">
        <div
          className={`h-full transition-all ${
            monsterHPFraction > 0.5 ? 'bg-green-500' : monsterHPFraction > 0.2 ? 'bg-yellow-500' : 'bg-red-500'
          }`}
          style={{
            width: `${monsterHPFraction * 100}%`,
          }}
        />
      </div>
    </div>
  )

  const uiMonsterLevelElem = monsterLevel && (
    <div className="absolute flex items-start justify-start w-full h-full px-2 pt-10">
      <div className="flex gap-1">
        <div className="text-2xl font-bold text-white drop-shadow-pixel">LV</div>
        <div className="text-4xl font-bold text-white font-damage drop-shadow-pixel">{monsterLevel}</div>
      </div>
    </div>
  )

  const uiPlayerEXPElem = (
    <div className="absolute flex items-end justify-end w-full h-full pb-4">
      <div className="flex justify-end w-5/6 h-4 border-l-4 border-white drop-shadow-pixel bg-white/50 border-y-4">
        <div
          className="h-full transition-all bg-blue-500"
          style={{
            width: `${expFraction * 100}%`,
          }}
        />
      </div>
    </div>
  )

  const uiPlayerLevelElem = (
    <div className="absolute flex items-end justify-end w-full h-full px-8 pb-14">
      <div className="flex gap-1 scale-150">
        <div className="text-2xl font-bold text-white drop-shadow-pixel">LV</div>
        <div className="text-4xl font-bold text-white font-damage drop-shadow-pixel">{level}</div>
      </div>
    </div>
  )

  const uiElem = (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {uiMonsterHPElem}
      {uiMonsterLevelElem}
      {uiPlayerEXPElem}
      {uiPlayerLevelElem}
    </div>
  )

  return (
    <div className="absolute w-full h-full bg-black">
      {bgElem}

      <Camera>
        {monster && <Monster {...monster} />}
        <Tile w={1} h={4} texture={texture} />
        <Animations />
      </Camera>

      {uiElem}
    </div>
  )
}

export default App
