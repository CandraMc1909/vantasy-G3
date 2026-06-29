module.exports = {
  execute: async (
    sock,
    from,
    msg
  ) => {
    await sock.sendMessage(
      from,
      { text: ` *˚₊·˚₊· ͟͟͞͞➳❥*𝕮𝖔𝖑𝖚𝖒𝖇𝖎𝖓𝖆\n*☆═━┈◈ ╰ v26.03.25 ╯ ◈┈━═☆* \n*│* \n*╰ ㊂ ▸▸ _Server Info_ ◂◂*\n*│* ┊\n*│* ┊▸ ✦ _ip adress » mc.vantasy.xys_\n*│* ┊▸ ✦ _proxy » 30003_\n*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙ \n*│*\n*╰ ㊂ ▸▸✧･ﾟ: * 𝕮𝖔𝖑𝖚𝖒𝖇𝖎𝖓𝖆 *:･ﾟ✧◂◂*` },
      {
        quoted: msg
      }
    )
  }
}