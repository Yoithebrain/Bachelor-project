<<<<<<< HEAD
const express = require('express')
const app = express()
const bodyParser = require('body-parser');


app.use(express.static(__dirname + "/public"))// Middleware. Needed in order to serve CSS, JS and images from html
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
=======
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//const bcrypt = require ('bcrypt');

>>>>>>> 8866f1a005ea89122eaa1cd7675b82d17c22deac

 
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
})

app.use(express.static(__dirname + "/public"))// Middleware. Needed in order to serve CSS, JS and images from html
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());





  








 
app.listen('3000', function(err){
    if(err){
        console.log("Couldn't connect to the server");
        
    }
    console.log("Server is running on port 3000...");
    
})