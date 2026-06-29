module.exports.detect =
async (
  sock,
  event,
  db
) => {
  if (!event) return
  const groupId = event.id
  if (event.announce === true) {
    await sock.sendMessage(
      groupId,
      {
        text:
          "🔒 Grup ditutup admin"
      }
    )
  }
  if (event.announce === false) {
    await sock.sendMessage(
      groupId,
      {
        text:
          "🔓 Grup dibuka admin"
      }
    )
  }
}