const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 4008;

var app = express();

hbs.registerPartials(__dirname + '/views/partials/');
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});


// app.use((req, res, next)=>{
//   res.render('maintanance.hbs');
// });
  

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method}: ${req.url}`;
  fs.appendFile('server1.log', log+'\n', (err)=>{
  if(err){
      console.log('Unable to write log');
    }
});
  next();
});





app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {

res.render('home.hbs',{
  pageTitle:'Home Page',
  message:'Welcome to my website',
});

});

app.get('/about', (req,res) =>{
  res.render('about.hbs', {
    pageTitle: 'About.hbs'
  });
});

app.get('/projects',(req,res) => {
  res.render('projects.hbs', {
pageTitle: 'Projects.hbs',
message:'This is my portfolio'
  });
});



app.get('/bad', (req,res) =>{
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, ()=>{
  console.log('Server is up on port',port);
});
