const fs = require("fs");
const dbPath = "./database/cooldown.json";
function loadDB() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, "{}");
  }
  return JSON.parse(fs.readFileSync(dbPath));
}
function saveDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}
function formatTime(ms) {
  let seconds = Math.ceil(ms / 1000);
  let hari = Math.floor(seconds / 86400);
  seconds %= 86400;
  let jam = Math.floor(seconds / 3600);
  seconds %= 3600;
  let menit = Math.floor(seconds / 60);
  let detik = seconds % 60;
  let text = [];
  if (hari) text.push(`${hari} hari`);
  if (jam) text.push(`${jam} jam`);
  if (menit) text.push(`${menit} menit`);
  if (detik) text.push(`${detik} detik`);
  return text.join(" ");
}
function checkCooldown(userId, command, cooldownTime) {
  const db = loadDB();
  const key = `${userId}_${command}`;
  const now = Date.now();
  const last = db[key] || 0;
  const remaining = last + cooldownTime - now;
  if (remaining > 0) {
    return {
      status: false,
      remaining,
      text: formatTime(remaining),
    };
  }
  db[key] = now;
  saveDB(db);
  return {
    status: true,
    remaining: 0,
    text: "",
  };
}
module.exports = {
  checkCooldown,
  formatTime,
};
