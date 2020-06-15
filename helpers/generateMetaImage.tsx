const fs = require('fs')
import { registerFont, createCanvas, loadImage } from 'canvas'

const width = 1200
const height = 630

// WhatsApp
const wWidth = 400
const wHeight = 400

const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
  var words = text.split(' ')
  var line = ''

  for (var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' '
    var metrics = context.measureText(testLine)
    var testWidth = metrics.width
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y)
      line = words[n] + ' '
      y += lineHeight
    } else {
      line = testLine
    }
  }
  context.fillText(line, x, y)
}

const generateMetaImage = async (
  id: string,
  title: string,
  username: string
) => {
  registerFont('./public/SF-Pro-Display-Bold.otf', { family: 'SFPro' })

  const canvas = createCanvas(width, height)
  const context = canvas.getContext('2d')

  context.fillStyle = '#fff'
  context.fillRect(0, 0, width, height)

  const image = await loadImage('./public/study-placeholder.png')
  context.drawImage(image, 0, 0, 1200, 630)

  context.font = '40pt SFPro'
  context.textBaseline = 'top'
  context.fillStyle = '#000'

  const text = `${title}`
  wrapText(context, text, 100, 300, 800, 65)

  if (username) {
    context.font = '20pt SFPro'
    context.fillText(`Étude rédigée par ${username}`, 100, 430)
  }

  const buffer = canvas.toBuffer('image/jpeg', { quality: 0.5 })
  fs.writeFileSync(`./public/studies/${id}.jpg`, buffer)

  context.clearRect(0, 0, canvas.width, canvas.height)
  context.canvas.width = wWidth
  context.canvas.height = wHeight

  context.fillStyle = '#fff'
  context.fillRect(0, 0, wWidth, wHeight)

  const imageW = await loadImage('./public/study-placeholder-square.png')
  context.drawImage(imageW, 0, 0, 400, 400)

  context.font = '24pt SFPro'
  context.textBaseline = 'top'
  context.fillStyle = '#000'

  const textW = `${title}`
  wrapText(context, textW, 50, 150, 360, 35)

  if (username) {
    context.font = '18pt SFPro'
    wrapText(context, `Étude rédigée par ${username}`, 50, 320, 340, 24)
  }

  const bufferW = canvas.toBuffer('image/jpeg', { quality: 0.5 })
  fs.writeFileSync(`./public/studies/${id}-whatsapp.jpg`, bufferW)
}

export default generateMetaImage
