const {
    default: makeWASocket,
        useMultiFileAuthState,
        DisconnectReason,
        fetchLatestBaileysVersion
    } = require("@whiskeysockets/baileys")
    const pino = require("pino")
    const fs = require("fs")
    const loadCommands = require("./lib/loader")
    const {
        detect
    } = require("./lib/groupDetector")
    const commands = loadCommands()
    const db = fs.existsSync("./database.json")
    ? JSON.parse(fs.readFileSync("./database.json")): {}
    const sleep = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms))
    async function startBot() {
        const {
            state,
            saveCreds
        } =
        await useMultiFileAuthState("session")
        const {
            version
        } =
        await fetchLatestBaileysVersion()
        const sock = makeWASocket( {
            version,
            logger: pino( {
                level: "silent"
            }),
            printQRInTerminal: true,
            auth: state,
            browser: [
                "Chrome",
                "Windows",
                "10"
            ]
        })
        sock.ev.on(
            "creds.update",
            saveCreds
        )
        sock.ev.on(
            "connection.update",
            (update)=> {
                const {
                    connection,
                    lastDisconnect,
                    qr
                } = update
                if (qr) {
                    require("qrcode-terminal")
                    .generate(qr, {
                        small: true
                    })
                }
                if (connection === "close") {
                    const reconnect =
                    lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut
                    if (reconnect) {
                        startBot()
                    }
                } else if (connection === "open") {
                    console.log(
                        "Bot Connected ✓"
                    )
                }
            })
        // AUTO REPLY + COMMAND
        sock.ev.on(
            "messages.upsert",
            async({
                messages
            })=> {
                try {
                    const msg =
                    messages[0]
                    if (!msg.message)
                        return
                    if (msg.key.fromMe)
                        return
                    const from =
                    msg.key.remoteJid
                    const text = (
                        msg.message.conversation ||
                        msg.message.extendedTextMessage?.text ||
                        ""
                    ).trim()
                    const cmd =
                    text.toLowerCase()
                    if (commands[cmd]) {
                        return commands[cmd]
                        .execute(
                            sock,
                            from,
                            msg
                        )
                    }
                    if (
                        db.autoReply &&
                        cmd.includes("halo")
                    ) {
                        await sock.sendMessage(
                            from,
                            {
                                text:
                                "Halo juga 👋"
                            }
                        )
                    }
                }catch(err) {
                    console.log(err)
                }
            })
        // WELCOME & GOODBYE SYSTEM
        sock.ev.on(
            "group-participants.update",
            async(update)=> {
                try {
                    const {
                        id,
                        participants,
                        action
                    } = update
                    await sleep(1500)
                    const metadata =
                    await sock.groupMetadata(id)
                    const groupName =
                    metadata.subject
                    const totalMember =
                    metadata.participants.length
                    for (const user of participants) {
                        const username =
                        user.split("@")[0]
                        const posisi =
                        metadata.participants.findIndex(
                            p=>p.id === user
                        )+1
                        if (action === "add") {
                            await sock.sendMessage(
                                id,
                                {
                                    image:
                                    fs.readFileSync(
                                        "./media/welcome.jpg"
                                    ),
                                    caption:
                                    ` *˚₊·˚₊· ͟͟͞͞➳❥ *${groupName}*\n*☆═━┈◈ ╰ v26.03.25 ╯ ◈┈━═☆* \n*│* \n*╰ ㊂▸▸ _Welcome New Member*_ ◂◂\n*│* ┊\n*│* ┊▸ ✦ _Nama : @${username}_\n*│* ┊\n*│* ┊▸ ✦ _No Member :${posisi}_\n*│* ┊▸ ✦ _Total Member : ${totalMember} Member_\n*│* ┊\n*│* ┊▸ ✦ _/login => logim whitelist_\n*│* ┊▸ ✦ _/menu => Menu Bot_\n*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙ \n*│*\n*╰ ㊂ ▸▸ _Google_ ◂◂*\n\n Semoga betah berada di grup ini dan selalu menghargai member yg lain `,
                                    mentions: [
                                        user
                                    ]
                                }
                            )
                        }
                        if (action === "remove") {
                            await sock.sendMessage(
                                id,
                                {
                                    image:
                                    fs.readFileSync(
                                        "./media/goodbye.jpg"
                                    ),
                                    caption:
                                    `╭━━━〔 ${groupName}〕━━━╮\n┃ 👋 Sampai jumpa, @${username}!\n┃\n┃ Terima kasih sudah menjadi\n┃ bagian dari *️${groupName}*.\n┃\n┃ 🌟 Semoga sukses di mana pun.\n┃ 🚪 Pintu ${groupName} selalu terbuka.\n┃\n┃ Selamat tinggal dan jaga diri!\n┃\n┃ Member Ke :${posisi}\n┃ Total Member : ${totalMember}\n┃\n╰━━━━━━━━━━━━━━━━╯`,
                                    mentions: [
                                        user
                                    ]
                                }
                            )
                        }
                    }
                }catch(err) {
                    console.log(
                        "Welcome error:",
                        err
                    )
                }
            })
        // GROUP UPDATE
        sock.ev.on(
            "groups.update",
            async([event])=> {
                try {
                    await detect(
                        sock,
                        event,
                        db
                    )
                }catch(err) {
                    console.log(err)
                }
            })
    }
    startBot()