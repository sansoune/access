const express = require("express")
const proxy = require("http-proxy")
const app = express()
const proxyServer = proxy.createProxyServer()
const cors = require("cors")

app.use(cors({
    credentials: true,
    origin: true,

}))


app.all('*', (req, res) => {
    console.log(req.hostname)
    
    
})




app.listen(80, () => console.log("serever starting")).on("connection", (socket) => {
    socket.setTimeout(30 * 1000)
})

