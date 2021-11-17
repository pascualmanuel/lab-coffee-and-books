const express = require('express');
const router = express.Router();
const Places = require('../models/Places.model');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});  


// GET => render the form to create a new restaurant
router.get('/new', (req, res, next) => {
  res.render('places/new')
});

// POST => to create new restaurant and save it to the DB
router.post('/places/create', (req, res, next) => {
	//3. Instrucciones: Hemos convertido la info del formulario a un objeto 
	//		que cuadre con nuestro modelo
	Places.create({
		name: req.body.name,
		type: req.body.type,
		 location: {
			type: 'Point',
			coordinates: [req.body.longitude, req.body.latitude]
		}
	})
		.then(() => res.redirect("/"))
		.catch(err => next(err))

});

// GET => to retrieve all the restaurants from the DB
router.get('/show', (req, res, next) => {
	Places.find()
		.then(placesFromDB => res.render('places/show', { places: placesFromDB }))
		.catch(err => next(err))
})


// GET => get the form pre-filled with the details of one restaurant
router.get('/:places_id/edit', (req, res, next) => {
	Places.findById(req.params.places_id)
		// console.log(places_id)
		.then(places => res.render('places/update', { places }))
		.catch(err => next(error))
})

// POST => save updates in the database
router.post('/places/:places_id', (req, res, next) => {
	const { name, type } = req.body

	Places.findByIdAndUpdate(req.params.places_id, { name, type })
		.then(places => res.redirect("/show"))
		.catch(err => next(err))
});


router.get('/places/:places_id/delete', (req, res, next) => {
	Places.findByIdAndRemove(req.params.places_id)
		.then(() => res.redirect('/show'))
		.catch(err => next(err))
});



// to see raw data in your browser, just go on: http://localhost:3000/api
router.get('/api', (req, res, next) => {
	Places.find()
		.then(allPlaces => {
			res.status(200).json({ places: allPlaces });
		})
		.catch(err => console.log(err))
});



module.exports = router;

// to see raw data in your browser, just go on: http://localhost:3000/api/someIdHere
// router.get('/api', (req, res, next) => {
// 	let placesId = req.params.id;
// 	Places.findById(placesId)
// 		.then(onePlaceFromDB => res.status(200).json({ places: onePlaceFromDB }))
// 		.catch(err => next(err))
// })