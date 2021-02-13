const express = require("express")
const router = express.Router()
const DB = require("./database")
const slugify = require("slugify")

// Página de criação de produto
router.get("/admin/products/new", (req, res) => {
    DB.select("*").table("categories").then(data => {
        res.render("admin/products/new", { data })
    }).catch(err => {
        console.log(err)
    })
})

// Salvando o produto
router.post("/products/save", (req, res) => {
    var {title, price, image, description, categoryId } = req.body

    // Salvando no banco de dados
    DB("products").insert({
        title: title,
        slug: slugify(title),
        price: price,
        image: image,
        description: description,
        categoryId: categoryId,
    }).then(data => {
        res.redirect("/admin/products")
    }).catch(err => {
        console.log(err)
    })
})

// Página admin dos produtos
router.get("/admin/products", (req, res) => {
    DB.select("*").table("products").then(data => {
        res.render("admin/products/index", { data })
    }).catch(err => {
        console.log(err)
    })
})

// Página de edição do produto
router.get("/admin/products/edit/:id", (req, res) => {
    var id = req.params.id

    // Pegando os itens no banco de dados
    DB.select("*").table("categories").then(data1 => {
        DB.where({ id: id }).select("*").table("products").then(data2 => {
            res.render("admin/products/edit", { data1, data2, id })
        }).catch(err => {
            console.log(err)
        })
    })
})

// Salvando a edição
router.post("/products/update", (req, res) => {
    var { id, title, price, image, description, categoryId } = req.body

    // Salvando a edição no banco de dados
    DB.where({ id: id }).update({
        title: title,
        slug: slugify(title),
        price: price,
        image: image,
        description: description,
        categoryId: categoryId
    }).table("products").then(data => {
        res.redirect("/admin/products")
    }).catch(err => {
        console.log(err)
    })
})

// Deletando produto
router.post("/products/delete", (req, res) => {
    var id = req.body.id

    DB.where({ id: id }).delete().table("products").then(data => {
        res.redirect("/admin/products")
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router