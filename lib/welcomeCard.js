const fs = require("fs")
async function createWelcomeCard(
  profilePicture,
  username,
  groupName
) {
  try {
    if (
      fs.existsSync("./media/welcome.jpg")
    ) {
      return fs.readFileSync(
        "./media/welcome.jpg"
      )
    }
    return null
  } catch (err) {
    console.log(err)
    return null
  }
}
module.exports = {
  createWelcomeCard
}