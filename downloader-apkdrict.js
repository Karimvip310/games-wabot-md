$echo import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) throw 'Ex: '+usedPrefix + command+' minecraft'
let res = await apk(args[0])
await m.reply('_In progress, please wait..._')
conn.sendFile(m.chat,res.icon,res.name,res.name,m)conn.sendMessage(m.chat, { document: { url: res.download }, mimetype: res.mimetype, fileName: res.fileName }, { quoted: m })
}
handler.command = /^(apk)$/i
handler.help = ['apk']
handler.tags = ['downloader']

export default handler

async function apk(url) {
let res = await fetch('http://ws75.aptoide.com/api/7/apps/search?query='+url+'&limit=1')
let $ = await res.json()
let fileName = $.datalist.list[0].package +'.apk'
let download = $.datalist.list[0].file.path
if (!download) throw 'Can\'t download the apk!'
let name = $.datalist.list[0].name
let icon = $.datalist.list[0].icon
let mimetype = (await fetch(download, { method: 'head' })).headers.get('content-type')
let iconmot =let mimetype = (await fetch(icon, { method: 'head' })).headers.get('content-type') 
return { fileName, mimetype, download ,name ,icon ,iconmot}
}
