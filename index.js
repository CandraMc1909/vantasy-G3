const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys")

const pino = require("pino")
const fs = require("fs")
const qrcode = require("qrcode-terminal")

const loadCommands =
    require("./lib/loader")

const {
    detect
} = require("./lib/groupDetector")

const {
    antiLink
} = require("./lib/antiLink")

// ==================================================
// TEXT DETECTOR
// ==================================================

const {
    detectText
} = require("./lib/textDetector")


// ==================================================
// LOAD COMMANDS
// ==================================================

const commands =
    loadCommands()

console.log(
    "Commands loaded:",
    Object.keys(commands)
)


// ==================================================
// DATABASE
// ==================================================

const dbPath =
    "./database.json"


function loadDB() {

    if (!fs.existsSync(dbPath)) {

        fs.writeFileSync(
            dbPath,
            "{}"
        )

    }

    try {

        return JSON.parse(
            fs.readFileSync(
                dbPath,
                "utf8"
            )
        )

    } catch (err) {

        console.log(
            "Database error:",
            err
        )

        return {}

    }

}


let db =
    loadDB()


// ==================================================
// SLEEP
// ==================================================

const sleep =
    ms =>
        new Promise(
            resolve =>
                setTimeout(
                    resolve,
                    ms
                )
        )


// ==================================================
// START BOT
// ==================================================

