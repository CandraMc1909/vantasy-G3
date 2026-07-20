const fs = require("fs")
const path = require("path")
const {
  checkCooldown
} = require("../lib/cooldown")
module.exports = {
  execute: async (sock, from, msg) => {
    try {
      const user =
        msg.key.participant ||
        msg.key.remoteJid
      const cd =
        checkCooldown(
          user,
          "NSFW",
          15 * 60 * 1000
        )
      if (!cd.status) {
        return sock.sendMessage(
          from,
          {
            text:
              `⏳ Tunggu ${cd.text} lagi`
          },
          {
            quoted: msg
          }
        )
      }
      const database =
        JSON.parse(
          fs.readFileSync(
            "./database/data/SFW.json"
          )
        )
      const list =
        Object.keys(database)
      const randomFile =
        list[
        Math.floor(
          Math.random() * list.length
        )
        ]
      const info =
        database[randomFile]
      const imagePath =
        path.join(
          "./database/media/NSFW",
          randomFile
        )
      await sock.sendMessage(
        from,
        {
          image:
            fs.readFileSync(imagePath),
          caption: `${info.genre}\n✦•┈❖✧･ﾟ: * 𝕮𝖔𝖑𝖚𝖒𝖇𝖎𝖓𝖆 *:･ﾟ✧❖┈•✦\n☆━━━◇ ❖ NSW ❖ ◇━━━☆\n│\n├─✦ Nama :\n│ ${info.nama}\n│\n├─✦ Sumber :\n│ ${info.sumber}\n│\n├─✦ Creator :\n│ ${info.creator}\n│\n├ ${info.url}\n│\n└────────────\n│ ${info.id}\n╰━❖✧･ﾟ: * 𝕮𝖔𝖑𝖚𝖒𝖇𝖎𝖓𝖆 *:･ﾟ✧❖━╯\n ${info.warning}`,
        },
        {
          quoted: msg
        }
      )
    } catch (err) {
      console.log(
        "Waifu Error:",
        err
      )
      await sock.sendMessage(
        from,
        {
          text:
            "❌ Gagal mengambil NSFW"
        },
        {
          quoted: msg
        }
      )
    }
  }
}