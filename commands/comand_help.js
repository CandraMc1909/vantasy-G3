module.exports = {
  execute: async (
    sock,
    from,
    msg
  ) => {
    await sock.sendMessage(
      from,
      { text:` *˚₊·˚₊· ͟͟͞͞➳❥* Comand Help Menu\n*☆═━┈◈ ╰ v26.1.24 ╯ ◈┈━═☆* \n*│* \n*╰ ㊂ ▸▸ _help Menu_ ◂◂*\n*│* ┊\n*│* ┊▸ ✦ /generate_help\n*│* ┊▸ ✦ /claim\n*│* ┊▸ ✦ /video_help\n*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙ \n*│*\n*╰ ㊂ ▸▸✧･ﾟ: * 𝕮𝖔𝖑𝖚𝖒𝖇𝖎𝖓𝖆 *:･ﾟ✧◂◂*\n\n\n`},
      {
        quoted: msg
      }
    )
  }
}