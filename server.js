var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articleOne = {
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

function createTemplate(data) {
    
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
          <H3> $(title) </h3>
      </div>
       <div>
              $(date)
       </div>
       
       <div>
                $(article)
       </div>
       
     </div>
  
   </body>
</html>`

return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article-one', function (req, res) {
   res.send(createTemplate(articleOne));
});

app.get('/article-two', function (req, res) {
   res.sendFile(path.join(__dirname,'ui', 'article-two.html'));
});

app.get('/article-three', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
    
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
