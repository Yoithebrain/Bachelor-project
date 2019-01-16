const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
    //Local Strategy
    passport.use(
        new LocalStrategy({usernameField: 'username'},(username, password, done) => {
        // Match Username
        User.findOne({username: username})
        .then(user => {
            if (!user) {
                return done(null, false,console.log('User doesn´t exist!'),
                 {message: 'That Username is not registered!'});
            }

             //Match Password
             bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;

                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, console.log('Incorrect Password'),
                     {message: 'Incorrect Password'});
                }
            });
        })
        .catch(err => console.log(err));
        
        })
           
    );

    passport.serializeUser((user, done) => {
            done(null, user.id);
        });
      
      passport.deserializeUser((id, done) => {
            User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}
