module.exports = {
  execute: async (
    sock,
    from,
    msg
  ) => {
    await sock.sendMessage(
      from,
      { text:` *˚₊·˚₊· ͟͟͞͞➳❥ * 𝕮𝖔𝖑𝖚𝖒𝖇𝖎𝖓𝖆 *\n*☆═━┈◈ ╰ v26.03.25 ╯ ◈┈━═☆* \n*│* \n*╰ ㊂ ▸▸ _INFORMASI Donasi_ ◂◂*\n*│* ┊\n*│* ┊▸ ✦ _QR : https://qu.ax/7peeD_\n*│* ┊▸ ✦ _BSI: 7246574167_\n*│* ┊▸ ✦ _Dana: 083801785598_\n*│* ┊▸ ✦ _Saweria:saweria.co/CandraMc_\n*│* ┊▸ ✦ _Bank Jago: 508045848851_\n*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙ \n*│*\n*╰ ㊂ ▸▸✧･ﾟ: * 𝕮𝖔𝖑𝖚𝖒𝖇𝖎𝖓𝖆 *:･ﾟ✧◂◂*`},
      {
        quoted: msg
      }
    )
  }
}