
const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(expressValidator());

app.use(express.static('views'));

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache');

let todos = [{task:"Wash the car", done:false}, {task:"Walk to Market", done:true}];

app.get("/", function (req, res) {
  res.render('index', { todos: todos });
});

app.post("/", function (req, res) {
  todos.push({task:req.body.todo, done:false})
  res.redirect('/');

});

app.post("/complete", function(req, res){
  todos.forEach(function(activity){
    if(activity.task === req.body.clicked){
      activity.done = true;
    }
  })
  res.redirect("/");
});

app.listen(4000, function(){
  console.log("app running on 4000");
});
