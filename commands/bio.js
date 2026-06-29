module.exports = {
  execute: async (
    sock,
    from,
    msg
  ) => {
    await sock.sendMessage(
      from,
      { text:` *˚₊·˚₊· ͟͟͞͞➳❥* * 𝕮𝖔𝖑𝖚𝖒𝖇𝖎𝖓𝖆 *\n*☆═━┈◈ ╰ v26.03.25 ╯ ◈┈━═☆* \n*│* \n*╰ ㊂ ▸▸ _INFORMASI BIO ADMIN_ ◂◂*\n*│* ┊\n*│* ┊▸ ✦ » Nama : Candra\n*│* ┊▸ ✦ » Asal : Sumbar\n*│* ┊▸ ✦ » Kota :Padang\n*╰ ㊂ ▸▸ _INFORMASI SOSMET ADMIN_ ◂◂*\n*│* ┊▸ ✦ _» Twtter : bit.ly/467y9Wq_\n*│* ┊▸ ✦ _» Discrod : bit.ly/SurvivalSmp_\n*│* ┊▸ ✦ _» Tictok :_\n*│* ┊▸ ✦ _» Facebok :_\n*│* ┊▸ ✦ _» Web :_\n*│* ┊▸ ✦ _•» LynkId : lynk.id/candramc1909_\n*│* ┊▸ ✦ _» forum : bit.ly/Login-whitelist_\n*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙ \n*│*\n*╰ ㊂ ▸▸✧･ﾟ: * 𝕮𝖔𝖑𝖚𝖒𝖇𝖎𝖓𝖆 *:･ﾟ✧◂◂*`},
      {
        quoted: msg
      }
    )
  }
}