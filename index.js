const express = require("express")
const bodyParser = require("body-parser")
const app = express()

const DB = require("./database/database")
const category = require("./database/category")
const products = require("./database/products")

app.set("view engine", "ejs")
app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/", category)
app.use("/", products)

app.get("/", (req, res) => {
    DB.select("id", "title").table("categories").then(data1 => {
        DB.select("*").table("products").then(data2 => {
            res.render("index", { data1, data2 })
        }).catch(err => {
            console.log(err)
        })
    })
})

app.listen(3000)