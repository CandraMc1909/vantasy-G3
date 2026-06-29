const prefixes =  ["/",".","!","🥩 ","/ ",". ","! ","-","- ","<","< ",">","> "]
const prefix = prefixes.find(p => msg.startsWith(p))
if (!prefix) return

const args = msg.slice(prefix.length).trim().split(/ +/)
const cmdName = args.shift().toLowerCase() // <-- kunci: lowercase juga

const command = commands[prefix + cmdName]
if (command) command.run()