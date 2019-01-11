var db = require('../models');

db.movie.create({
	title: 'Die Hard',
	year: 1988,
	genre: 'Dudes with guns',
	runtime: 110,
	tagline: 'Yippie...'
})
.then(function(createdMovie){
	console.log('mision accomplished', createdMovie);
}) 
.catch(function(err){
	console.log('massive failure', err);
});
