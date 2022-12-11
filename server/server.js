const express = require("express")
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
const db = require('./database/db')
const passport = require("passport")
const localStrategy = require("passport-local")
const session = require("express-session")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")

//The middlewares needed
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(session({secret: 'mySecretKey',
                 resave: false,
                 saveUninitialized: true
                }))
app.use(cookieParser('mySecretKey'))
app.use(passport.initialize())
app.use(passport.session())
const pokeRoute = require("./routes/pokeroutes")
const authenticateRoutes = require("./routes/authentication")

//The routes
app.use("/pokemon", pokeRoute)
app.use("", authenticateRoutes)

//We initialize and configure the new strategy, the local
//strategy with username and password. 
passport.use(new localStrategy((username, password, cb) => {

        const query = 'SELECT * FROM users WHERE username = ?'

        db.query(query, [ username ], function(err, user) {
          if (err) { return cb(err); }
          if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }
          bcrypt.compare(password, user[0].password, (err, response) => {
                if(err) throw err
                if(response === true) {
                        return cb(null, user[0].username)
                }
                else {
                        return cb(null, false)
                }
          } )
          
        });
      }));

passport.serializeUser((user, cb) => {

        try{
            cb(null, user)
        } catch(err) {
                throw err
        }       
})

passport.deserializeUser((id, done) => {
        const query = "SELECT FROM users WHERE id=?"

        db.query(query, [id], (err, result) => {
                if(err) throw err
                const userInfo = {
                        id: result[0].id,
                        username: result[0].username
                }
                done(null, userInfo)
        })
})

app.listen(port, () => console.log(`Server is listening on port ${port}`))