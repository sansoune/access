const express = require("express")
const proxy = require("http-proxy")
const app = express()
const proxyServer = proxy.createProxyServer()
const fs = require("fs")
const cors = require("cors")

app.use(cors({
    credentials: true,
    origin: true,

}))
let daata
fs.readFile("./config.json", (err, data) => {
    if(err) throw err
    let da_ta = JSON.parse(data)
    daata = da_ta
})


app.all('*', (req, res) => {
    const domain = req.hostname
    for (value in daata) {
        if(domain === value){
            console.log(daata[value].host)
            let target = daata[value].host
            proxyServer.web(req, res, {target: target})
            return
        }
        
    }
    res.send('error 404')
})




app.listen(80, () => console.log("serever starting")).on("connection", (socket) => {
    socket.setTimeout(30 * 1000)
})

