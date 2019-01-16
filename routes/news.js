const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

//News models
let News = require('../models/news');
//User models
let User = require('../models/user');


router.get('/news', function (req, res) {
    News.find({}, (err, news) => {
        if (err) {
            console.log(err);
        } else {
            res.render('news', {
                title: 'News',
                news: news
            });
        }
    });
});
//Add route
router.get('/add', function (req, res) {
    res.render('add_news', {
        title: 'Add News'
    })
})

router.get('/singleNews', function (req, res) {
    res.render('singleNews', {
        title: 'singleNews '
    })
})

//Add submit POST route
router.post('/add', function(req, res){
    //Rules express-validatior
    req.checkBody('title', 'Title is required').notEmpty();
    //req.checkBody('author', 'Author is required').notEmpty();
    req.checkBody('body', 'Body is required').notEmpty();

    //Get Errors
    let errors = req.validationErrors();
    if(errors){
        res.render('add_news',{
            title:'add News',
            errors:errors
        }) 
        console.log("blev ikke oprettet");
    } else {
        let news = new News();
        news.title = req.body.title;
        news.author = req.user._id;
        news.body = req.body.body;

        news.save(function(err){
            if(err){
                console.log(err);
                return;
            } else{
                res.redirect('/')
                console.log("News added")
            }
        })
    }
})

//Load edit form
router.get('/edit/:id', ensureAuthenticated, function(req, res){
    News.findById(req.params.id, function(err, news){
        if(news.author != req.user._id){
            res.redirect('/')
            console.log("Not Authorized")
        }
        res.render('edit_news', {
            title: 'Edit news',
            news: news
        });
    });
});

//Update Submit POST Route
router.post('edit/:id', function(req,res){
    let news= {};
    news.title = req.body.title;
    news.author = req.body.author;
    news.body = req.body.body;

    let query = { _id: req.params.id }

    News.update(query, news, function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            res.redirect('/');
            console.log("news updated")
        }
    })
});

//Delete news
router.delete('/:id', function (req, res) {
    if (!req.user._id) {
        res.status(500).send();
    }
    let query = { _id: req.params.id }

    News.findById(req.param.id, function (err, news) {
        if (news.author != req.user._id) {
            res.status(500).send();
        } else {
            News.remove(query, function (err) {
                if (err) {
                    console.log(err)
                }
                res.send('Success')
            });
        }

    });
});

//Get single news
router.get('/:id', function (req, res) {
    News.findById(req.params.id, function (err, news) {
        if (err) {
            throw (err)
        };
        User.findById(news.author, function (err, user) {
            res.render('singleNews', {
                news: news,
                author: user.name
            });   
        });
    });
});


module.exports = router;