const express = require("express")
const bodyParser = require("body-parser")
const app = express()

// Database
const DB = require("./database/database")
const category = require("./database/category")
const products = require("./database/products")
const user = require("./database/user")

// Session
var session = require('express-session')

app.use(session({ secret: 'qualquercoisa', cookie: { maxAge: 180000000 }}))

// View engine
app.set("view engine", "ejs")
app.use(express.static("public"))

// Body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Database route
app.use("/", category)
app.use("/", products)
app.use("/", user)

// Landing page route
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