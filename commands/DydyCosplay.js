const fs = require("fs");
const path = require("path");
const { checkCooldown } = require("../lib/cooldown");
module.exports = {
  execute: async (sock, from, msg) => {
    const user = msg.key.participant || msg.key.remoteJid;
    const cd = checkCooldown(user, "DydyCosplay", 2 * 24 * 60 * 60 * 1000);
    if (!cd.status) {
      return sock.sendMessage(from, {
        text: `⏳ Tunggu ${cd.text} lagi`,
      });
    }
    try {
      const data = JSON.parse(fs.readFileSync("./database/data/DydyCosplay.json"));
      const files = Object.keys(data);
      const random = files[Math.floor(Math.random() * files.length)];
      const info = data[random];
      const videoPath = path.join("./database/video/DydyCosplay", random);
      const caption = `${info.kategori}\n✦•┈┈┈❖* 𝕮𝖔𝖑𝖚𝖒𝖇𝖎𝖓𝖆 *❖┈┈┈•✦\n╭━━━〔 🎬 VIDEO 〕━━━╮\n│\n├ ✦ Judul :\n│ ${info.judul}\n│\n├ ✦ Sumber :\n│ ${info.sumber}\n│\n├ ✦ Creator :\n│ ${info.creator}\n│\n├ ✦ Url :\n│ ${info.url}\n│\n├ ✦ Deskripsi :\n│ ${info.deskripsi}\n╰━━━━━━━━━━━━━━╯\n ${info.id}\n  ✧･ﾟ: * 𝕮𝖔𝖑𝖚𝖒𝖇𝖎𝖓𝖆 *:･ﾟ✧`;
      await sock.sendMessage(from, {
        video: fs.readFileSync(videoPath),
        caption,
        gifPlayback: false,
      });
    } catch (err) {
      console.log("Video error:", err);
      await sock.sendMessage(from, {
        text: "❌ DydyCosplay gagal dikirim",
      });
    }
  },
};
