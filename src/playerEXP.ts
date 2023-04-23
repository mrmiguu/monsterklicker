const baseEXPRequiredForNextLevel = 20
const expIncreaseNTimesPerLevel = 1.25

function getLevelByEXP(exp: number): number {
  let level = 1
  let expRequiredForNextLevel = baseEXPRequiredForNextLevel

  while (exp >= expRequiredForNextLevel) {
    level++
    exp -= expRequiredForNextLevel
    expRequiredForNextLevel *= expIncreaseNTimesPerLevel
  }

  return level
}

function getEXPRequiredForLevel(targetLevel: number): number {
  let totalExpRequired = 0
  let level = 1
  let expRequiredForNextLevel = baseEXPRequiredForNextLevel

  while (level < targetLevel) {
    totalExpRequired += expRequiredForNextLevel
    expRequiredForNextLevel *= expIncreaseNTimesPerLevel
    level++
  }

  return totalExpRequired
}

function getPlayerDamage(level: number) {
  return level ** 1.77
}

export { getLevelByEXP, getEXPRequiredForLevel, getPlayerDamage }
