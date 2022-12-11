const db = require("../database/db")
const passport = require("passport")
const bcrypt = require("bcrypt")

module.exports = {
    postForLogin: (req, res, next) => {
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
    },
    postForSignUp: (req, res) => {

        passport.authenticate()
        let username = req.body.username
        let password = req.body.password
    
        let query1 = `SELECT username 
                      FROM users
                      WHERE username = ?`
    
        db.query(query1, [username], (err, result) => {
                                                         if(result.length === 0) {
    
                                                                let query2 = `INSERT INTO users(username, password) VALUES(?, ?)`
                                                                const hashedPassword = bcrypt.hashSync(password, 10);
                                                        
                                                                db.query(query2, [username, hashedPassword], 
                                                                        err => { if(err) return console.log(err) 
                                                                                 res.send("credentials saved")   
                                                                                  })
                                                          } else {
                                                                res.send("User already exists")
                                                          }
                                                                 
                                                        })
    
        
    }
}