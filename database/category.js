const express = require("express")
const router = express.Router()
const DB = require("./database")
const slugify = require("slugify")

// Middleware
const adminAuth = require("../middleware/adminAuth")

// Página de criação de categoria
router.get("/admin/categories/new", adminAuth, (req, res) => {
    res.render("admin/categories/new")
})

// Salvando a categoria
router.post("/categories/save", adminAuth, (req, res) => {
    var title = req.body.title

    // Salvando no banco de dados
    DB("categories").insert({ title: title, slug: slugify(title) }).then(data => {
        res.redirect("/admin/categories")
    }).catch(err => {
        console.log(err)
    })
})

// Mostrando todas as categorias
router.get("/admin/categories", adminAuth, (req, res) => {
    // Pegando os itens cadastrados no bando de dados
    DB.select("*").table("categories").then(data => {
        res.render("admin/categories/index", { data })
    }).catch(err => {
        console.log(err)
    })
})

// Página de edição de categoria
router.get("/admin/categories/edit/:id", adminAuth, (req, res) => { 
    var id = req.params.id

    DB.where({ id: id}).select("title").table("categories").then(data => {
        res.render("admin/categories/edit", { data, id })
    }).catch(err => {
        console.log(err)
    })
})

// Editando uma categoria
router.post("/categories/update", adminAuth, (req, res) => {
    var { id, title } = req.body

    // Atualizando o dado
    DB.where({ id: id }).update({ title: title, slug: slugify(title) }).table("categories").then(data => {
        res.redirect("/admin/categories")
    }).catch(err => {
        console.log(err)
    })
})

// Deletar uma categoria
router.post("/categories/delete", adminAuth, (req, res) => {
    var id = req.body.id
    
    DB.where({ id: id}).delete().table("categories").then(data => {
        res.redirect("/admin/categories")
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router
