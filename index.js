const express = require("express")
const bodyParser = require("body-parser")
const app = express()

const category = require("./database/category")
const products = require("./database/products")

app.set("view engine", "ejs")
app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/", category)
app.use("/", products)

app.get("/", (req, res) => {
    res.render("index")
})

app.listen(3000)