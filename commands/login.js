module.exports = {
  execute: async (
    sock,
    from,
    msg
  ) => {
    await sock.sendMessage(
      from,
      { text: ` *˚₊·˚₊· ͟͟͞͞➳❥* 𝕮𝖔𝖑𝖚𝖒𝖇𝖎𝖓𝖆\n*☆═━┈◈ ╰ v26.03.25 ╯ ◈┈━═☆* \n*│* \n*╰ ㊂ ▸▸ _Login Menu_ ◂◂*\n*│* ┊\n*│* ┊▸ ✦ _link » bit.ly/Login-whitelist_\n*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙ \n*│*\n*╰ ㊂ ▸▸✧･ﾟ: * 𝕮𝖔𝖑𝖚𝖒𝖇𝖎𝖓𝖆 *:･ﾟ✧◂◂*\n    telah diberlakukan daftar whitelist lewat Google forum link tertera di atas` },
      {
        quoted: msg
      }
    )
  }
}