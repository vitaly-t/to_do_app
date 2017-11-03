var express = require('express');
var app = express();
var body_parser = require('body-parser');
var pgp = require('pg-promise')({});
var db = pgp({database: 'todo_database'});




/** sets the template engine to handle bars**/
app.set('view engine', 'hbs');

/** sets the public directory as public. (for images and such)**/
app.use('/public', express.static('public'));
app.use(body_parser.urlencoded({extended: false}));

app.get("/", function (request, response) {
    response.send('<html>');
});
/** this will render a response based on your url query: localhost:8000/cats will render "Meow meow meow" from your cat.hbs file **/
/** express gives 3 arguments for each 'view'/'handler' **/
app.get("/todos", function (request, response, next) {
    let query = "SELECT * FROM task";
    db.many(query)
        .then(function(todolist){
            response.render('todos.hbs', {todolist: todolist});
        })

    .catch(next);
});


app.get('/todos/add', function (request, response) {
    // insert query
    response.redirect('/todos');

});


app.post('/todos/done/:id', function (request, response, next) {
    //declare id aka slug from the database and put it at the end of the url on the todo page.
    var id = request.params.id;
    // where the user selects the todo from the list, select the same todo where the id is the same in the database
    let query = "SELECT * FROM task WHERE id = $1";
    db.one(query, id)
        .then(function(task) {
            if (task.done){         //task.done means true. if you wanted to say false, !task.done
                var update = "UPDATE task SET done = FALSE WHERE id = $1" ;
            }
            else {
                var update = "UPDATE task SET done = TRUE WHERE id = $1" ;
            };

            return  db.any(update, id);
        })
        .then(function() {
            response.redirect('/todos');
        })
        .catch(next);

});




app.listen(8000, function () {
    console.log('Listening on port 8000');
});



