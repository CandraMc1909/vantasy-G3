const cooldowns = new Map()
function checkCooldown(
  userId,
  command,
  cooldownTime
) {
  const key = `${userId}_${command}`
  const now = Date.now()
  const lastUse =
    cooldowns.get(key) || 0
  const remaining =
    (lastUse + cooldownTime) - now
  if (remaining > 0) {
    return {
      status: false,
      remaining
    }
  }
  cooldowns.set(key, now)
  return {
    status: true,
    remaining: 0
  }
}
module.exports = {
  checkCooldown
}