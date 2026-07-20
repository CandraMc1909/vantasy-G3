module.exports = {
  execute: async (
    sock,
    from,
    msg
  ) => {
    await sock.sendMessage(
      from,
      { text:` *˚₊·˚₊· ͟͟͞͞➳❥* 𝕮𝖔𝖑𝖚𝖒𝖇𝖎𝖓𝖆 \n*☆═━┈◈ ╰ v26.03.25 ╯ ◈┈━═☆* \n*│* \n*╰ ㊂ ▸▸ _Video Menu_ ◂◂*\n*│* ┊\n*│* ┊▸ ✦ /Dydycosplay\n*│* ┊▸ ✦ /Oni chichi\n*│* ┊▸ ✦ /AV\n*│* ┊▸ ✦ /[🔒]\n*│* ┊▸ ✦ /[🔒]\n*│* ┊▸ ✦ /[🔒]\n*│* ┊▸ ✦ /[🔒]\n*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙ \n*│*\n*╰ ㊂ ▸▸✧･ﾟ: * 𝕮𝖔𝖑𝖚𝖒𝖇𝖎𝖓𝖆 *:･ﾟ✧◂◂*\n\n\n`},
      {
        quoted: msg
      }
    )
  }
}