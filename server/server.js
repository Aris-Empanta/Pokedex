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

//creating cookie      
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


app.post("/log-in", (req, res, next) => {
        passport.authenticate("local", (err, user, info) => {
                if(err) throw err
                if(!user) res.send('No such user')
                if(user) {
                        req.login(user, (err) => {
                                if(err) throw err
                                res.send(user)
                        })
                }
        })(req, res, next)
})

app.get('/getUser', (req, res) => {
        res.send(req.user)
})

app.post("/sign-up", (req, res) => {

        passport.authenticate()
        let username = req.body.username
        let password = req.body.password

        let query = `INSERT INTO users(username, password) VALUES(?, ?)`
        const hashedPassword = bcrypt.hashSync(password, 10);

        db.query(query, [username, hashedPassword], 
                err => { if(err) return console.log(err) 
                         console.log("credentials saved")   
                          })
})

const pokeRoute = require("./routes/pokeroutes")

app.use("/pokemon", pokeRoute)

app.listen(port, () => console.log(`Server is listening on port ${port}`))