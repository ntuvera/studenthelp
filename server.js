var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');
var sequelize = require('sequelize');
var Posts = require('./models')['Posts'];
var Categories = require('./models')['Categories'];
var Comments = require('./models')['Comments'];
var Search = require('./models')['Search'];
var session = require('express-session');
//var moment = require('moment');

var models  = require('./models');
var sequelizeConnection = models.sequelize

// We run this query s o that we can drop our tables even though they have foreign keys
sequelizeConnection.query('SET FOREIGN_KEY_CHECKS = 0')

// make our tables
// note: force:true drops the table if it already exists
.then(function(){
	return sequelizeConnection.sync({})
}).then(function() {
	Categories.findAll({}).then(function(results) {
		console.log(results);
		app.locals.categories = results;
	});
})

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
	extended: false
}));

app.engine('handlebars', handlebars({
	defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

// app.use(session({
// 	secret: "mysupersecret",
// 	resave: false,
// 	cookie: {
// 		maxAge: 60000 * 60 * 24 * 14
// 	}
// }));

//home page
app.get('/', function(req, res) {
	// if (!req.session.user){
	// 	res.redirect('/login');
	// }
	console.log('LOOOOOOOOOOOK HERE!!!!')
	Posts.findOne(
		// order: 'score DESC'
	).then(function(result) {
		console.log('yay')
		// console.log(result);
  	res.render('index', {
			posts: result
		});
	});

});

// search bar on home page

// app.get('/', function(req, res) {
// 	// if (!req.session.user){
// 	// 	res.redirect('/login');
// 	// }

// 	Search.findAll({
// 		order: 'score DESC'
// 	}).then(function(result) {
// 		console.log(result);
// 		return res.render('index', {
// 			posts: result
// 		});
// 	});

// });


//home page
app.get('/login', function(req, res) {
	res.render('login', {layout: 'loginlayout.handlebars'});
});


app.get('/categories/:category', function(req, res) {
	var categoryName = req.params.category;


	Categories.findAll({
		where: {
			url: categoryName
		},
		include: [{model: models.Posts, required: true}]
	}).then(function(result) {
		console.log('rending category', result);
		return res.render('categories', {
			categoryName: categoryName,
			title: req.query.title,
			category: result
		});
	});
});


//form page
app.get('/new-post', function(req, res) {
	res.render('new');
});


app.post('/:postId/comment', function(req, res) {
	var body = req.body;
	console.log('body', body);
	var comment = body.comment;


	Comments.create({
		comment: comment,
		PostId: parseInt(req.params.postId)
	}).then(function(data) {
		res.redirect('/posts/' + req.params.postId);

	});
});


app.post('/new-post', function(req, res) {
	var body = req.body;

	//create the post in the database
	Posts.create({
		title: body.title,
		url: body.url,
		image: body.image,
		score: 0,
		snippet: body.snippet,
		CategoryId: parseInt(body.category, 10),
		description: body.description
	}).then(function(data) {
		console.log('data', data);
		
		//redirect to the posts/:id page
		res.redirect('/posts/' + data.dataValues.id);
	});
});


app.get('/posts/:id', function(req, res) {
	console.log('in posts route');
	var id = req.params.id;
	Posts.findOne({
		where: {
			id: id
		},
		include: [models.Comments]
	}).then(function(post) {
		console.log('post', post);
		res.render('post', {
			post: post
		});
	});
});

app.post('/posts/:id/:vote', function(req, res) {
	var operation = '+';
	if (req.params.vote === 'downvote') {
		operation = '-';
	};

	Posts.update({
		score: sequelize.literal('score ' + operation + ' 1')},
	{where: {id: req.params.id}}).then(function(post) {
		res.end();
	});
});

// Create a route for the AJAX search POST request

app.post('/queryPosts', function(req, res) {
	console.log("Here is the query stuff ", req.body)
	
	Posts.find({
		title: req.body.title,
		url: req.body.url 
	}).then(function(data) {

		console.log('found something')
		res.send(data);	
	});
	
});


var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log('connected to', port);
});


