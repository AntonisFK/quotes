module.exports = function Route (app, Qoutes){
// for errors 
var errors = []; 

  app.get('/', function(req, res){
    //send errors to the front end 

    res.render('index', {errors: errors})
  })

  app.get('/quotes', function(req, res){
    //grab all quotes from the database 
    Qoutes.find({}, function(err, quotes){
    // grab quotes and send it to the front end 
    res.render('main', {quotes: quotes });
    })
  })

  app.post('/quotes', function(req, res){
    var quotes = new Qoutes({name: req.body.name, qoutes: req.body.qoutes});
    console.log(quotes)

    quotes.save(function(err){
      // reset errors
      errors = [];

      if(err){
        console.log("something went wrong")
        //push the errors into errors array
        for(var x in err.errors){
          errors.push(err.errors[x].message);
        }
        res.redirect('/');
      }else{
        res.redirect('/quotes');
      }
    })

  })
}