const fs = require("fs");
const { checkCooldown } = require("../lib/cooldown");
module.exports = {
  execute: async (sock, from, msg) => {
    const user = msg.key.participant || msg.key.remoteJid;
    const cd = checkCooldown(user, "claim", 24 * 60 * 60 * 1000);
    if (!cd.status) {
      return sock.sendMessage(from, {
        text: `⏳ claim cooldown tersisa\n${cd.text} lagi\n harap bersabar `,
      });
    }
    try {
      const file = "./database/data/Token.json";
      let tokens = JSON.parse(fs.readFileSync(file));
      if (tokens.length === 0) {
        return sock.sendMessage(from, {
          text: "❌ Token habis",
        });
      }
      const index = Math.floor(Math.random() * tokens.length);
      const reward = tokens[index];
      // hapus token setelah diambil
      tokens.splice(index, 1);
      fs.writeFileSync(file, JSON.stringify(tokens, null, 2));
      await sock.sendMessage(from, {
        text: ` *˚₊·˚₊· ͟͟͞͞➳❥* 𝕮𝖔𝖑𝖚𝖒𝖇𝖎𝖓𝖆\n*☆═━┈◈ ╰ v26.03.25 ╯ ◈┈━═☆* \n*│* \n*╰ ㊂ ▸▸ _🎁 RANDOM TOKEN_ ◂◂*\n*│* ┊\n*│* ┊▸ ✦ _🎟 Token:_\n*│* ┊ ${reward.token}\n*│* ┊▸ ✦ 🏆 Hadiah:\n*│* ┊ ${reward.hadiah}\n*│* ┊▸ ✦ 📦 Jumlah:\n*│* ┊${reward.jumlah}\n*│* ┊▸ ✦ 📝 Deskripsi:\n*│* ┊${reward.deskripsi}\n*│* ┊▸ ✦ ⭐ Tipe:\n*│* ┊${reward.tipe}\n*│* ┊▸ ✦ ✅ Status:\n*│* ┊Berhasil Claim\n*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙ \n*│*\n*╰ ㊂ ▸▸✦•┈❖✧･ﾟ: * 𝕮𝖔𝖑𝖚𝖒𝖇𝖎𝖓𝖆 *:･ﾟ✧❖┈•✦◂◂*\n\n`,
      });
    } catch (err) {
      console.log("Claim Error:", err);
    }
  },
};
