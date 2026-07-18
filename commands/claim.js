const fs = require("fs")
const {
  checkCooldown
} = require("../lib/cooldown")
module.exports = {
  execute: async (sock, from, msg) => {
    const user =
      msg.key.participant ||
      msg.key.remoteJid
    const cd =
      checkCooldown(
        user,
        "claim",
        24 * 60 * 60 * 1000
      )
    if (!cd.status) {
      return sock.sendMessage(
        from,
        {
          text:
            `⏳ Kamu sudah claim
Coba lagi:
${cd.text}`
        },
        {
          quoted: msg
        }
      )
    }
    try {
      const file =
        "./database/data/Token.json"
      let tokens =
        JSON.parse(
          fs.readFileSync(file)
        )
      if (tokens.length === 0) {
        return sock.sendMessage(
          from,
          {
            text:
              "❌ Token sedang habis"
          },
          {
            quoted: msg
          }
        )
      }
      const index =
        Math.floor(
          Math.random() * tokens.length
        )
      const reward =
        tokens[index]
      // hapus token setelah dipakai
      tokens.splice(
        index,
        1
      )
      fs.writeFileSync(
        file,
        JSON.stringify(
          tokens,
          null,
          2
        )
      )
      await sock.sendMessage(
        from,
        {
          text:
            `
🎁 RANDOM TOKEN CLAIM
🎟 Token:
${reward.token}
🏆 Hadiah:
${reward.hadiah}
📦 Jumlah:
${reward.jumlah}
📝 Deskripsi:
${reward.deskripsi}
⭐ Tipe:
${reward.tipe}
${reward.id}
✅ Status:
Berhasil Claim
⏳ Claim berikutnya:
24 Jam
🤖 VantasyBot
`
        },
        {
          quoted: msg
        }
      )
    } catch (err) {
      console.log(
        "Claim error:",
        err
      )
      await sock.sendMessage(
        from,
        {
          text:
            "❌ Claim gagal"
        },
        {
          quoted: msg
        }
      )
    }
  }
}