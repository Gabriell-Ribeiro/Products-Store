const express = require("express")
const router = express.Router()

router.get("/admin/products", (req, res) => {
    res.render("admin/products/index")
})

module.exports = router