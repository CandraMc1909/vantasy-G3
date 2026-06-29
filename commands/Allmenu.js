module.exports = {
  execute: async (
    sock,
    from,
    msg
  ) => {
    await sock.sendMessage(
      from,
      { text:` *˚₊·˚₊· ͟͟͞͞➳❥* * 𝕮𝖔𝖑𝖚𝖒𝖇𝖎𝖓𝖆 *\n*☆═━┈◈ ╰ v26.03.25 ╯ ◈┈━═☆* \n*│* \n*╰ ㊂▸▸ _INFORMASI MENU_ ◂◂*\n*│* ┊\n*│* ┊▸ ✦ _/comand_help_\n*│* ┊▸ ✦ _/bio_\n*│* ┊▸ ✦ _/donet_\n*│* ┊▸ ✦ _/login_\n*│* ┊▸ ✦ _/seed_\n*│* ┊▸ ✦ /server_info\n*│* ┊\n*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙ \n*╰ ㊂▸▸ _Comand Help menu_ ◂◂*\n*│* ┊▸ ✦ /generate_help\n*│* ┊▸ ✦ _/claim_\n*│* ┊▸ ✦ _/video_help_\n*│* ┊\n*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙ \n*╰ ㊂▸▸ _Generate Menu_ ◂◂*\n*│* ┊▸ ✦ /generate_waifu\n*│* ┊▸ ✦ /generate_my-kisah\n*│* ┊▸ ✦ /generate_my-bini\n*│* ┊▸ ✦ /generate_[🔒]\n*│* ┊▸ ✦ /generate_[🔒]\n*│* ┊▸ ✦ /Waifu\n*│* ┊▸ ✦ /my-bini\n*│* ┊▸ ✦ /my-kisah\n*│* ┊▸ ✦ /[🔒]\n*│* ┊▸ ✦ /[🔒]\n*│* ┊▸ ✦ /[🔒]\n*│* ┊\n*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙ \n*╰ ㊂▸▸ _Video menu_ ◂◂*\n*│* ┊▸ ✦ /DydyCosplay\n*│* ┊▸ ✦ /Oni-chi-chi\n*│* ┊▸ ✦ /Cosplayer\n*│* ┊\n*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙ \n*╰ ㊂ ▸▸✧･ﾟ: * 𝕮𝖔𝖑𝖚𝖒𝖇𝖎𝖓𝖆 *:･ﾟ✧◂◂*`},
      {
        quoted: msg
      }
    )
  }
}