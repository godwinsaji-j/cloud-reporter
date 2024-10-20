var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/summary', function (req, res, next) {
    res.render('summary', { title: 'Express' })
})

router.get('/detailed', function (req, res, next) {
    res.render('detailed-report', { title: 'Express' })
})

module.exports = router
