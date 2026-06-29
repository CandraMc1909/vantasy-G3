const fs = require('fs')
function getSender(msg) {
  // ambil ID user paling valid
  return msg.key.participant || msg.key.remoteJid
}
function formatNumber(jid) {
  return jid.replace(/[^0-9]/g, "") // ambil angka saja
}
function isOwner(msg) {
  const db = JSON.parse(fs.readFileSync('./database.json'))
  const sender = getSender(msg)
  const number = formatNumber(sender)
  return db.owner.includes(number)
}
module.exports = { isOwner }