var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;


var app = express();
app.use(morgan('combined'));

// you can optionally supply other values
var config = {
  host:'db.imad.hasura.io',
  user: 'shripada',
  password: process.env.DB_PASSWORD,
  database: 'shripada',
};

// create the pool somewhere globally so its lifetime
// lasts for as long as your app is running
var pool = new Pool(config);



var articles = {
        articleOne: {
        title: 'Article One',
        date: '2 Feb, 2017',
        article: `
           <p> This is arcticle one. It is very nice. It is very nice
               It is very nice. It is very nice. It is very niceIt is very niceIt is very nice.
                </p>
                
               <p> This is arcticle one. It is very nice. It is very nice
               It is very nice. It is very nice. It is very niceIt is very niceIt is very nice.
                </p>
                
                <p> This is arcticle one. It is very nice. It is very nice
               It is very nice. It is very nice. It is very niceIt is very niceIt is very nice.
                </p> 
        `
    },

    articleTwo: {
        title: 'Article One',
        date: '2 Feb, 2017',
        article: `
           <p> This is arcticle one. It is very nice. It is very nice
               It is very nice. It is very nice. It is very niceIt is very niceIt is very nice.
                </p>
                
               <p> This is arcticle one. It is very nice. It is very nice
               It is very nice. It is very nice. It is very niceIt is very niceIt is very nice.
                </p>
                
                <p> This is arcticle one. It is very nice. It is very nice
               It is very nice. It is very nice. It is very niceIt is very niceIt is very nice.
                </p> 
        `
    },

    articleThree: {
        title: 'Article One',
        date: '2 Feb, 2017',
        article: `
           <p> This is arcticle one. It is very nice. It is very nice
               It is very nice. It is very nice. It is very niceIt is very niceIt is very nice.
                </p>
                
               <p> This is arcticle one. It is very nice. It is very nice
               It is very nice. It is very nice. It is very niceIt is very niceIt is very nice.
                </p>
                
                <p> This is arcticle one. It is very nice. It is very nice
               It is very nice. It is very nice. It is very niceIt is very niceIt is very nice.
                </p> 
        `
    }

};


function createTemplate(data) {
    return;
    var article = data.article;
    var date = data.date;
    var title = data.title;
    
    var htmlTemplate = `<html> 
  <head>
    <title> Arcticle-one </title>
    
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="ui/style.css" rel="stylesheet">
  
  </head>

  <body>
      <div class='container'>
        <div>
          <a href="/">Home</a>
      </div>
      <hr/>
      <div>
          <H3> ${title}</h3>
      </div>
       <div>
              ${date}
       </div>
       
       <div>
                ${article}
       </div>
       
     </div>
  
   </body>
</html>`

return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


app.get('/testdb', function(req,res) {
    //make a select request
    //return a response with the results.
    pool.query(`SELECT * FROM test`, function(err,result){
        if (err) {
            res.status(500).send(err.toString());
        } else {
            res.send(JSON.stringify(result));
        }
    });
    
});

var counter = 0; 
app.get('/counter', function (req, res) {
  res.send(counter.toString());
   counter += 1; 
  
});


var names = [];
app.get('/submit-name', function (req, res) { //submit-name?name=xxxx 
  //Get the name from the request
  var name =  req.query.name; 
  names.push(name);

  //JSON Object
  res.send(JSON.stringify(names))

});


app.get('/:articleName', function (req, res) {
    var articleName = req.params.articleName;
   res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});




var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
