module.exports = {
  execute: async (
    sock,
    from,
    msg
  ) => {
    const menu = ` *˚₊·˚₊· ͟͟͞͞➳❥* ✧𝕮𝖔𝖑𝖚𝖒𝖇𝖎𝖓𝖆✧\n*☆═━┈◈ ╰ v26.03.25 ╯ ◈┈━═☆* \n*│* [ (.),(/),(!),(-),(<),(>),(🥩) ]\n*╰ ㊂▸▸ _INFORMASI MENU_ ◂◂*\n*│* ┊\n*│* ┊▸ ✦ _/comand_help_\n*│* ┊▸ ✦ _/bio_\n*│* ┊▸ ✦ _/donet_\n*│* ┊▸ ✦ _/login_\n*│* ┊▸ ✦ /server_info\n*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙ \n*│*\n*╰ ㊂ ▸▸✧･ﾟ: * 𝕮𝖔𝖑𝖚𝖒𝖇𝖎𝖓𝖆 *:･ﾟ✧◂◂*\n\n GC [https://chat.whatsapp.com/BTSwrfGbvIK9IX5CeuQlkE?s=cl&p=a&ilr=4]`
    await sock.sendMessage(
      from,
      {
        text: menu
      },
      {
        quoted: msg
      }
    )
  }
}