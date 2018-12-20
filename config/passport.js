const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const Bestyrelse = require('../models/bestyrelse')
const config = require('../config/database');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
    //Local Strategy
    passport.use('beboer',new LocalStrategy(function(Email, password, done){
        // Match Username
        let query = {email:Email};
        User.findOne(query, function(err, user) {
            if(err) throw err;
            if(!user){
                return done(null, false, console.log("ingen bruger"),{message: 'No user found'});
            }
            //Match Password
            bcrypt.compare(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Wrong password'});
                }
            });

        });
    }));

    passport.serializeUser(function(user, done) {
            done(null, user.id);
        });
      
      passport.deserializeUser(function(id, done) {
            User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}
