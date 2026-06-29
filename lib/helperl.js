const fs = require("fs")
const path = require("path")
function msToTime(duration){
  let seconds =
    Math.floor((duration/1000)%60)
  let minutes =
    Math.floor((duration/(1000*60))%60)
  let hours =
    Math.floor((duration/(1000*60*60))%24)
  let res=[]
  if(hours) res.push(`${hours} jam`)
  if(minutes) res.push(`${minutes} menit`)
  if(seconds) res.push(`${seconds} detik`)

  return res.join(", ")
}
async function sendFile(
  sock,
  from,
  filePath,
  mimeType,
  fileName
){
  const fileBuffer =
    fs.readFileSync(filePath)
  await sock.sendMessage(from,{
    document:fileBuffer,
    mimetype:mimeType,
    fileName:fileName
  })
}
async function sendRandomFile(
  sock,
  from,
  folderPath,
  mimeType
){
  const files =
    fs.readdirSync(folderPath)
  const random =
    files[Math.floor(Math.random()*files.length)]
  await sendFile(
    sock,
    from,
    `${folderPath}/${random}`,
    mimeType,
    random
  )
}
module.exports = {
  msToTime,
  sendFile,
  sendRandomFile
}