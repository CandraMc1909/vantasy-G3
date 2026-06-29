const fs = require("fs")
const path = require("path")

module.exports = function () {
  const commands = {}
  const prefixes = ["/",".","!","🥩 ","/ ",". ","! ","-","- ","<","< ",">","> "]
  const dir = path.join(__dirname, "../commands")
  const files = fs.readdirSync(dir).filter(file => file.endsWith(".js"))
  for (const file of files) {
    const command = require(path.join(dir, file))
    const cmdName = file.replace(".js", "").toLowerCase() // <-- kunci: lowercase

    for (const prefix of prefixes) {
      commands[prefix + cmdName] = command
    }
  }
  return commands
}