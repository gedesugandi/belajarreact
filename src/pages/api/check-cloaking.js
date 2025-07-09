import fetch from 'node-fetch'
import * as cheerio from 'cheerio'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { url } = req.body
  if (!url || typeof url !== 'string' || !/^https?:\/\//.test(url)) {
    console.log('URL DITERIMA TAPI INVALID:', url)
    return res.status(400).json({ error: 'URL tidak valid' })
    }

  try {
    const resGooglebot = await fetch(url, {
        headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
        }
    })
    const htmlGooglebot = await resGooglebot.text()

    const resBrowser = await fetch(url, {
        headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36'
        }
    })
    const htmlBrowser = await resBrowser.text()

    const isDifferent = htmlGooglebot.trim() !== htmlBrowser.trim()

    const $bot = cheerio.load(htmlGooglebot)
    const $browser = cheerio.load(htmlBrowser)
    const titleBot = $bot('title').text()
    const titleBrowser = $browser('title').text()

    const descBot = $bot('meta[name="description"]').attr('content') || ''
    const descBrowser = $browser('meta[name="description"]').attr('content') || ''

    const isTitleDifferent = titleBot !== titleBrowser
    const isDescDifferent = descBot !== descBrowser


    res.status(200).json(
        { 
            url, 
            isDifferent, 
            htmlGooglebot, 
            htmlBrowser,
            titleBot,
            titleBrowser,
            descBot,
            descBrowser,
            isTitleDifferent,
            isDescDifferent 
        }
    )

    } catch (error) {
    console.error('FETCH ERROR:', error)
    res.status(500).json({ error: 'Gagal mengakses URL. Mungkin diblokir oleh server.' })
    }
}
