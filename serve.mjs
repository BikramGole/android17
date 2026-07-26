import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = 3000

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.riv': 'application/octet-stream',
}

function serveFile(res, filePath) {
  const ext = path.extname(filePath)
  res.writeHead(200, {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'Access-Control-Allow-Origin': '*',
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable',
  })
  fs.createReadStream(filePath).pipe(res)
}

http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`)
  let p = url.pathname

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('X-Content-Type-Options', 'nosniff')

  const simDir = path.join(__dirname, 'simulator-dist')

  if (p === '/simulator/' || p === '/simulator') {
    const indexPath = path.join(simDir, 'index.html')
    if (fs.existsSync(indexPath)) return serveFile(res, indexPath)
  }

  if (p.startsWith('/simulator/')) {
    const sub = p.slice('/simulator/'.length)
    const file = path.join(simDir, sub)
    if (fs.existsSync(file) && fs.statSync(file).isFile()) return serveFile(res, file)
    const indexPath = path.join(simDir, 'index.html')
    if (fs.existsSync(indexPath)) return serveFile(res, indexPath)
  }

  if (p === '/' || p === '') p = '/index.html'

  const file = path.join(__dirname, p)
  if (fs.existsSync(file) && fs.statSync(file).isFile()) return serveFile(res, file)

  res.writeHead(404, { 'Content-Type': 'text/html' })
  res.end('<!DOCTYPE html><html><head><title>404</title><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#050805;color:#f3f7f4;text-align:center}div{padding:2rem}h1{font-size:4rem;margin:0;background:linear-gradient(135deg,#3ddc84,#8ab4f8);-webkit-background-clip:text;-webkit-text-fill-color:transparent}p{color:#8a9b8e}a{color:#3ddc84}</style></head><body><div><h1>404</h1><p>Page not found</p><a href="/">Go home</a></div></body></html>')
}).listen(PORT, () => {
  console.log(`\n  🟢 Android 17 Showcase`)
  console.log(`  ─────────────────────`)
  console.log(`  Main:     http://localhost:${PORT}`)
  console.log(`  Simulator: http://localhost:${PORT}/simulator/\n`)
})
