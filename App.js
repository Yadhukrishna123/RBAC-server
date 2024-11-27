const express = require("express")
const app = express()
const path = require("path")
const cors = require("cors")
const cookieParser = require("cookie-parser")


app.use(cors({
    credentials:true,
    origin:true
}))

app.use(cookieParser())

app.use("/assets", express.static(path.join(__dirname,"public")))
app.use(express.urlencoded(
    ({
        extended:true
    })
))
app.use(express.json())

const sampleMiddleWare = (req, res, next)=>{
    console.log("middleware");
    next()
}
app.use(sampleMiddleWare)

module.exports = app