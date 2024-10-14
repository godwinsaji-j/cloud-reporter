let createError = require('http-errors')
let express = require('express')
const bodyParser = require('body-parser')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')
const cors = require('cors')

let summaryRouter = require('./routes/summary')
let app = express()

// view engine setup
app.set('views', path.join(__dirname, '/public/views'))
app.set('view engine', 'ejs')

app.use(
    logger('dev', {
        skip: function (req, res) {
            return res.statusCode < 400
        },
    })
)
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/summary', summaryRouter)
app.get('/', function (req, res) {
    res.render('sign-in')
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
