module.exports = {
  execute: async (
    sock,
    from,
    msg
  ) => {
    await sock.sendMessage(
      from,
      { text:` *˚₊·˚₊· ͟͟͞͞➳❥* 𝕮𝖔𝖑𝖚𝖒𝖇𝖎𝖓𝖆\n*☆═━┈◈ ╰ v26.03.25 ╯ ◈┈━═☆* \n*│* \n*╰ ㊂ ▸▸ _Seed Menu_ ◂◂*\n*│* ┊\n*│* ┊▸ ✦ _Seed serve wolrd_\n*│* ┊ _110603260120_\n*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙ \n*│*\n*╰ ㊂ ▸▸✦•┈❖✧･ﾟ: * 𝕮𝖔𝖑𝖚𝖒𝖇𝖎𝖓𝖆 *:･ﾟ✧❖┈•✦◂◂*\n\n\n    puncak keserakahan player adalah ketika seed server terepos :v`},
      {
        quoted: msg
      }
    )
  }
}