import fs from 'fs'

let handler = async (m, { text, usedPrefix, command }) => {
	if (!text) throw `Where is the path?\n\nEx:\n${usedPrefix + command} plugins/menu.js`
	if (!m.quoted?.text) throw 'Reply code' 
	await fs.writeFileSync(text, m.quoted.text)
	m.reply(`Saved ${text} to file!`)
}
handler.help = ['savefile', 'sf'].map(v => v + ' <path>')
handler.tags = ['owner']
handler.command = ['savefile', 'sf']
handler.rowner = true

export default handler