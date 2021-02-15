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


    // verifica se o email está cadastrado do DB, se tiver cadastrado ele seleciona no banco o email e senha
    DB.where({ email: email}).select("*").table("users").then(data => {
        if(data[0]) {
            res.redirect("/login")
        } else {
            bcrypt.hash(password, saltRounds, function(err, hash) {
                DB.insert({email: email, password: hash}).table("users").then(data => {
                    res.redirect("/")
                }).catch(err => {
                    console.log(err)
                })
            });      
        }
    }).catch(err => {
        console.log(err)
    })
})

// Página de login
router.get("/login", (req, res) => {
    res.render("user/login")
})

// Rota que autentica o usuário ao site
router.post("/authenticate", (req, res) => {
    var { email, password } = req.body

    // verifica se o email está cadastrado do DB, se tiver cadastrado ele seleciona no banco o email e senha
    DB.where({ email: email}).select("id", "email", "password").table("users").then(data => {
        if(!data[0]) {
            res.redirect("/login")
        } else {
            // Comparando a senha digitada no login com a cadastrada no DB 
            data.forEach(data => {
                bcrypt.compare(password, data.password, function(err, result) {
                    if(result) {
                        req.session.user = {
                            id: data.id,
                            email: data.email
                        }
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