module.exports = {
  execute: async (
    sock,
    from,
    msg
  ) => {
    await sock.sendMessage(
      from,
      { text:` *˚₊·˚₊· ͟͟͞͞➳❥* 𝕮𝖔𝖑𝖚𝖒𝖇𝖎𝖓𝖆 Menu\n*☆═━┈◈ ╰ v26.03.25 ╯ ◈┈━═☆* \n*│* \n*╰ ㊂ ▸▸ _Generate Menu_ ◂◂*\n*│* ┊\n*│* ┊▸ ✦ /generate_waifu\n*│* ┊▸ ✦ /generate_my_bini\n*│* ┊▸ ✦ /generate_my-kisah\n*│* ┊▸ ✦ /generate_[🔒]\n*│* ┊▸ ✦ /generate_[🔒]\n*│* ┊▸ ✦ /generate_[🔒]\n*│* ┊▸ ✦ /generate_[🔒]\n*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙ \n*│*\n*╰ ㊂ ▸▸✧･ﾟ: * 𝕮𝖔𝖑𝖚𝖒𝖇𝖎𝖓𝖆 *:･ﾟ✧◂◂*\n\n\n`},
      {
        quoted: msg
      }
    )
  }
}