const puppeteer = require('puppeteer')

export default async (req, res) => {
  const { studyId } = req.body
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(`https://bible-strong-web-app.now.sh/studies/${studyId}`, {
    waitUntil: 'networkidle0',
  })
  const buffer = await page.pdf({ format: 'A4' })

  await browser.close()
  res.end(buffer)
}
