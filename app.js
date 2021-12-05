const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");

const DB = `mongodb+srv://Sparadkar:laura@cluster0.u7prp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`


mongoose.connect(DB, {useNewUrlParser: true,});

// using EXPRESS npm
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

//using PUG npm
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

//mongo Schema 
const fbSchema = new mongoose.Schema({
    feedback: String,
  });

  const review = mongoose.model('feedback', fbSchema);

// ENDPOINTS
app.get('/', (req, res)=>{
    res.status(200).render('home.pug');
})

app.get('/world', (req, res)=>{
    res.status(200).render('world.pug');
})

app.get('/bbc', (req, res)=>{
    res.status(200).render('bbc.pug');
})

app.get('/articles', (req, res)=>{
    res.status(200).render('articles.pug');
})

app.get('/feedback', (req, res)=>{
    res.status(200).render('feedback.pug');
})

app.post('/feedback', (req, res)=>{
    let myData = new review(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
    })
})

// START THE SERVER
app.listen(process.env.PORT, ()=>{
    console.log(`The application started successfully on port`);
});