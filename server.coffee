http = require('http')
url  = require('url')
fs   = require('fs')

server = http.createServer (req, res) ->
    u = url.parse(req.url, true)

    if u.pathname == '/'
        fs.readFile './form.html', (error, content) ->
            if error
                res.writeHead 500
                res.end()
            else
                res.writeHead 200, { 'Content-Type': 'text/html' }
                res.end content, 'utf-8'
    if u.pathname == '/script'
        fs.readFile './script.js', (error, content) ->
            if error
                res.writeHead 500
                res.end()
            else
                res.writeHead 200, { 'Content-Type': 'text/html' }
                res.end content, 'utf-8'
    else if u.pathname == '/calc'
        fl = u.query.focallength
        pixelsize = u.query.pixelsize
        content = {}
        content['arcminutes-per-mm']    = 3438 / fl
        content['arcseconds-per-mm']    = (3438 / fl) * 60
        content['arcseconds-per-pixel'] = (3438 / fl) * 60 * pixelsize
        content['max-exposure-length']  = ((3438 / fl) * 60 * pixelsize) / 15
        res.writeHead 200, { 'Content-Type': 'application/json' }
        res.end JSON.stringify(content), 'utf-8'

port = process.env.PORT || 5000

server.listen port, ->
  console.log "Listening on " + port

