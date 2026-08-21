const linkRegex =
    /(?:https?:\/\/|www\.)[^\s]+|(?:wa\.me|chat\.whatsapp\.com)\/[^\s]+/i
// =====================================
// CEK LINK
// =====================================
function containsLink(text) {
    if (!text) return false
    return linkRegex.test(text)
}
// =====================================
// CEK ADMIN GRUP
// =====================================
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
                p => p.id === userId
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
            "Admin check error:",
            err
        )
        return false
    }
}
// =====================================
// ANTILINK
// SELALU AKTIF
// =====================================
async function antiLink(
    sock,
    msg,
    from
) {
    try {
        // Hanya grup
        if (
            !from ||
            !from.endsWith("@g.us")
        ) {
            return false
        }
        // =================================
        // AMBIL TEXT
        // =================================
        const text =
            msg.message?.conversation ||
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
        // Tidak ada link
        if (
            !containsLink(text)
        ) {
            return false
        }
        // =================================
        // AMBIL PENGIRIM
        // =================================
        const sender =
            msg.key.participant ||
            msg.participant
        if (!sender) {
            return false
        }
        // =================================
        // ADMIN BEBAS LINK
        // =================================
        const admin =
            await isGroupAdmin(
                sock,
                from,
                sender
            )
        if (admin) {
            return false
        }
        // =================================
        // HAPUS PESAN
        // =================================
        await sock.sendMessage(
            from,
            {
                delete: msg.key
            }
        )
        // =================================
        // PERINGATAN
        // =================================
        await sock.sendMessage(
            from,
            {
                text:`🚫 *ANTI LINK*\n👤 User:\n@${sender.split("@")[0]}\n❌ Link terdeteksi dan telah dihapus.\n⚠️ apapun link nya jangan share ke grup ini.`,
                mentions: [
                    sender
                ]
            },
            {
                quoted: msg
            }
        )
        return true
    } catch (err) {
        console.log(
            "AntiLink Error:",
            err
        )
        return false
    }
}
// =====================================
// EXPORT
// =====================================
module.exports = {
    antiLink,
    containsLink,
    isGroupAdmin
}