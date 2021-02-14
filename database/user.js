const express = require("express")
const router = express.Router()
const DB = require("./database")

// Uso de hash para criptografia
const bcrypt = require("bcrypt")
const saltRounds = 10;

// Página de criação login
router.get("/login/new", (req, res) => {
    res.render("user/new")
})

// Rota para salvar o login
router.post("/login/create", (req, res) => {
    var { email, password } = req.body

    bcrypt.hash(password, saltRounds, function(err, hash) {
        DB.insert({email: email, password: hash}).table("users").then(data => {
            res.redirect("/")
        }).catch(err => {
            console.log(err)
        })
    });
})

// Página de login
router.get("/login", (req, res) => {
    res.render("user/login")
})

// Rota que autentica o usuário ao site
router.post("/authenticate", (req, res) => {
    var { email, password } = req.body

    // verifica se o email é correto, se tiver correto seleciona no banco o email e senha
    //
    DB.where({ email: email}).select("email", "password").table("users").then(data => {
        if(!data) {
            console.log(data)
            res.redirect("/login")
        } else {
            data.forEach(data => {
                bcrypt.compare(password, data.password, function(err, result) {
                    if(result) {
                        res.redirect("/")
                    } else {
                        res.redirect("/login")
                    }
                })
            })
        }
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router