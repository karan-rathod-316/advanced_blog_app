const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const connectDB = require('./config/db')//setting variable connecting with mongodb
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
//Loading the config file
dotenv.config({path:'./config/config.env'})

//passport config
require('./config/passport')(passport)//we'll catch this passport from the passport.js file where it is exported

//connecting with mongodb
connectDB();

//initialize our app
const app = express();

//body parser
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//method overrider
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

//running morgan only when we are in development mode
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//handlebar helpers
const {formatDate, stripTags, truncate, editIcon, select} = require('./helpers/hbs') 

//setting Handlebars as our template engine
app.engine('.hbs',exphbs({helpers:{formatDate, stripTags, truncate,editIcon,select},defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', '.hbs')


// sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,//don't create a session unless something is stored
    store: new MongoStore({mongooseConnection: mongoose.connection})
  }))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

// set global variables
app.use(function(req,res,next) {
  res.locals.user = req.user || null
  next()
} )

// static folder
app.use(express.static(path.join(__dirname,'public')))

//routes
app.use('/',require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))


//setting the port
const PORT = 3000
//process.env.PORT || 

app.listen(PORT, console.log(`we are live in ${process.env.NODE_ENV} on ${PORT}`))