async function startBot() {

    try {

        const {
            state,
            saveCreds
        } =
            await useMultiFileAuthState(
                "session"
            )


        const {
            version
        } =
            await fetchLatestBaileysVersion()


        const sock =
            makeWASocket({

                version,

                logger:
                    pino({
                        level: "silent"
                    }),

                printQRInTerminal:
                    true,

                auth:
                    state,

                browser: [
                    "Chrome",
                    "Windows",
                    "10"
                ]

            })


        // ==================================================
        // SAVE SESSION
        // ==================================================

        sock.ev.on(
            "creds.update",
            saveCreds
        )


        // ==================================================
        // CONNECTION
        // ==================================================

        sock.ev.on(
            "connection.update",
            update => {

                const {
                    connection,
                    lastDisconnect,
                    qr
                } = update


                // ==================================================
                // QR CODE
                // ==================================================

                if (qr) {

                    qrcode.generate(
                        qr,
                        {
                            small: true
                        }
                    )

                }


                // ==================================================
                // CONNECTION CLOSED
                // ==================================================

                if (
                    connection ===
                    "close"
                ) {

                    const shouldReconnect =
                        lastDisconnect
                            ?.error
                            ?.output
                            ?.statusCode
                        !==
                        DisconnectReason.loggedOut


                    if (
                        shouldReconnect
                    ) {

                        console.log(
                            "Connection terputus..."
                        )

                        console.log(
                            "Mencoba reconnect..."
                        )

                        startBot()

                    } else {

                        console.log(
                            "Session logout."
                        )

                    }

                }


                // ==================================================
                // CONNECTION OPEN
                // ==================================================

                else if (
                    connection ===
                    "open"
                ) {

                    console.log(
                        "VantasySmp Connected ✓"
                    )

                    console.log(
                        "AntiLink: AKTIF ✓"
                    )

                    console.log(
                        "TextDetector: AKTIF ✓"
                    )

                }

            }
        )


        // ==================================================
        // MESSAGE HANDLER
        // ==================================================

        sock.ev.on(
            "messages.upsert",
            async ({
                messages
            }) => {

                try {

                    const msg =
                        messages[0]


                    // ==================================================
                    // TIDAK ADA PESAN
                    // ==================================================

                    if (
                        !msg ||
                        !msg.message
                    ) {

                        return

                    }


                    // ==================================================
                    // JANGAN PROSES PESAN BOT SENDIRI
                    // ==================================================

                    if (
                        msg.key.fromMe
                    ) {

                        return

                    }


                    // ==================================================
                    // ID CHAT
                    // ==================================================

                    const from =
                        msg.key.remoteJid


                    if (!from) {

                        return

                    }


                    // ==================================================
                    // AMBIL TEXT
                    // ==================================================

                    const text =
                        (
                            msg.message
                                ?.conversation ||

                            msg.message
                                ?.extendedTextMessage
                                ?.text ||

                            msg.message
                                ?.imageMessage
                                ?.caption ||

                            msg.message
                                ?.videoMessage
                                ?.caption ||

                            ""
                        ).trim()


                    if (!text) {

                        return

                    }


                    const cmd =
                        text.toLowerCase()


                    // ==================================================
                    // COMMAND
                    //
                    // COMMAND DIPROSES DULU
                    // ==================================================

                    if (
                        commands[cmd]
                    ) {

                        try {

                            return await
                                commands[cmd]
                                    .execute(
                                        sock,
                                        from,
                                        msg
                                    )

                        } catch (err) {

                            console.log(
                                "Command Error:",
                                err
                            )


                            await sock.sendMessage(
                                from,
                                {
                                    text:
                                        "❌ Terjadi error saat menjalankan command."
                                },
                                {
                                    quoted: msg
                                }
                            )

                        }

                    }


                    // ==================================================
                    // ANTILINK
                    //
                    // SELALU AKTIF DI GRUP
                    // ==================================================

                    if (
                        from.endsWith("@g.us")
                    ) {

                        const blocked =
                            await antiLink(
                                sock,
                                msg,
                                from
                            )


                        if (
                            blocked
                        ) {

                            return

                        }

                    }


                    // ==================================================
                    // TEXT DETECTOR
                    // ==================================================
                    //
                    // Mendeteksi:
                    // - Toxic
                    // - Spam
                    // - Iklan / Promosi
                    //
                    // Jika terdeteksi:
                    // - Pesan dihapus
                    // - Bot mengirim peringatan
                    // - Pesan tidak diteruskan ke fitur lain
                    //
                    // Hanya aktif di grup.
                    // ==================================================

                    if (
                        from.endsWith("@g.us")
                    ) {

                        const textDetected =
                            await detectText(
                                sock,
                                msg,
                                from
                            )


                        if (
                            textDetected
                        ) {

                            console.log(
                                "[TEXT DETECTOR] Pesan ditangani."
                            )

                            return

                        }

                    }


                    // ==================================================
                    // AUTO REPLY
                    // ==================================================

                    db =
                        loadDB()


                    if (
                        db.autoReply &&
                        cmd.includes("halo")
                    ) {

                        await sock.sendMessage(
                            from,
                            {
                                text:
                                    "Halo juga 👋"
                            },
                            {
                                quoted: msg
                            }
                        )

                    }


                } catch (err) {

                    console.log(
                        "Message Error:",
                        err
                    )

                }

            }
        )


        // ==================================================
        // WELCOME & GOODBYE
        // ==================================================

        sock.ev.on(
            "group-participants.update",
            async update => {

                try {

                    const {
                        id,
                        participants,
                        action
                    } = update


                    // ==================================================
                    // TUNGGU METADATA GRUP UPDATE
                    // ==================================================

                    await sleep(
                        1500
                    )


                    const metadata =
                        await sock.groupMetadata(
                            id
                        )


                    const groupName =
                        metadata.subject


                    const totalMember =
                        metadata
                            .participants
                            .length


                    // ==================================================
                    // USER
                    // ==================================================

                    for (
                        const user
                        of participants
                    ) {

                        const username =
                            user.split("@")[0]


                        const posisi =
                            metadata
                                .participants
                                .findIndex(
                                    p =>
                                        p.id ===
                                        user
                                ) + 1


                        // ==================================================
                        // WELCOME
                        // ==================================================

                        if (
                            action ===
                            "add"
                        ) {

                            await sock.sendMessage(
                                id,
                                {

                                    image:
                                        fs.readFileSync(
                                            "./media/welcome.jpg"
                                        ),

                                    caption:

`*˚₊·˚₊· ͟͟͞͞➳❥* *${groupName}*

*☆═━┈◈ ╰ v26.03.25 ╯ ◈┈━═☆*

*│*
*╰ ㊂▸▸ _Welcome New Member_ ◂◂*
*│*
*│* ┊▸ ✦ _Nama : @${username}_
*│*
*│* ┊▸ ✦ _No Member : ${posisi}_
*│* ┊▸ ✦ _Total Member : ${totalMember} Member_
*│*
*│* ┊▸ ✦ _/login => login whitelist_
*│* ┊▸ ✦ _/menu => Menu Bot_
*│*
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
*│*
*╰ ㊂ ▸▸ _Google_ ◂◂*

Semoga betah berada di grup ini dan selalu menghargai member yg lain.`,

                                    mentions: [
                                        user
                                    ]

                                }
                            )

                        }


                        // ==================================================
                        // GOODBYE
                        // ==================================================

                        if (
                            action ===
                            "remove"
                        ) {

                            await sock.sendMessage(
                                id,
                                {

                                    image:
                                        fs.readFileSync(
                                            "./media/goodbye.jpg"
                                        ),

                                    caption:

`╭━━━〔 ${groupName} 〕━━━╮
┃ 👋 Sampai jumpa, @${username}!
┃
┃ Terima kasih sudah menjadi
┃ bagian dari *${groupName}*.
┃
┃ 🌟 Semoga sukses di mana pun.
┃ 🚪 Pintu ${groupName} selalu terbuka.
┃
┃ Member Ke : ${posisi}
┃ Total Member : ${totalMember}
┃
╰━━━━━━━━━━━━━━━━╯`,

                                    mentions: [
                                        user
                                    ]

                                }
                            )

                        }

                    }


                } catch (err) {

                    console.log(
                        "Welcome Error:",
                        err
                    )

                }

            }
        )


        // ==================================================
        // GROUP UPDATE
        // ==================================================

        sock.ev.on(
            "groups.update",
            async ([event]) => {

                try {

                    await detect(
                        sock,
                        event,
                        db
                    )

                } catch (err) {

                    console.log(
                        "Group Update Error:",
                        err
                    )

                }

            }
        )


    } catch (err) {

        console.log(
            "Start Bot Error:",
            err
        )


        setTimeout(
            () => startBot(),
            5000
        )

    }

}


// ==================================================
// START
// ==================================================

startBot()