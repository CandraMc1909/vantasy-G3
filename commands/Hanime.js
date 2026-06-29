const fs = require("fs");
const path = require("path");
const { checkCooldown } = require("../lib/cooldown");
module.exports = {
  execute: async (sock, from, msg) => {
    const user = msg.key.participant || msg.key.remoteJid;
    const cd = checkCooldown(user, "Hanime", 60 * 60 * 1000);
    if (!cd.status) {
      return sock.sendMessage(from, {
        text: `⏳ Tunggu ${cd.text} lagi`,
      });
    }
    try {
      const database = JSON.parse(
        fs.readFileSync("./database/data/Hanime.json"),
      );
      const keys = Object.keys(database);
      const randomFile = keys[Math.floor(Math.random() * keys.length)];
      const data = database[randomFile];
      const image = path.join("./database/Hanime", randomFile);
      const caption = `  ${data.genre}\n✦•┈┈┈❖✧𝕮𝖔𝖑𝖚𝖒𝖇𝖎𝖓𝖆✧❖┈┈┈•✦\n☆━━━◇ ❖ Hanime ❖ ◇━━━☆\n│\n├─✦ Nama :\n│ ${data.nama}\n│\n├─✦ Sumber :\n│ ${data.sumber}\n│\n├─✦ Creator :\n│ ${data.creator}\n│\n├ ${data.url}\n│\n└────────────\n│ ${data.id}\n╰━❖✧･ﾟ: * 𝕮𝖔𝖑𝖚𝖒𝖇𝖎𝖓𝖆 *:･ﾟ✧❖━╯\n ${data.warning}`;
      await sock.sendMessage(from, {
        image: fs.readFileSync(image),
        caption,
      });
    } catch (err) {
      console.log("Hanime error", err);
    }
  },
};
