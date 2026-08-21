const fs = require("fs")
// ==================================================
// DATABASE
// ==================================================
const dbPath = "./database.json"
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
            "TextDetector Database Error:",
            err
        )
        return {}
    }
}
// ==================================================
// NORMALISASI TEXT
// ==================================================
function normalizeText(text) {
    if (!text) return ""
    return text
        .toLowerCase()
        .normalize("NFKD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .replace(
            /(.)\1{3,}/g,
            "$1$1"
        )
        .replace(
            /[^\p{L}\p{N}\s@._:/-]/gu,
            " "
        )
        .replace(
            /\s+/g,
            " "
        )
        .trim()
}
// ==================================================
// DAFTAR KATA TOXIC
// ==================================================
const toxicWords = [

    "tolol",
    "bodoh",
    "goblok",
    "goblog",
    "bego",
    "idiot",
    "brengsek",
    "bangsat",
    "bajingan",
    "kampret",
    "sialan",
    "keparat",
    "kontol",
    "memek",
    "ngentot",
    "anjing",
    "asu",
    "tai",
    "wtf",
    "fuck",
    "shit",
    "bitch",
    "cunt",
    "asshole",
    "motherfucker",
    "dick",
    "fck",
    "slut",
    "fxck",
    "sh1t",
    "sh!t",
    "puki",
    "pukimak",
    "dancok",
    "Telaso",
    "bujank inam",
    "Kentel",
    "Gobhlok",
    "Kountol",
    "phuki",
    "Kimak",
    "Kontuol",
    "Babi",
    "Dogy",
    "Fenis",
    ""
]
// ==================================================
// INDIKATOR IKLAN
// ==================================================
const adIndicators = [

    // ------------------------------------------
    // SOSMED
    // ------------------------------------------

    "tiktok",
    "tik tok",
    "instagram",
    "facebook",
    "fb",
    "shopee",
    "sosmed",
    "social media",

    // ------------------------------------------
    // SUNTIK / JASA
    // ------------------------------------------

    "suntik",
    "suntik sosmed",
    "jasa suntik",

    // ------------------------------------------
    // FOLLOWERS
    // ------------------------------------------

    "follower",
    "followers",
    "pengikut",
    "subscriber",
    "subscribers",

    // ------------------------------------------
    // ENGAGEMENT
    // ------------------------------------------

    "like",
    "likes",
    "view",
    "views",
    "viewrs",
    "viewer",
    "viewers",
    "reaksi",
    "reaction",
    "react",

    // ------------------------------------------
    // JUALAN
    // ------------------------------------------

    "jual",
    "dijual",
    "jualan",
    "jual akun",
    "jual account",
    "sewa akun",
    "sewa account",

    "jasa",
    "joki",
    "reseller",
    "dropship",
    "affiliate",

    // ------------------------------------------
    // PROMOSI
    // ------------------------------------------

    "promo",
    "promosi",
    "diskon",
    "murah",
    "termurah",
    "harga",

    "open order",
    "open po",
    "ready stock",
    "ready stok",
    "stok tersedia",

    "order",
    "order sekarang",
    "pesan sekarang",
    "buruan order",

    // ------------------------------------------
    // KONTAK
    // ------------------------------------------

    "hubungi",
    "hubungi wa",
    "hubungi whatsapp",
    "hubungi admin",

    "tanya admin",
    "chat admin",
    "dm sekarang",
    "pm sekarang",
    "dm me",
    "pm me",
    "chat me",

    // ------------------------------------------
    // PAYMENT
    // ------------------------------------------

    "payment",
    "qris",
    "dana",
    "gopay",
    "ovo",
    "shopeepay",
    "transfer",

    // ------------------------------------------
    // PROMOSI TAMBAHAN
    // ------------------------------------------

    "iklan",
    "bisnis",
    "investasi",
    "penghasilan",
    "cuan",
    "giveaway",
    "gratis",
    "free",

    // ------------------------------------------
    // PENAMBAH FOLLOWER
    // ------------------------------------------

    "tambah followers",
    "tambah follower",
    "tambah like",
    "tambah views",
    "tambah view",

    "naikin followers",
    "naikin follower",
    "naikin like",
    "naikin views",
    "naikin view",

    "suntik followers",
    "suntik follower",
    "suntik like",
    "suntik views",
    "suntik view",
    "suntik tiktok",
    "suntik instagram",

    // ------------------------------------------
    // SPAM SOSMED
    // ------------------------------------------

    "followback",
    "follback",
    "follow back",
    "sub4sub",
    "like4like",
    "follow4follow",

    "cek bio",
    "link di bio",
    "link bio",
    "cek profil",
    "kunjungi profil",
    // ------------------------------------------
    // PROMOSI MENCURIGAKAN
    // ------------------------------------------
    "slot tersedia",
    "slot terbatas",
    "kesempatan",
    "terbatas",
    "buruan",
    "jangan lewatkan"
]
// ==================================================
// ESCAPE REGEX
// ==================================================
function escapeRegex(text) {
    return text.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
    )
}
// ==================================================
// DETEKSI TOXIC
// ==================================================
function detectToxic(text) {
    const normalized =
        normalizeText(text)
    if (!normalized) {
        return null
    }
    for (
        const word
        of toxicWords
    ) {
        const regex =
            new RegExp(
                `(?:^|\\s)${escapeRegex(word)}(?:$|\\s)`,
                "i"
            )
        if (
            regex.test(
                normalized
            )
        ) {
            return word
        }
    }
    return null
}
// ==================================================
// DETEKSI IKLAN / PROMOSI
// ==================================================
function detectAdvertisement(text) {
    const normalized =
        normalizeText(text)
    if (!normalized) {
        return null
    }
    let score = 0
    const detected = []
    // ==========================================
    // CEK INDIKATOR
    // ==========================================
    for (
        const keyword
        of adIndicators
    ) {
        if (
            normalized.includes(
                keyword
            )
        ) {
            if (
                !detected.includes(
                    keyword
                )
            ) {
                detected.push(
                    keyword
                )
            }
        }
    }
    // ==========================================
    // BOBOT INDIKATOR
    // ==========================================
    for (
        const keyword
        of detected
    ) {
        // SUNTIK
        if (
            keyword === "suntik" ||
            keyword === "suntik sosmed" ||
            keyword === "jasa suntik"
        ) {
            score += 5
        }
        // FOLLOWERS
        else if (
            keyword === "followers" ||
            keyword === "follower" ||
            keyword === "pengikut" ||
            keyword === "subscriber" ||
            keyword === "subscribers"
        ) {
            score += 3
        }
        // LIKE / VIEW
        else if (
            keyword === "likes" ||
            keyword === "like" ||
            keyword === "views" ||
            keyword === "viewrs" ||
            keyword === "viewers" ||
            keyword === "view" ||
            keyword === "reaksi"
        ) {
            score += 3
        }
        // PAYMENT
        else if (
            keyword === "rp" ||
            keyword === "qris" ||
            keyword === "dana" ||
            keyword === "payment" ||
            keyword === "gopay" ||
            keyword === "ovo" ||
            keyword === "transfer"
        ) {
            score += 3
        }
        // JASA / ORDER
        else if (
            keyword === "jasa" ||
            keyword === "joki" ||
            keyword === "jual" ||
            keyword === "jualan" ||
            keyword === "order" ||
            keyword === "order sekarang"
        ) {
            score += 3
        }
        // PROMOSI
        else if (
            keyword === "promo" ||
            keyword === "promosi" ||
            keyword === "diskon" ||
            keyword === "murah"
        ) {
            score += 2
        }
        // SOSMED
        else if (
            keyword === "tiktok" ||
            keyword === "instagram" ||
            keyword === "facebook" ||
            keyword === "fb" ||
            keyword === "shopee"
        ) {
            score += 1
        }
        else {
            score += 1
        }
    }
    // ==========================================
    // DETEKSI HARGA RP
    // ==========================================
    const pricePattern =
        /\brp\s*\.?\s*\d+(?:[.,]\d+)?\s*[km]?|\b\d+\s*k\b/gi
    const prices =
        normalized.match(
            pricePattern
        )
    if (
        prices &&
        prices.length >= 2
    ) {
        score += 5
    }
    // ==========================================
    // DETEKSI DAFTAR HARGA
    // ==========================================
    const priceListPattern =
        /(?:followers?|likes?|views?|viewrs?|pengikut|reaksi).{0,40}(?:rp|harga|\d+\s*k)/i
    if (
        priceListPattern.test(
            normalized
        )
    ) {
        score += 5
    }
    // ==========================================
    // DETEKSI PAKET
    // ==========================================
    const packageMatches =
        normalized.match(
            /\b\d+\s*(followers?|likes?|views?|viewrs?|pengikut|reaksi)\b/gi
        )
    if (
        packageMatches &&
        packageMatches.length >= 2
    ) {
        score += 6
    }
    // ==========================================
    // DETEKSI ORDER SEKARANG
    // ==========================================
    if (
        /\border\s+sekarang\b/i.test(
            normalized
        )
    ) {
        score += 5
    }
    // ==========================================
    // DETEKSI PAYMENT
    // ==========================================
    if (
        /\b(payment|qris|dana|gopay|ovo|shopeepay|transfer)\b/i.test(
            normalized
        )
    ) {
        score += 4
    }
    // ==========================================
    // DETEKSI POLA JUALAN
    // ==========================================
    const strongAdPatterns = [
        /\b(jual|dijual|jualan)\b.*\b(murah|harga|promo|diskon)\b/i,
        /\b(jasa|suntik)\b.*\b(follower|followers|like|likes|view|views|tiktok|instagram)\b/i,
        /\b(follower|followers|like|likes|view|views)\b.*\b(rp|harga|murah)\b/i,
        /\b(hubungi|chat|dm|pm)\b.*\b(admin|wa|whatsapp)\b/i,
        /\b(open\s*(po|order))\b/i,
        /\b(ready\s*(stock|stok))\b/i,
        /\b(order|pesan)\b.*\b(sekarang|disini|di sini)\b/i
    ]
    for (
        const pattern
        of strongAdPatterns
    ) {
        if (
            pattern.test(
                normalized
            )
        ) {
            score += 5
        }
    }
    // ==========================================
    // DETEKSI BANYAK BARIS
    // ==========================================
    const lineCount =
        text
            .split("\n")
            .filter(
                line =>
                    line.trim()
            )
            .length
    if (
        lineCount >= 10 &&
        detected.length >= 3
    ) {
        score += 5
    }
    // ==========================================
    // HASIL
    // ==========================================
    if (
        score >= 8
    ) {
        return {
            score,
            keywords:
                detected
        }
    }
    return null
}
// ==================================================
// DETEKSI SPAM
// ==================================================
function detectSpam(text) {
    const normalized =
        normalizeText(text)
    if (!normalized) {
        return false
    }
    const spamPatterns = [
        /(.)\1{6,}/i,
        /(?:wa|whatsapp)[\s:.-]*\d{8,}/i,
        /\b\d{10,15}\b/i,
        /join\s+(sekarang|group|grup)/i,
        /klik\s+(link|disini|di sini)/i,
        /click\s+(here|link)/i,
        /bit\.ly\/\S+/i,
        /t\.me\/\S+/i,
        /tinyurl\.com\/\S+/i
    ]
    for (
        const pattern
        of spamPatterns
    ) {
        if (
            pattern.test(
                normalized
            )
        ) {
            return true
        }
    }
    return false
}
// ==================================================
// CEK ADMIN GRUP
// ==================================================
async function isGroupAdmin(
    sock,
    groupId,
    userId
) {
    try {
        const metadata =
            await sock.groupMetadata(
                groupId
            )
        const participant =
            metadata.participants.find(
                p =>
                    p.id ===
                    userId
            )
        return !!(
            participant &&
            (
                participant.admin === "admin" ||
                participant.admin === "superadmin"
            )
        )
    } catch (err) {
        console.log(
            "TextDetector Admin Error:",
            err
        )
        return false
    }
}
// ==================================================
// AMBIL TEXT PESAN
// ==================================================
function getMessageText(msg) {
    if (
        !msg?.message
    ) {
        return ""
    }
    return (
        msg.message
            .conversation ||
        msg.message
            .extendedTextMessage
            ?.text ||
        msg.message
            .imageMessage
            ?.caption ||
        msg.message
            .videoMessage
            ?.caption ||
        msg.message
            .documentMessage
            ?.caption ||
        ""
    )
}
// ==================================================
// ANALYZE TEXT
// ==================================================
function analyzeText(text) {
    // ==========================================
    // TOXIC
    // ==========================================
    const toxic =
        detectToxic(text)
    if (toxic) {
        return {
            detected: true,
            type: "toxic",
            keyword: toxic,
            reason:
                "KETIKAN TOLONG DI CONROL\n Pepatah mengatakan Keyborot mu harumau mu"
        }
    }
    // ==========================================
    // SPAM
    // ==========================================
    const spam =
        detectSpam(text)
    if (spam) {
        return {
            detected: true,
            type: "spam",
            keyword: null,
            reason:
                "Pesan terindikasi spam"
        }
    }
    // ==========================================
    // IKLAN
    // ==========================================
    const advertisement =
        detectAdvertisement(text)
    if (advertisement) {
        return {
            detected: true,
            type: "advertisement",
            keyword:
                advertisement
                    .keywords
                    .slice(0, 8)
                    .join(", "),
            score:
                advertisement.score,
            reason:
                "Pesan terindikasi iklan/promosi"
        }
    }
    // ==========================================
    // PESAN NORMAL
    // ==========================================
    return {
        detected: false,
        type: null,
        keyword: null,
        score: 0,
        reason: null
    }
}
// ==================================================
// TEXT DETECTOR UTAMA
// ==================================================
async function detectText(
    sock,
    msg,
    from
) {
    try {
        // ==========================================
        // HANYA GRUP
        // ==========================================
        if (
            !from ||
            !from.endsWith("@g.us")
        ) {
            return false
        }
        // ==========================================
        // PENGIRIM
        // ==========================================
        const sender =
            msg.key.participant ||
            msg.participant
        if (!sender) {
            return false
        }
        // ==========================================
        // ADMIN BEBAS
        // ==========================================
        const admin =
            await isGroupAdmin(
                sock,
                from,
                sender
            )
        if (admin) {
            return false
        }
        // ==========================================
        // AMBIL PESAN
        // ==========================================
        const text =
            getMessageText(msg)
        if (!text) {

            return false
        }
        // ==========================================
        // ANALYZE
        // ==========================================
        const result =
            analyzeText(text)
        if (
            !result.detected
        ) {
            return false
        }
        // ==========================================
        // HAPUS PESAN
        // ==========================================
        await sock.sendMessage(
            from,
            {
                delete: msg.key
            }
        )
        // ==========================================
        // ICON
        // ==========================================
        let icon = "⚠️"
        if (
            result.type ===
            "toxic"
        ) {
            icon = "🤬"
        }
        if (
            result.type ===
            "advertisement"
        ) {
            icon = "📢"
        }
        if (
            result.type ===
            "spam"
        ) {
            icon = "🚨"
        }
        // ==========================================
        // USERNAME
        // ==========================================
        const username =
            sender.split("@")[0]
        // ==========================================
        // PERINGATAN
        // ==========================================
        await sock.sendMessage(
            from,
            {
                text:`${icon} *TEXT DETECTOR*\n👤 User:\n@${username}\n🚫 Pesan telah dihapus.\n📌 Alasan:\n${result.reason}\n⚠️ Harap menjaga percakapn`,
                mentions: [
                    sender
                ]
            },
            {
                quoted: msg
            }
        )
        // ==========================================
        // LOG
        // ==========================================
        console.log(
            `[TEXT DETECTOR]`
        )
        console.log(
            `Type   : ${result.type}`
        )
        console.log(
            `Score  : ${result.score || 0}`
        )
        console.log(
            `User   : ${sender}`
        )
        console.log(
            `Text   : ${text}`
        )
        return true
    } catch (err) {
        console.log(
            "TextDetector Error:",
            err
        )
        return false
    }
}
// ==================================================
// EXPORT
// ==================================================
module.exports = {
    detectText,
    analyzeText,
    detectToxic,
    detectAdvertisement,
    detectSpam,
    normalizeText,
    isGroupAdmin,
    getMessageText
}